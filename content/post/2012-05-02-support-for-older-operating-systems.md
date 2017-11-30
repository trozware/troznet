---
date: 2012-05-02T00:00:00Z
tags:
- operating systems
title: Support for older operating systems
url: /support-for-older-operating-systems/
---

Working out what operating systems to support in your software is always a
difficult decision. I only program for Mac & iOS systems for starters. This is
because they are the systems I use and understand. I am not interested in
expending the time & money needed to program and test my software for other
systems.

Within the Mac & iOS ecosystems, there is still the decision of which versions
to support. Partially, this is based on the usage statistics of each version. I
found a site that segments the current Mac market:
<a href="http://www.netmarketshare.com/operating-system-market-share.aspx?qprid=10&qpcustomb=*2" target="_blank">Distribution
of Mac OS X versions</a>. This tells me that OS 10.6 & OS 10.7 between them have
83% which makes 10.6 a good cut-off point.

Distribution of iOS versions is harder to discover, but I found a post that did
a good job of analysing the statistics that are available:

[ pxldot (iOS Ebb and Flow)][1]. According to this post, by March 2012, iOS had
about 75% with the remainder being almost exclusively iOS 4.

So based on statistics alone, it makes sense to support Mac OS X 10.6 or later
and iOS 4 and later. However this doesn't cover all the relevant issues. Another
important factor is new techniques and APIs introduced in Apple's developer
tools.

In iOS 4, Apple gave us ARC - Automatic Reference Counting - which basically
removes the tedious job of memory management. This was especially painful in iOS
apps where there is no garbage collection. [The Long Weekend Website][2] has an
excellent summary of ARC - what it is and how to use it. Since this only
excludes iOS 3 or earlier, there is no issue using this for all iOS projects.

But now Apple has extended ARC to Mac apps as well, but only for apps built to
run under 10.7 or later. Even though Mac apps could use garbage collection to
remove some of the burden of memory management, this had its own inefficiencies
and overheads. So in my case, I have decided that all future apps will require
10.7 to take advantage of ARC. Existing apps will stay as is - requiring 10.6 or
later. With 10.8 not that far away, the usage statistics should follow this
trend.

Back to iOS, there is another new feature of Xcode that is really too attractive
to ignore and that is story-boarding. This is a graphical way of laying out the
navigation logic for your app and providing segues between different views. Ray
Wenderlich has a good [introduction to storyboards][3]. So this means that my
future iOS apps will all require 10.5 or later.

One final factor is testing. You really need to have a device running each
version of any supported operating system. I would rather concentrate on getting
the best result for users of the latest versions that spend my time tweaking for
older systems. With iOS, Apple makes it amazingly easy to update to the latest
version. With Macs it costs money which is always a barrier, but technically,
the App Store is making updates easier to apply.

[1]: http://pxldot.com/post/18754186750/ios-ebb-and-flow
[2]: http://longweekendmobile.com/2011/09/07/objc-automatic-reference-counting-in-xcode-explained/
[3]: http://www.raywenderlich.com/5138/beginning-storyboards-in-ios-5-part-1
