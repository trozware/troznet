---
date: 2016-09-17T00:00:00Z
mac_app_desc: Make and install a set of icons for an iOS, Mac or Apple Watch app in
  just 3 steps.
mac_app_image: /icons/IconBuilder128.png
mac_app_name: Icon Builder
tags:
- icons
- mac
title: How much work does Icon Builder save you?
---

[Icon Builder][1] is a Mac app that takes a single image file and creates all
the different image sizes that you need to make a set of icons for your app:
Mac, iPhone, iPad, iOS Universal or Apple Watch.

Version 4, released 16 September 2016 is available through the [Mac App
Store][2].

## What's New in Version 4:

* Added support for iMessage apps and Sticker Pack apps.
* Added support for creating Mac .icns files.
* Better removal of alpha channel for Apple Watch icons.
* Clearer usage instructions in ReadMe files.
* iTunes Artwork folders will no longer be over-written with the latest image
  files.
* Supports macOS Sierra and Xcode 8

![Icon Builder][3]

While working on version 4 and accommodating all these new icon sets (and
wishing I had the time to re-write the app in Swift...), I counted up all the
icon files that Icon Builder makes for each app type:

| App Type                                  | Number of Icons |
| :---------------------------------------- | --------------: |
| Mac                                       |              10 |
| iPhone                                    |               8 |
| iPhone supporting pre iOS 7               |              11 |
| iPad                                      |               9 |
| iPad supporting pre iOS 7                 |              13 |
| iOS Universal                             |              14 |
| iOS Universal supporting pre iOS 7        |              20 |
| Apple Watch (also requires iOS app icons) |               8 |
| Sticker Pack app                          |              11 |
| iMessages app                             |              14 |
| iMessages app Messages extension          |               9 |

So as you can see, Icon Builder is doing a lot of work for you. It also names
all the icon files using the expected format, stores them in an concept folder,
creates the JSON file that identifies them all to Xcode and optionally installs
them in your Xcode project automatically. That’s a lot of value for dragging in
an icon and clicking a button!

So next time your designer sends you the twentieth tweaked icon for the day,
don't get mad. Just drop it into Icon Builder and sit back while it does all the
work. (No need to tell the designer that...)

[1]: /icon-builder/
[2]: https://itunes.apple.com/app/icon-builder/id552293482
[3]: /images/IconBuilder.png
