---
title: "Sparkle"
date: 2023-04-01T14:08:00+10:00
draft: true
description: "Set up your Mac app for updating using the Sparkle framework"
tags: ["mac",  "sparkle",  "app", "distribution"]
---

Last month, I posted about writing my new todo app called [To-Day][1]: why I wrote it and how I wrote it. At the time, I mentioned that I had set it up to install updates using [Sparkle][2] but there was too much detail  to include in the initial post. So here, as promised, is the article about implementing Sparkle.

<!--more-->

One of the great conveniences of App Store distribution is the update handling. When (or if) an update passes the app review process, Apple does the rest, propagating updates through the App Store app. If you're distributing your apps externally, you need an alternative method.

Sparkle is an open-source update framework for macOS. It's very popular and I'm sure you will have seen it used, even if you didn't recognise it. But setting it up isn't totally straight-forward, at least I didn't find it so, which I why I'm using this post to document the process.

The [Sparkle documentation][3] is excellent and contains everything you need to know, but they allow for a wide range of use cases and configurations, which makes it difficult to follow at times. For this app, I have the following requirements:

- SwiftUI app
- Sandboxed
- Install framework using Swift Package Manager
- Distribution as a disk image

This guide deals with those requirements only.

### Table of Contents

  - [Installation](#installation)
  - [Adding a Public Key to your App](#adding-a-public-key-to-your-app)
    - [Checking for a Existing Key](#checking-for-a-existing-key)
    - [Creating a New Key](#creating-a-new-key)
    - [Installing the Public Key](#installing-the-public-key)
  - [Sandboxing](#sandboxing)
  - [Locating the Updates](#locating-the-updates)
  - [Coding the Update Check](#coding-the-update-check)
  - [Exporting the App](#exporting-the-app)
  - [Making a Disk Image](#making-a-disk-image)
  - [Generating the appcast.xml](#generating-the-appcast-xml)
  - [Testing](#testing)
  - [Summary](#summary)

### Installation

Open your app in Xcode and select the project at the top of the project navigator. Click on the project itself in the next sidebar and then choose **Package Dependencies** from the tabs across the top.

Click the **+** at the bottom of the list to add a new package. Enter this URL into the search field and when the package appears, click **Add Package**.

```
https://github.com/sparkle-project/Sparkle
```

{{< img_border >}}

![Install Sparkle][i1]

Xcode will download the package and then show another dialog with the Sparkle library checked. Click **Add Package** again to attach it to your project.

### Adding a Public Key to your App

The next step depends on whether you've used Sparkle before. You need to create a private and public key pair for security reasons, but you can then use the same keys for all of your apps (I think).

#### Checking for a Existing Key

To check if you already have a key, open the **Keychain Access** app from Applications/Utilities. Search for **sparkle** and if you have a key, you'll see it listed. If you don't find anything, skip ahead to the [next section](#creating-a-new-key) to create a new one.

Double-click the key to show its details which conveniently includes the public key in the comments.

![Existing Sparkle keys][i2]

Select and copy the public key, then jump to [Installing the Public Key](#installing-the-public-key).

#### Creating a New Key 

If you don't already have a key pair, you'll use one of Sparkle's tools to create it. 

Back in Xcode, right-click on Sparkle in the project navigator and select **Show in Finder** which opens a folder buried deep in your Library. Press **Command-3** to show the folder in Columns mode and then click  the **artifacts** folder that's one level above the Sparkle folder.

From there, navigate through **sparkle** to **Sparkle** where you'll see a **bin** folder:

![Opening the Sparkle folder][i3]

Open your preferred Terminal app and type **cd** followed by a **space**. Drag in the **Sparkle** folder with the uppercase **S**.

Then enter and run this command:

```bash
./bin/generate_keys
```

This generates the keys, saves them to your keychain and displays the public key. Copy the public key for use in the next section. 

#### Installing the Public Key

To insert the key into your app, go back to Xcode and select the project and target. Choose **Info** from the tabs at the top. Click the **+** blob beside the last entry and type in the key name:

```
SUPublicEDKey
```

The type is String (which should be the default) and the value is the public key you just copied:

![Adding the Sparkle public key][i4]

### Sandboxing

Mac apps are sandboxed by default, which quarantines their data into their own container and protects the rest of your system. Adding Sparkle to a sandboxed app requires some more steps, but if your app is not sandboxed, [move on to the next section](#locating-the-updates).

First, you need to give your app access to the internet, so it can retrieve the update information and download any updates.

In the app's target settings, select **Signing and Capabilities** and turn on **Outgoing Connections (Client)**:

![Sand-box connection setting][i5]

Next, add another setting to the target's Info:

- **Key**: SUEnableInstallerLauncherService
- **Type**: Boolean
- **Value**: YES

The next settings go into the **.entitlements** file which you'll find in the project navigator. Right-click the entitlements file and select **Open As > Source Code** which makes it possible to paste in the next chunk.

Just before the last `</dict>`, add a new line and insert:

```xml
  <key>com.apple.security.temporary-exception.mach-lookup.global-name</key>
  <array>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)-spks</string>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)-spki</string>
  </array>
```

Now the app is configured to allow Sparkle to work with the Mac sandbox.

### Locating the Updates

You need to have an online location for the app and its update information. Since my To-Day app is on GitHub, I decided to use GitHub for distribution too, but I could have used this web site, AWS or any other online service. It's best if it's coming from an **https** server.

Open my [GitHub repo][4] and look at the file structure. The **Releases** folder has a disk image (dmg) containing the app and an XML file generated by Sparkle with the update information.

Work out where you're going to put these two files for your app and find the exact URL for the **appcast.xml** file.

This gives you the last piece of data that your app needs. Add another setting to your target's Info:

- **Key**: SUFeedURL
- **Type**: String
- **Value**: https://url-to-your-appcast.xml

If you're using GitHub, upload a fake file so you can get the URL, remembering to get the URL for the raw file, not it's GitHub page.

### Coding the Update Check

You've done all the setup work now, but there's nothing to trigger a check in the app. I copied and pasted most of the suggested code from the [Sparkle docs][5].

First, I created a new file called **Updater.swift** which contains:

```swift
import SwiftUI
import Sparkle

// This view model class publishes when new updates can be checked by the user
final class CheckForUpdatesViewModel: ObservableObject {
  @Published var canCheckForUpdates = false

  init(updater: SPUUpdater) {
    updater.publisher(for: \.canCheckForUpdates)
      .assign(to: &$canCheckForUpdates)
  }
}

// This is the view for the Check for Updates menu item
// Note this intermediate view is necessary for the disabled state on the menu item to work properly before Monterey.
// See https://stackoverflow.com/questions/68553092/menu-not-updating-swiftui-bug for more info
struct CheckForUpdatesView: View {
  @ObservedObject private var checkForUpdatesViewModel: CheckForUpdatesViewModel
  private let updater: SPUUpdater

  init(updater: SPUUpdater) {
    self.updater = updater

    // Create our view model for our CheckForUpdatesView
    self.checkForUpdatesViewModel = CheckForUpdatesViewModel(updater: updater)
  }

  var body: some View {
    Button("Check for Updates…", action: updater.checkForUpdates)
      .disabled(!checkForUpdatesViewModel.canCheckForUpdates)
  }
}
```

The comments are from the Sparkle team.

In my To-Day app, I have an `AppGroup` view to provide the SwiftUI view for the last section of the menu that controls the app itself.

Inside this view, I added an `updaterController` property:

```swift
private let updaterController = SPUStandardUpdaterController(
  startingUpdater: true,
  updaterDelegate: nil,
  userDriverDelegate: nil
)
```

This required an `import Sparkle` line at the top of this file also.

To trigger the update checker, I added `CheckForUpdatesView` as one of the views in the menu, providing it with this controller's updater:

```swift
CheckForUpdatesView(updater: updaterController.updater)
```

### Exporting the App

Now that the app is coded, you need to export it from Xcode, signing it with your Developer ID and getting it notarised by Apple. This assumes that you have an Apple Developer account.

In Xcode, select **Archive** from the **Product** menu. This builds the app and opens the Organiser window. Click **Distribute App**, check **Developer ID** and click **Next**.

Make sure **Upload** is selected and click **Next** again. Choose **Automatically manage signing** and click **Next** again. When the next dialog appears, click **Upload**.

This sends the app off to Apple's servers to be checked for malicious code. It's not doing any app review, just checking for viruses etc.

It may take a few minutes, but the app should then be notarised. You may have to go to another display in the Organiser and back again to force a display refresh so you can see this. If there is an error, click **Show Status Log** to see what went wrong.

Assuming all went well, click **Export Notarised App** and save it somewhere convenient.

If you don't have an Apple Developer account, select **Copy App** from the distribution dialog and save a folder containing the app. If a user has the default Gatekeeper settings on their Mac, they'll need to right-click the app and select **Open** to run it, after getting past a couple of warnings.

### Making a Disk Image

The next step is to create the disk image for distribution. You can use a zip file or a disk image, but I prefer a disk image because it gives you a way to guide users to install the app in their Applications folder.

The process for this is:

1. Make a writeable disk image.
2. Add the app and a link to Applications.
3. Set the view options, including a background image.
4. Convert the image into a read-only copy.

Open **Disk Utility** from Applications/Utilities. Select **New Image > Blank Image…** from the **File** menu. Set its name in two places and its size. The size should be about 2 x the size of your app to allow for future updates.

Double-click the image to open it and drag your exported app into the disk image window. **Command-Option-drag** your Applications folder in. You'll know you're holding down the right modifiers if you see a curved black arrow at the bottom left of the icon.

Now configure the disk image window using Finder's View menu and View Options. I turn off all the extra views: toolbar, path bar, status bar etc. then I set the view options like this:

![Configuring the disk image][i6]

Setting a background image takes a few steps. First, find an image you like. Not being graphically minded, I used a rectangle filled with a gradient and added a curved arrow that pointed from the app to the Applications folder. My file is a png, but I think a jpg will work fine. You can click this link if you want to see my sample [background image][i7].

Drag the image file into your disk image. Don't worry about positioning it - you're about to make the file invisible. With Finder active, press **Shift-Command-.** to show invisible files. Now, rename the background image file to **.background.png**. The leading period makes this an invisible file, but you can see it at the moment. Open the View Options again and select **Picture** for the Background. Drag your image file into the well. This may show that you need to re-position the arrow, so repeat the process until you get an image that looks right. Then press **Shift-Command-.** again to hide invisible files. Re-position the visible icons to suit and adjust the size of the window to what you want to show.

Now that the disk image is configured, eject it. Back in Disk Utility, select **Images > Convert…** and choose your dmg. On the next dialog, change Image Format to **read-only** and click **Convert**. This is the disk image that goes into your Releases folder, so change its name to match your app and move it. Keep the read-write disk image too - it's much easier to edit it when updating instead of going through this process every time.

Open the read-only image and check that it's set up the way your want. I have found that sometimes the background image doesn't stick. If this happens to you, eject and trash the read-only image. Mount the read-write image again, confirm its settings and re-convert.

### Generating the appcast.xml

Now to create the file that Sparkle uses to see if there is an update.

Use the method from when you generated a key to open a Terminal at the Sparkle directory. Type in:

```bash
./bin/generate_appcast /path/to/your/Releases/folder
```

Once you're typed the command and a space, you can drag your Releases folder in to get its path.
Press Return and wait while Sparkle generates the **appcast.xml** file.

And finally, you're ready to release. Upload your Releases folder to wherever you decided to put it, making sure that the URL for the appcast.xml file is the same as in your app's info.

### Testing

Move the notarised app into your applications folder and run it. If all has worked, you should be able to check for updates and see that you have the latest version.

If you get an error, check back through all the setup phases. I know I made every mistake possible when setting it up first, so check the sandbox setting, the info and the entitlements. Use a web browser to confirm that the appcast.xml file is where you said it would be.

Testing an update requires a new version, so make some small, visible change to your app. Increment the version and build numbers, then archive, notarise and export as before. Find the read-write disk image and mount it. Replace the app there with your new version and then eject the disk image. Create a new read-only disk image and replace the copy in your Releases folder with it.

Run the `./bin/generate_appcast` again and it will add a new entry to your appcast.xml file with the new version data.

If you want to add some release notes, open **appcast.xml** in a text editor. The top entry is the latest. You can include a description tag and if you use the `<![CDATA[ ... ]]>` wrapper, you can add HTML:

![Adding release notes][i8]

Upload the Releases folder as before and then run your first version of the app. Check for updates and see what happens.

If it doesn't work, check the Console app and see if you can see any errors there that might point you in the right direction.

This can be a frustrating process, but once you have it all set up correctly, it works very well. I added a ReadMe to my project listing the steps I need to follow when publishing an update, so that I don't have to remember them every time. I recommend this or something similar.

### Summary

Sparkle is a great tool and once you have everything configured, it works really well. Configuring it can be tricky, especially as their docs cover so many different use cases.

Check out the [GitHub repo][4] for my To-Day app to see how I've configured it.

If you have any suggestions or if you run into any problems following this guide, please contact me using one of the links below or through the [Contact][contact] page. And if you found this article useful, I'd love you to [buy me a coffee][kofi].


[1]: /post/2023/to-day/
[2]: https://sparkle-project.org
[3]: https://sparkle-project.org/documentation/
[4]: https://github.com/trozware/To-Day
[5]: https://sparkle-project.org/documentation/programmatic-setup/

[contact]: /contact/
[kofi]: https://ko-fi.com/trozware

[i1]: /images/sparkle_install.png
[i2]: /images/sparkle_key.png
[i3]: /images/sparkle_folder.png
[i4]: /images/sparkle_info_key.png
[i5]: /images/sparkle_connections.png
[i6]: /images/sparkle_dmg.png
[i7]: /images/dmg_background.png
[i8]: /images/sparkle_release_notes.png
