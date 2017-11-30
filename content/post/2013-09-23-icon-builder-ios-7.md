---
date: 2013-09-23T00:00:00Z
tags:
- icons
- mac
- ios
title: Icon Builder & iOS 7
url: /icon-builder-ios-7/
---

Icon Builder 1.2 was released on 18 September 2013.\
It was an update with 2 new functions:

* The ability to create images to suit an Xcode 5 assets library
* The ability to create icons with the required sizes for IOS 7 apps.

Knowing that iOS 7 apps can only be built using Xcode 5, I linked the switch for
these 2 abilities in a single check box.\
The problem was not really that they were in a single checkbox but that I had labelled
it badly, so it was not obvious that this was what needed to be checked to create
iOS 7 sized icon files.

After some feedback from early users, it became clear to me that this was not
enough. So 1.2.1 is now waiting for Apple's approval.\
The changes in this version are:

* More informative labelling of the checkbox.
* The checkbox is checked by default is Xcode 5 is installed

While waiting for the new version to be approved, please be aware that iOS 7
icon sizes will only be generated if you select "Check Assets (for Xcode 5.x or
later)"
