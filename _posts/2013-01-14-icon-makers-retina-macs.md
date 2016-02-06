---
id: 445
title: 'Icon Makers &#038; Retina Macs'
author: Sarah
layout: post
guid: /?p=445
permalink: /icon-makers-retina-macs/
tags:
  - icons
  - mac
  - ios
---
Icns Maker which makes an icns icon file for Mac apps, and Icon Builder which makes the suite of png files needed for iOS apps, are both compatible with the Retina MacBook Pro.

However it was recently brought to my attention (thanks Cameron), that when running on a Retina MBP, all the icon files were exactly twice as large as they should be. The Icon.png file which supplies the main app icon for iPhone apps should be 57 pixels by 57 pixels. Using Icon Builder on a Retina MBP produced an Icon.png file that was 114 x 114 pixels.

I have now worked out how to persuade the Retina Mac that when I ask for an image size, I actually want that size, not the size that OS X thinks would look better. Updates to these 2 apps will be submitted to the App Store for approval later today which will solve the problem.

In the meantime, there is a work-around for Retina MBP users: force the app to run in low resolution mode.

In Finder, open your Applications folder and select the app (this works for both Icns Maker and Icon Builder). Press Command-I or choose Get Info from the File menu which will open a window like this:

<img alt="Selecting low resolution mode" src="/images/LowRes.png" width="379" height="952" />

Check the checkbox labelled &#8220;Open in Low Resolution&#8221;. Next time the app is opened, it will ignore the Retina options and use standard resolution only. This will create icon files with the correct sizes. However text may look slightly fuzzy.

When the updates to these apps become available, make sure you go back and un-check this setting to return to Retina mode.