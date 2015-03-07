---
id: 397
title: 'Icon makers for Mac &#038; iOS apps'
author: Sarah
layout: post
guid: /?p=397
permalink: /icon-makers-for-mac-ios-apps/
dsq_thread_id:
  - 3569563929
categories:
  - Icons
---
Announcing two new apps for creating icons for with Mac or iOS projects:

[Icns Maker][1] helps you convert a single image into a .icns file in two steps.  
[Icon Builder][2] creates all the files needed to set up your icons for any iOS project.

## Creating icon files for Mac apps:

In versions of Xcode before 4.4, Apple provided an app called “Icon Composer”. It allowed you to drag images into a window and export a .icns file for use in your Mac apps. With Xcode 4.4, Apple has changed the way icons are handled for Mac apps and “Icon Composer” is no longer supplied.

The Xcode docs describe the process you need to go through to make a .icns file: create a suite of image files of the correct size and with the correct file names, bundle them into a specially named folder and then use Terminal to stitch them together.

[Icns Maker][1] does all this for you in two easy steps.

  1. Drag in an image file (preferably 1024&#215;1024 but 512&#215;512 will also work).
  2. Click a button.

There are more options available for fine-tuning your icons allowing you to select different images for the various sizes, but this is all that is needed for basic operation.

Icns Maker is available from the <a href="http://itunes.apple.com/app/icns-maker/id550942266?mt=12&uo=4" target="_blank">Mac App Store</a>.

* * *

## Creating icon files for iOS apps:

Icons for iOS apps are not bundled into a single file like a Mac .icns file. You add various .png images to your project. Depending on the devices supported by your app, you will need many different sizes of icon file. There are some icons for iPad only, some for iPhone / iPod Touch only and others required for any device. Additionally, you will need larger versions of each image to support Retina displays.

[Icon Builder][2] is a Mac app that does all this for you. As with Icns Maker, you just drag your image into the app and click a button. You can also select which devices your icon needs to suit and use different images for the different sizes if you want finer control.

When the app creates your icon files, it generates a ReadMe file with the information needed for installing these files in your project, including information to copy & paste directly into your Info.plist file.

Icon Builder is available from the <a href="http://itunes.apple.com/app/icon-builder/id552293482?mt=12" target="_blank">Mac App Store</a>.  
Note that although this app builds icon files for iOS app, it runs on a Mac.

* * *

## Naming:

Originally these apps were named in a consistent manner: Mac Icon Builder and iOS Icon Builder. However both these names were rejected by Apple &#8211; you are not allowed to use the words &#8220;Mac&#8221; or &#8220;iOS&#8221; in any app name sold through the Mac App Store.

Then I tried Icns Maker and Icon Maker. Icns Maker was approved, but there is already an app called Icon Maker, so I went with Icon Builder. But by that time Icns Maker had already been released, so there was no way to make the names more consistent.

 [1]: /icns-maker/ "Icns Maker"
 [2]: /icon-builder/ "Icon Builder"