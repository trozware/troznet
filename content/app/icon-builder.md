---
date: 2020-11-15T15:58:55+10:00
mac_app_desc:
  Make and install a set of icons for an iOS, Mac or Apple Watch app in
  just 3 steps.
mac_app_image: /icons/IconBuilder128.png
mac_app_name: Icon Builder
title: Icon Builder
url: /icon-builder/
draft: true
---

[Icon Builder 5.3][3] is available from the Mac App Store.

{{< rawhtml >}}
<a href="https://apps.apple.com/us/app/icon-builder/id552293482?mt=12&amp;itsct=apps_box&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-top-left-radius: 13px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; border-bottom-left-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-mac-app-store/white/en-US?size=250x83&amp;releaseDate=1348531200&h=9ba18831621999e36eeec13e720d5932" alt="Download on the Mac App Store" style="border-top-left-radius: 13px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; border-bottom-left-radius: 13px; width: 250px; height: 83px;"></a>
{{< /rawhtml >}}

Updated 7th November 2020 with the ability to create Big Sur style macOS icons with padding and rounded corners.

[3]: http://itunes.apple.com/app/icon-builder/id552293482?mt=12

## Make and install a set of icons in 3 steps:

### For iOS, Mac, Apple Watch, Sticker Pack or iMessages apps.

1: Drag an image into the window.

![Make an icon set in 3 steps][1]

[1]: /images/IconBuilder1.png

2: Choose the device family you are building for: iOS Universal, iPhone, iPad, Apple Watch, Mac, Sticker Pack or iMessage.

3: Click "Create icon assets" and select the folder containing your Xcode project.

Icon Builder will create an AppIcon set inside the "Assets.xcassets" folder for
that project.
The icons are immediately ready for use in your project with no installation necessary.

---

## Why is this necessary?

Depending on the devices supported by your app, you will need many
different sizes of icon file. There are some icons for iPad only, some for
iPhone / iPod Touch only and others required for any iOS device. Mac apps
use completely different icon sizes. Apple Watch apps need a completely
different set of icons and Messages apps and Sticker apps require even
more - 2 different icon sets for Messages app. Additionally, you will need
larger versions of each image to support Retina displays and for the App
Stores.

These icons must be in PNG format, with the color space set to P3 or sRGB
and for iOS apps, the images must have no transparency and the alpha
channel must be deleted from the image files.

Your Xcode project contains a special folder called “Assets.xcassets” which contains all the image files used in your project, including the app icons. Icon Builder will install the icon files into your “Assets.xcassets” folder automatically and the icons are immediately ready for use in your project with no installation necessary.

Icon Builder still allows you to create the old-style .icns file if required by selecting “Mac icns” in the device family popup menu. This can be useful for other development environments or when making icons for documents in your Mac app.

> You will get the best results if you start with a 1024 x 1024 image.

---

## Using the icon images:

![Using the icons][2]

[2]: /images/IconBuilder2.png

Icon Builder creates all the required image files in a folder called “AppIcon.appiconset”, “AppIcon-Watch.appiconset” or “iMessage App Icon.stickersiconset” inside the “Assets.xcassets” folder for your project. If you already have images stored in an appiconset folder, Icon Builder will not over-write them, but will add a new folder e.g. “AppIcon-1.appiconset”. You can then switch between AppIcon sets in the project settings for your target app.

If you prefer to add the icon files manually, select a folder that does not contain a .xcodeproj file and the icon sets will be saved directly to that folder. You can then drag the iconset folder manually into “Assets.xcassets” in your Xcode project.

---

## What's New in version 5?

- Images can be rounded and padded for new style macOS icons.
- Icon images have the correct sRGB color profile attached.
- For iOS icons, transparency is replaced by white and the alpha channel is removed from the image file.
- The icons created match the latest Apple guidelines.
- The app has been completely re-written in Swift to use the latest macOS APIs so only supports macOS 10.13.x or later.

---

## FAQ

**I thought there were only 2 steps before - why are there 3 now?**

- The 2 step process gave you a folder of image files. You then had to install them manually. So really, there were always three steps, but the app was not helping you with step 3. By adding a third step asking you to locate your project folder, I was able to make the app install the icons for you automatically. So the app is doing step 3 for you.

**What if I want to install the icon files myself?**

- When asked to select a folder to save the icons, select a folder that does not contain a .xcodeproj file. Icon Builder will save all the files, but not install them into an Assets.xcassets or Images.xcassets folder automatically.

**What image types can I use?**

- Any image type compatible with QuickTime, including JPEG, PNG, TIFF, GIF, PDF, PSD, BMP.

**Does Icon Builder create icons for use in Mac apps?**

