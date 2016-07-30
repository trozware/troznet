---
title: How much work does Icon Builder save you?
author: Sarah
layout: post
permalink: /2016/07/how-much-work-does-icon-builder-save-you/
tags:
  - icons
  - mac
---
[Icon Builder][1] is a Mac app that takes a single image file and creates all the different image sizes that you need to make a set of icons for your app: Mac, iPhone, iPad, iOS Universal or Apple Watch. You can get it through the [Mac App Store][2].

![Icon Builder][3]

Recently I was working on an update so that the app could also make icons for the new iOS 10 Sticker Pack apps and iMessages apps. After struggling with document icons for an upcoming document-based app, I also added the ability to create Mac icns files which was previously only available in my companion app Icns Maker.

While working on all these new icon sets (and wishing I had the time to re-write the app in Swift...), I counted up all the icon files that Icon Builder makes for each app type:

|App Type|Number of Icons|
|:------|---------------:|
|Mac|10|
|iPhone|6|
|iPhone supporting pre iOS 7|9|
|iPad|7|
|iPad supporting pre iOS 7|11|
|iOS Universal|11|
|iOS Universal supporting pre iOS 7|17|
|Apple Watch (also requires iOS app icons)|8|
|Sticker Pack app|15|
|iMessages app|11|
|iMessages app Messages extension|12|

> The figures for the Sticker Pack and iMessage apps are valid for Xcode 8 beta 3 but may change, in which case I will update Icon Builder to match.

So as you can see, Icon Builder is doing a lot of work for you. It also names all the icon files using the expected format, stores them in an concept folder, creates the JSON file that identifies them all to Xcode and optionally installs them in your Xcode project automatically. That’s a lot of value for dragging in an icon and clicking a button!

So next time your designer sends you the twentieth tweaked icon for the day, don't get mad. Just drop it into Icon Builder and sit back while it does all the work. (No need to tell the designer that...)

I submitted the app to iTunes Connect for review and release but sadly it was rejected due to references to pre-release software. If any developers would like to use Icon Builder to help with Sticker Pack or iMessages apps, [send me a screen shot][4] of Icon Builder running on your computer and I will send you a pre-release copy of Icon Builder.  

[1]: /icon-builder/
[2]: https://itunes.apple.com/app/icon-builder/id552293482
[3]: /images/IconBuilder.png
[4]: mailto:sarah@troz.net?subject=Icon%20Builer%20pre-release&body=Attach%20a%20screenshot%20of%20Icon%20Builder%20running%20on%20your%20Mac: