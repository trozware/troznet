---
date: 2012-10-01T00:00:00Z
title: Icns Maker
url: /icns-maker/
---

[Icns Maker][1] is available from the Mac App Store.

[1]: http://itunes.apple.com/app/icns-maker/id550942266?mt=12&uo=4

# Make an icns in 2 steps:

[<img alt="Make an icns in 2 steps" src="/images/IcnsMaker1-300x255.png" width="300" height="255" />][1]

1. Drag an image into the window.

2. Click “Create icns” or “Create assets”.

This creates a .icns file or assets folder that can be imported directly into
your Xcode project for use in your app.

---

## Why is this necessary?

In versions of Xcode before 4.4, Apple provided an app called “Icon Composer”.
It allowed you to drag images into a window and export a .icns file for use in
your apps. With Xcode 4.4, Apple has changed the way icons are handled for Mac
apps and "Icon Composer" is no longer supplied.

Search the Xcode documentation for “Icon Design Guidelines” and scroll down to
“Provide the Correct Resources” and “Packaging Your Icon Resources” for more
info.

For Xcode 4, you now create a special .iconset folder and load it up with
various sized images. Then you run a shell command to stitch these specifically
named files into a single .icns file that can be used in your Xcode project.
None of this is rocket science, but it is tedious and repetitive - just the
right sort of task for a computer.

With Xcode 5.x, Apple has changed things again. Now your project contains a
special folder called “Images.xcassets” which contains all the image files used
in your project, including the app icons.

If you have checked the “Create Assets (for Xcode 5.x or later)” checkbox, a
folder of images will be created instead of the icns file. The images in this
folder can be imported into your “Images.xcassets” folder for use as your app
icon. A ReadMe file in the images folder will give the details on this.

Note that apps submitted to the Mac App Store now require a 1024x1024 version of
the icon.

---

## If you want more control:

Click the “Smaller sizes” switch to show all the other image
sizes.[<img alt="Get More Control" src="/images/IcnsMaker2-300x187.png" width="300" height="187" />][2]

When you drag an image into the 1024 x 1024 area, it is resized to supply all
the required images. If you have a smaller version of your icon image that you
want to use for some of the smaller sizes, just drag the image into the largest
image area that you want it to be used for.

As an example, if you want to show a lower resolution image for 64x64, 32x32 and
16x16, create the lower resolution image at 64x64 pixels and drag it into the
64x64 area. It will be used for the 64x64 image and resized to make the 32x32
and 16x16 images. The larger images will still use the original 1024x1024 image
scaled down.

If you want, you can specify a different image for every required size.

512x512 images will be resized to 1024x1024 if required to assist when
converting older icons, but no other images will be enlarged.

---

## FAQ

**Q.** What image types can I use?\
**A. **Any image type compatible with QuickTime, including JPEG, PNG, TIFF, GIF,
PDF, PSD, BMP.

**Q.** Does this app make icons for OS X Mavericks (10.9) apps?\
**A. **Yes, the required image sizes for icons have not changed in 10.9.

**Q.** What version of Xcode do I need?\
**A. **This app is designed to help when using Xcode 4.4 or later.

* For Xcode 4.x, make sure to un-check "Create Assets (for Xcode 5.x or later)".
* For Xcode 5.x, check the "Create Assets (for Xcode 5.x or later)" checkbox.

**Q.** What if my starting image is the wrong size?\
**A. ** If your image is not square, it will be cropped when you drag it in. If it
is the wrong size for the image area you are dragging it into, it will be resized
to fit.

**Q.** How I start again with a blank slate?\
**A.** Choose “New” from the File menu, or press Command-N.

**Q.** Do I have to drag images in?\
**A.** No, you can copy & paste an image file, or an image.

**Q.** What if I want to update an existing .icns file?\
**A.** Drag it in or choose “Open icns…” from the File menu. You may find that you
need to make a new image for the 1024x1024 size.

**Q.** Does Mac Icns Maker create icons suitable for Retina displays?\
**A.** Yes. That is why it uses a 1024x1024 version of your image.

**Q.** Does Icns Maker create icons for use in iPad and iPhone apps?\
**A.** No. icns files are used in Mac apps only. For iOS apps, check out the companion
product:[ Icon Builder][3].

**Q.** I'm a programmer, not a graphic designer. How do I make icon images?\
**A.** One easy way to create basic shapes with gradients, text, added images etc.
is to use Keynote. I presume PowerPoint has the same sort of abilities.

[1]: /images/IcnsMaker1.png
[2]: /images/IcnsMaker2.png
[3]: /icon-builder/ "Icon Builder"
