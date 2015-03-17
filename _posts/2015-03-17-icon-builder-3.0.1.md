---
title: Icon Builder 3.0.1
author: Sarah
layout: post
permalink: /2015/03/icon-builder-3.0.1/
tags:
  - icons
  - mac
  - ios
  - apple watch
  - xcode
---

So why an announcement for such a minor upgrade?

Version 3.0 got no announcement because it was not the release I wanted.

Having downloaded the Xcode 6.2 & 6.3 betas, I had worked out what icons were needed to a WatchKit app.
This, combined with several other changes, made me bump the version number to 3.0.

Sadly, Apple rejected the update because it referred to pre-release products. So I pulled all mentions of WatchKit out of the interface and meta data and got 3.0 released.

After the Apple keynote on March 9th, I re-enabled the WatchKit portions of the app and re-submitted to the App Store, hoping that with the WatchKit SDK now part of the official Xcode release, Apple's reviewers would allow it to get through this time.

This worked - in fact the app was reviewed and accewpted within 6 days - so now Icon Builder adds WatchKit to its list of supported platforms.

Actually, Apple may have done me a favour in rejecting the first one as they changed the specifications for the icons slightly between Xcode 6.2 beta and Xcode 6.2 release.

---

#### What’s New in version 3?

* Support for WatchKit app icons (version 3.0.1)
* Simplified interface: removed display of smaller icons.
* Fix for @3x images not being saved when you selected iOS 6 support.
* iTunesArtwork@2x file now saved as a JPG to avoid iTunes Connect errors.
* Removed CarPlay icon - Xcode sometimes gave errors when this was included.

