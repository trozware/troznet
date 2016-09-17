---
title: Dice Pass Mac Update
author: Sarah
layout: post
permalink: /2016/07/dice-pass-mac-update/
tags:
  - app store
  - dice
  - mac
  - password
---
I recently got an email from someone who had purchased [Dice Pass][2] for Mac from the [Mac App Store][3] but had been unable to get it to run. This person was using OS X 10.9.3.

I checked the App Store specifications and it showed that 10.9 was the minimum system requirement, so it should have worked. But going back to my Xcode project, I found that it was set to a minimum of OS X 10.10.

I tried to re-compile for OS X 10.9 but this failed as the app uses several features that are not available prior to 10.10.

The minimum system version as displayed in the App Store is supposedly deduced automatically by the App Store servers from the app's binary. Somehow this was incorrect in the App Store, so some people may have bought that app and found that it did not work despite them having what was listed as a compatible system.

If you bought Dice Pass for OS X 10.9 and are unable to run it, I have two possible solutions for you:

1. Upgrade your operating system to at least 10.10.
2. Ask Apple for a refund since it was their error that caused you to buy an app that you cannot run.

I have updated the app in the App Store changing nothing but the version number and it is now showing the correct minimum system requirement. My apologies if you have been inconvenienced by this error.

[2]: /dicepass/
[3]: https://itunes.apple.com/app/dice-pass/id997688302
