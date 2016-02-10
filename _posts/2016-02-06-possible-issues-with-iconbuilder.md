---
title: Possible issues with Icon Builder & Watch icons
author: Sarah
layout: post
permalink: /2016/02/possible-issues-with-iconbuilder/
tags:
  - icons
  - apple watch
  - xcode
---

It has come to my attention that there are two possible issues with Icon Builder 3.0.1 when using icons created for an Apple Watch app.
Once of them is something I can fix and the other appears to be a bug in Xcode 7.2

---

**Update:** Version 3.2 of Icon Builder is now available in the [Mac App Store][3]. This removes the alpha channel from icons for a watch app.

---

The first problem is that iTines Connect now requires that the icons for an Apple Watch app include no alpha channel. This is becoming an increasing trend with it first having applied to the large icon file you upload directly to iTunes Connect, then to screen shots. I expect it to extend to iOS app icons soon, but hopefully Mac app icons can continue to include transparency.

With Apple Watch icons, you are supposed to create a set of square icons and watchOS or iTunesConnect applies the rounding mask. Presumably this is more complicated if the icon contains an alpha channel even if there are no transparent pixels. If your Watch app icons contain an alpha channel, you will see errors like this after uploading your app to iTunes Connect:

> Invalid Icon - The watch application 'AppName.app/Watch/AppName WatchKit App.app' contains an icon file 'AppName.app/Watch/AppName WatchKit App.app/AppIcon-Watch24x24@2x.png' with an alpha channel. Icons should not have an alpha channel.

You will probably get this error message for every icon size in the Watch app (8 in total).
Until I release a new version of Icon Builder that allows for this this, I suggest you use this [Alpha Channel Remover app][1].

In your Xcode project, go to WatchKit App Assets.xcassets, select the AppIcon set, right-click and choose "Show in Finder". A folder will open containing eight .png files and one .json file. Drag & drop the .png files into the Alpha Channel Remover window and click the "Remove Alpha Channel" button. This will replace all those image files with new versions without alpha channels. To confirm this, select any of the images and press Command-I to get info. In the More Info section, you will see "Alpha channel: No".

You can now submit your app again, but that only solves one of the issues.

---

The other problem is that you will get a warning about the 44x44@2x.png icon file.

> Invalid Icon Name - The watch application 'AppName.app/Watch/AppName WatchKit App.app' contains an invalid icon file name 'AppName.app/Watch/AppName WatchKit App.app/AppIcon-Watch44x44@2x.png'. Make sure that icon file names follow the pattern<br> "`*<dimension>@<scale>x.png`" and they match the required dimensions. Please visit https://developer.apple.com/watchkit/ for more information.

As you can see in the error message, the icon name (which is set by Xcode) does conform to the required pattern, and the image is the correct size. This appears to be a [bug in Xcode 7.2][2] but does not stop you from submitting your app as it is only a warning and not an error. Presumably this will be fixed in later version of Xcode. I am running Xcode 7.2.1 and still see this warning.



[1]: https://www.cocoacontrols.com/controls/alpha-channel-remover
[2]: http://www.openradar.me/23801324
[3]: http://itunes.apple.com/app/icon-builder/id552293482
