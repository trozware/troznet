---
id: 314
title: Sandboxing and the Mac App Store
author: Sarah
layout: post
guid: /?p=314
permalink: /sandboxing-and-the-mac-app-store/
tags:
  - Trouble-shooting
  - Sand-box
  - Man Reader
---
As of June 2012, all apps submitted to the Mac App Store have to be sandboxed i.e. they have to be able to run in a limited environment where they cannot interfere with other apps or other parts of the system. While this is generally a good thing, there are problems when apps have legitimate reasons for requiring access to other resources.

One annoyance for developers is that Apple&#8217;s apps are mostly not sandboxed. To check what apps you have installed that are sandboxed, open up Activity Monitor (in Applications/Utilities). In the View menu, check that Sandbox is checked in the Columns submenu. Then you can sort by clicking on the Sandbox title and work out which apps are already sandboxed. Mail, Preview and Text Edit are now sandboxed and so is the new Reminders app, but as far as I can tell, no other Apple apps are. This causes two problems: firstly it is not fair to other developers if Apple is enforcing a standard which only they are allowed to break. Secondly, if Apple developers had to follow the same rules as everyone else, then maybe the system would evolve to become more usable for everyone.

In the Apple developer documentation about sandboxing, there is a section headed &#8220;Determine Whether Your App Is Suitable for Sandboxing&#8221;. Here they list numerous reasons why any app might not work in the sandbox. But the Mac App Store now makes sandboxing compulsory, so what to do with apps that are not suitable?

Some resources can be requested when building the app: access to various folders (Pictures, Music, Downloads etc), access to Address Book and Calendar data, printing facilities, networking etc. Beyond the specified list of entitlements that can be requested, developers can also apply for &#8220;temporary entitlements&#8221; which, if granted, will unlock access to other parts of the operating system. However these are subject to the whims of app reviewers and will be re-assessed with every update. Apple has also made it clear that they are intended as a transition feature and will not be available for ever.

This has lead to a recent spate of popular apps leaving the App Store. <a href="http://www.marco.org/2012/07/26/mac-app-store-future" target="_blank">Marco Arment</a> has discussed this problem with an emphasis on the issue of lack of confidence in buying from the App Store. If you cannot be sure that an app you buy will remain in the App Store, then you are less likely to buy it there.

I have run into direct issues with sandboxing already. With <a href="http://www.picapod.com/" target="_blank">Pic-a-POD</a>, I used to have links to the Desktop and Screen Saver panes in System Preferences. These used AppleScripts which required a temporary entitlement to send an AppleEvent. The app was rejected because of this, so I had to modify this feature &#8211; it now just takes you to the relevant section of System Prefs, but not directly to either Desktop or Screen Saver. However Pic-a-POD&#8217;s help, which runs in Apple&#8217;s Help Viewer app, contains exactly the same AppleScripts and so is allowed to access these preference panes directly. Try working out the logic of that one!

I have more serious problems with <a title="Man Reader" href="/manreader/" target="_blank">Man Reader</a>. Man Reader displays a list of the man pages on your system. Depending on the tools you have installed, these pages may be in a variety of locations. The shell command that detects them first reads a config file and then checks the folders listed in that config file. All it needs is read-only access. With the first sandboxed version, I asked for a temporary entitlement to give me read-only access to the startup disk. This was granted, but I have since been informed that all requested entitlements were granted before the App Store cut-off date. This may have been meant to be helpful, but it was not useful to allow access that would later be removed without any warning.

The current version of Man Reader waiting for approval asks for read-only access to the config file directly and then to every folder listed in that config file. If approved, this should be able to access all the man pages on a system. I have no idea whether these entitlements will be granted, but if not, then I will have to remove Man Reader from the App Store. It would be wrong to continue to sell an app that only functioned in a limited manner, even though the App Store is far and away my best form of marketing.

So what do I suggest Apple does? I think they need to allow apps that are not sand-boxed. However these apps could come with a warning before installation. In Mountain Lion, the new security feature called Gatekeeper allows you to specify the level of security you want when installing apps. Currently the options are to allow apps downloaded from:

  * Mac App Store
  * Mac App Store and identified developers
  * Anywhere

They could split the first option in two and allow

  * Mac App Store sandboxed
  * Mac App Store any

One further wrinkle is iCloud. Apple is encouraging users and developers towards iCloud data storage and sharing. But only apps in the App Store are allowed to use iCloud.

So it will be interesting to see how this plays out. Obviously Apple is not going to care if a tiny developer like me leaves the App Store, but if enough high-profile developers leave, then there will surely be some consideration given to the problem.