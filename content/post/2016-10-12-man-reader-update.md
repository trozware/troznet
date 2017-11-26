---
author: Sarah
date: 2016-10-12T00:00:00Z
macappdesc: A utility app for reading macOS man pages.
macappimage: /icons/ManReader128.png
macappname: Man Reader
tags:
- man reader
- mac
title: Man Reader Update
url: /2016/10/man-reader-update/
---

[Man Reader][1] has just been updated to version 1.7 and is available through
the [Mac App Store][2].

The main reason for this update was to make the app work well with macOS Sierra,
as I found that version 1.6 was sometimes crashing on launch. While doing this,
the update was rejected by the App Store reviewers because it crashed on OS X
10.10. Since I no longer have a Mac running 10.10, I decided to set the minimum
supported system version to OS X 10.11. If you need support for older versions,
you should still be able to download version 1.6 which will work back to 10.7.

I also took the opportunity to fix some graphical issues, dealing with different
color schemes:

* The man page list now shows alternating colors even when not using the default
  scheme.
* When scrolling the man pages past the top or the bottom with a non-white
  background, you should no longer see white blocks top & bottom.

[1]: /manreader/
[2]: http://itunes.apple.com/app/man-reader/id522583774?mt=12
