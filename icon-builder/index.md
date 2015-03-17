---
id: 328
title: Icon Builder
author: Sarah
layout: page
guid: /?page_id=328
dsq_thread_id:
  - 3565820802
---
[Icon Builder 3.0.1][3] is available from the Mac App Store. 

   [3]: http://itunes.apple.com/app/icon-builder/id552293482?mt=12


### Make and install a set of icons for an iOS, Mac or Apple Watch app in 3 steps:

1: Drag an image into the window.

![Make an icon set in 3 steps][1]

   [1]: /images/IconBuilder1.png

2: Choose the device family you are building for: iOS Universal, iPhone, iPad, Mac or Apple Watch.

If you are building for iOS and your app still supports iOS 6, then you need to change the setting in the iOS popup menu.

3: Click "Create icon assets" and select the folder containing your Xcode project.

Icon Builder will create an AppIcon set inside the "Images.xcassets" folder for that project.  
The icons are immediately ready for use in your project with no installation necessary.
> You will get the best results if you start with a 1024 x 1024 image.

* * *

### Why is this necessary?

Depending on the devices supported by your app, you will need many different sizes of icon file. There are some icons for iPad only, some for iPhone / iPod Touch only and others required for any iOS device. Mac apps use completely different icon sizes. And now we have Apple Watch with a different set of icons again. Additionally, you will need larger versions of each image to support Retina displays and iOS 7 & 8 use different icon sizes from the previous versions of iOS. The iPhone 6 Plus uses @3x images in some cases.

With Xcode 5 and later, Apple has changed the way a project stores image files, including the various sizes of app icon. Now your project contains a special folder called "Images.xcassets" which contains all the image files used in your project, including the app icons. Icon Builder will install the icon files into your "Images.xcassets" folder automatically.

* * *

### Using the icon images:

![Using the icons][2]

   [2]: /images/IconBuilder2.png

Icon Builder creates all the required image files in a folder called "AppIcon.appiconset" inside the "Images.xcassets" folder for your project. If you already have images stored in an appiconset folder, Icon Builder will not over-write them, but will add a new folder e.g. "AppIcon-1.appiconset". You can then switch between AppIcon sets in the project settings for your target app.

For submitting apps to the iTunes App Store, you will need a 1024x1024 image. For convenience, this file (iTunesArtwork@2x.jpg) is saved for you in a folder called iTunes Artwork images in the same folder as your xcodeproj file. For iOS, this folder will also include a 512x512 file called iTunesArtwork with no file extension. You will need to include this in your project (but not in "Images.xcassets") if you are distributing an AdHoc version of your iOS app through iTunes.

The ReadMe-IconBuilder.rtf file (saved in the same folder as your xcodeproj file) has more information about the image files created.

* * *

### What's New in version 3?

  * Support for WatchKit app icons (version 3.0.1)
  * Simplified interface: removed display of smaller icons.
  * Fix for @3x images not being saved when you selected iOS 6 support.
  * iTunesArtwork@2x file now saved as a JPG to avoid iTunes Connect errors.
  * Removed CarPlay icon - Xcode sometimes gave errors when this was included.

In previous versions of Icon Builder, the app saved all the icon files and you had to install them into your app project manually. Now Icon Builder creates an appiconset and installs it automatically in your project.

The other big change is that Icon Builder now creates icons for Mac apps. Mac apps used to use a different file format, but now they use appiconsets too, so it made sense to merge both my icon apps into one.

This app will NOT create the icns files that were used for Mac apps before Xcode 5 or 6. If you need icns files for another environment, use [Icns Maker][4] instead.

[4]: http://troz.net/icns-maker/

* * *

### FAQ:

I thought there were only 2 steps before - why are there 3 now?

  * The 2 step process gave you a folder of image files. You then had to install them manually. So really, there were always three steps, but the app was not helping you with step 3. By adding a third step asking you to locate your project folder, I was able to make the app install the icons for you automatically. So the app is doing step 3 for you.

What if I want to install the icon files myself?

  * When asked to select a folder to save the icons, select a folder that does not contain a .xcodeproj file. Icon Builder will save all the files, but not install them into an Images.xcassets folder automatically.

What image types can I use?

  * Any image type compatible with QuickTime, including JPEG, PNG, TIFF, GIF, PDF, PSD, BMP.

Does this app make icons for iOS 8 apps?

  * Yes, the default is to make icons for iOS 7 & 8 only. If your app supports iOS 6 as well, select "Include iOS 6" from the iOS popup and the icon sizes will be altered to suit. iOS 8 does require some larger icons to support the higher resolution display in the iPhone 6 Plus. Icon Builder now also creates those files.

Does Icon Builder create icons for use in Mac apps?

  * Yes. When Mac apps used a different file format, I had a separate app to create Mac icns files. Now Mac apps use image assets just like iOS apps, but with different image sizes. Select Mac in the Device popup to create icons for a Mac app. 

What version of Xcode do I need?

  * This app requires Xcode 5.x or later.

I don't use Xcode, I use an alternative IDE. Can I still use the icons created by this app?

  * Yes, you can save the icon set to a folder and install the icons manually in the IDE of your choice.

What if my starting image is the wrong size?

  * If your image is not square, it will be cropped when you drag it in.
  * It will then be resized to create all the required image sizes.

How do I start again with a blank slate?

  * Choose "New" from the File menu, or press Command-N.

Do I have to drag images into the app?

  * No, you can copy & paste an image file, or an image.
  * Or choose "Open Image…" from the File menu, or press Command-O.

How can I delete the icons from my project?

  * Select "Images.xcassets" in the project navigator.
  * In the next sidebar, you will see a list of the asset sets in your project.
  * Select the one you want to delete (e.g. AppIcon, AppIcon-1) and press the Delete key.

I have an old project with no "Images.xcassets" - how do I add that?

  * Select the project at the top of the Project Navigator.
  * Make sure you are editing the target and go to the General tab.
  * In the "App Icons" section, click the "Use Asset Catalog" button.
  * The "Images.xcassets" folder will be created and any existing icons will be migrated to the new structure.

Why has the app made more icons than I need?

  * If your app only supports iOS 7/8 or only works with one family of iOS devices, then it does not need all the icons.
  * Select your options from the Device & iOS popups to adjust the number of icons created.

What if I want to use the images from a Mac .icns file?

  * Drag it in just like any image file. However the largest image in an .icns bundle is 512 x 512, so you may want to create a larger version.

Why are there files with @2x and @3x in the names?

  * These are for Retina displays and for iOS 7 or 8. iOS knows it needs a certain image size, but if the device has a Retina display, the system will look for an @2x file so it can squeeze twice as many pixels in and make it look sharp. For the iPhone 6 Plus, the system will use the @3x files if they are available.

Why is the iTunesArtwork@2x.jpg file a JPG when all the other files are PNGs?

  * iTunes Connect requires a 1024x1024 image file uploaded for each app. Recently, iTunes Connect has started rejecting some PNGs because they contained an alpha channel, even if they appeared to have no transparency. The best way to ensure there would be no alpha channel was to save the image as a JPG.

Why does the iTunesArtwork file have no file extension?

  * I don't know. But that is what Apple specifies for AdHoc distribution through iTunes. It is actually a .png image so if you need to open it, add the .png file extension temporarily.

I use Pixelmator. Can I drag my pxm files into Icon Builder?

  * No. Pixelmator's pxm files cannot be used directly. Export them as png files first.

I’m a programmer, not a graphic designer. How do I make icon images?

  * One easy way to create basic shapes with gradients, text, added images etc. is to use Keynote. I presume PowerPoint has the same sort of abilities.
