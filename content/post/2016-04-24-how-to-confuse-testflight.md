---
date: 2016-04-24T00:00:00Z
summary: I ran into an unusual problem when testing my latest app - What Is My Speed.
  It is now available from the iTunes App Store, but getting there was a struggle.
tags:
- app store
- testflight
- xcode
title: How To Confuse TestFlight
url: /2016/04/how-to-confuse-testflight/
---

[TL;DR][5]

I ran into an unusual problem when testing my latest app: "[What Is My
Speed?][1]". It is now available from the [iTunes App Store][2], but getting
there was a struggle.

Xcode is terrible at renaming projects, so it is a really good idea to have
worked out your app's name before starting. I would even recommend creating an
app ID in your Apple Developer account and registering the app name in iTunes
Connect. Only once you get to iTunes Connect will the name be checked for
uniqueness. Searching the App Stores is not enough as it does not cover
un-released apps or apps that are not available in your country.

So I set up my app. I was hoping for "What's My Speed?" but was happy with "What
Is My Speed?".

Next step was to create the project in Xcode which I did using the app name and
manually entering the bundle identifier that I had registered at Apple
Developer. Xcode accepted the name without any warnings and created the default
targets using that name.

In the default unit testing file, the module was defined like this:

{{< highlight swift >}} @testable import What*Is_My_Speed* {{< / highlight >}}

which made me think that Xcode was quite happy to have parsed the app name as
required to replace any unwanted characters to suit.

The app was built, passed all unit tests, profiled, analyzed, tested on real
devices as well as the simulators and uploaded to TestFlight.

**BARRRPPPP!**

![This app cannot be installed][3]

What?

_(I forgot to take a screenshot but found a similar one online. Thanks [Simple
Techs][6])_

I have had experience with TestFlight's oddities in the past, so I incremented
the build number and tried again, thinking that maybe there had been a
processing issue. Same result.

This started a very frustrating 24 hours as I ran through all the possibilities
I could think of or find suggested on the net. Due to disastrous Australian
internet speeds, especially uploads, each attempt took from 40 - 120 minutes.
About 5 minutes to implement the next idea, 25 minutes upload time, then the
rest waiting for Apple to process the app so I could try again.

Here is what I tried:

1. Uploaded a fresh build.
2. Removed Bitcode.
3. Fixed the code signing identity which was set to iOS Developer for some
   reason.
4. Manually specified the provisioning profiles for all three components (iPhone
   app, WatchKit app, WatchKit Extension).
5. Manually selected the code signing identity for the provisioning profiles.
6. Uploaded using Application Loader instead of Xcode.
7. Removed third-party framework.
8. Removed WatchKit app.
9. Revoked my distribution profile, re-created it and updated all provisioning
   profiles.
10. Created a completely blank project with same app name and bundle identifier.

As you can see from this list, I thought it was a code signing or profile error.
Using [Apple Configurator 2][4] (the modern version of iPhone Configuration
Utility), I was able to get the logs from my iPhone and entries like the
following seemed to confirm this:

> ````Error Domain=LaunchServicesError Code=0 "(null)" UserInfo={Error=ApplicationVerificationFailed, ErrorDetail=-402620393, ErrorDescription=Failed to verify code signature of /private/var/installd/Library/Caches/com.apple.mobile.
> installd.staging/temp.2LWJ2h/extracted/Payload/What Is My Speed?.app : 0xe8008017 (A signed resource has been added, modified, or deleted.)}```
> ````

But when I got to the stage of a completely blank app still failing, I suddenly
thought of the question mark. With the benefit of my preamble to this post, you
all probably got there long before I did, but I got there in the end.

The solution was to remove the question mark from the names of the targets in
Xcode. I had to fix up the module names in my unit testing files, but apart from
that, there were no changes. After this I was able to upload the complete app to
TestFlight and install it on my iPhone.

It is possible that it was the Product Names that were the issue, rather than
the target name as in Build Settings, Product Name is set to be `$(TARGET_NAME)`
by default but I didn't test that. Maybe next time...

<a name="tldr">TL;DR</a> Do not put any unusual characters in your target names.
Alphanumerics and spaces are OK, but I am not sure about anything else.

[1]: /what-is-my-speed/
[2]: https://itunes.apple.com/app/what-is-my-speed/id1091394524
[3]: /images/TestFlight_error.png
[4]: https://itunes.apple.com/app/apple-configurator-2/id1037126344
[5]: #tldr
[6]: https://www.simpletechs.net/apps/easy-fix-for-testflight-problem-after-restoring-from-backup/