- Yes. Mac apps use image assets just like iOS apps, but with different image sizes. Select "Mac App" in the Device popup to create icons for a Mac app.
- If you want to create the new style of Mac icons with padding and
  rounded corners, check the "Rounded Mac App" button. This
  will look best if you leave "Fill in transparent areas"
  checked.
- Icon Builder still allows you to create the old-style .icns file if required by selecting "Mac icns file" in the Device popup menu. This can be useful for other development environments or when making icons for documents in your Mac app.

**What is the difference between Mac App Icon and Mac icns file?**

- "Mac AppIcon" will create the modern AppIcon set of images for inclusion in your Assets.xcassets.
- "Mac icns file" will create an old style .icns file with all the image sizes embedded into a single file. Open the file in Preview to see the contents.

**Does Icon Builder create icons for use in Watch Kit apps?**

- Yes. Select "Apple Watch" from the Device popup. Create a WatchKit target in your iOS project if necessary. When you are choosing the location to save the icons, select the folder containing the main .xcodeproj file. Icon Builder will find the WatchKit App folder and save the icons to the WatchKit App&#39;s Assets.xcassets folder. The icon set will be called AppIcon-Watch to help you distinguish between sets when allocating them to your apps.
- When the WatchKit icons have been made, Icon Builder will ask you if you want to use the same image to create the icons for the parent iOS app. Unless you want a different icon for the parent app, select the parent app device at this point to create the second set.

**Does Icon Builder create icons for use in iMessage apps and Sticker Pack apps?**

- Yes. Select "Sticker Pack App" or "iMessage App" from the Device popup. When you are choosing the location to save the icons, select the folder containing the main .xcodeproj file and Icon Builder will create the icon sets accordingly.
- iMessage apps require two sets: one for the Messages extension and one for the parent iOS app. When the iMessage icons have been made, Icon Builder will ask you if you want to use the same image to create the icons for the parent iOS app. Unless you want a different icon for the parent app, select the parent app device at this point to create the second set.

**Why is my starting image re-sized for a Sticker Pack app or iMessage app?**

- For Mac, iOS and Apple Watch apps, all the icons are square. For Sticker Pack apps and iMessage apps, most (but not all) of the icons are letterbox-shaped. Icon Builder displays your starting image in letterbox format when you choose "Sticker Pack App" "iMessage App" so that you can see how it will look.

**When I choose any iOS app type, my starting image loses its transparent background!**

- Apple requires that iOS icons have no transparency so Icon Builder displays the image like that so you can confirm the look. If you do not like the default change, edit the image to remove the transparency before using Icon Builder.

**What versions of macOS and Xcode do I need?**

- This app requires macOS 10.13 as it uses the latest APIs to manipulate images.
- Xcode 9 is the latest version, but Xcode 8 will probably work.

**I don't use Xcode, I use an alternative IDE. Can I still use the icons created by this app?**

- Yes, you can save the icon set to a folder and install the icons manually in the IDE of your choice. If your IDE requires a .icns file, select "Mac icns file" from the device popup.

**What if my starting image is the wrong size?**

- If your image is not the correct size, it will be cropped or expanded when you drag it in.
- It will then be resized to create all the required image sizes.
- If this does not give the result you want, resize or crop the image before dropping it into Icon Builder.

**How do I start again with a blank slate?**

- Choose "New" from the File menu, or press Command-N.

**Do I have to drag images into the app?**

- No, you can copy &amp; paste an image file, or an image.
- Or choose "Open Image&hellip;" from the File menu, or press Command-O.

**How can I delete the icons from my project?**

- Select "Assets.xcassets" in the project navigator.
- In the next sidebar, you will see a list of the asset sets in your project.
- Select the one you want to delete (e.g. AppIcon, AppIcon-1, AppIcon-Watch) and press the Delete key.

**I have an old project with no "Assets.xcassets" - how do I add that?**

- Select the project at the top of the Project Navigator.
- Make sure you are editing the target and go to the General tab.
- In the "App Icons" section, click the "Use Asset Catalog" button.
- The "Assets.xcassets" folder will be created and any existing icons will be migrated to the new structure.

**What if I want to use the images from a Mac .icns file?**

- Drag it in just like any image file. However the largest image in an .icns bundle is 512 x 512, so you may want to create a larger version.

**Why are there files with @2x and @3x in the names?**

- These are for high-resolution displays. iOS knows it needs a certain image size, but if the device has a Retina display, the system will look for an @2x file so it can squeeze twice as many pixels in and make it look sharp. For the larger or more recent iPhones, the system will use the @3x files if they are available.

**I use Pixelmator. Can I drag my pxm files into Icon Builder?**

- No. Pixelmator's pxm files cannot be used directly. Export them as png files first.

**I’m a programmer, not a graphic designer. How do I make icon images?**

- One easy way to create basic shapes with gradients, text, added images etc. is to use Keynote. I presume PowerPoint has the same sort of abilities.
