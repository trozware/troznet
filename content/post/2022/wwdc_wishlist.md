---
title: 'WWDC 2022 Wishlist'
date: 2022-04-25T19:00:36+10:00
draft: false
description: 'What would I like to see at WWDC 2022'
tags: ['apple', 'wwdc']
---

Apple has announced that their 2022 World Wide Developers Conference will again be an online event from June 7 to 11. The poster shows a very dark Swift logo in a coloured circle. While I have long since given up trying the read the tea leaves of Apple's graphics to work out what they will announce, I always enjoy speculating. But this year, I thought that instead of trying to guess what Apple will have for us, I'd think about what I would **like** them to announce, with my main focus being the Mac.

<!--more-->

### Hardware

The Apple hardware teams have been doing amazingly well over the last couple of years. The transition of the Mac lineup to Apple Silicon is almost complete and I would guess that they will complete it at WWDC with a new Mac Pro, but that is outside my budget and requirements.

While I was glad to see them offer a more reasonably priced monitor with the Studio Display, it's still a bit pricey for me. The desk lamp iMac was one of my all time favourite Mac designs so it was great to see the option for the tilt & height adjustable stand, although the extra price for that option was rather eye-popping.

I have long thought that the desktop iMac was terrific value because it attaches a stunningly good monitor to a reasonable computer. I wish Apple would supply an iMac monitor using the exact same design, but without the computer. Imagine how great that would look as a second monitor - two coloured machines side by side.

But really, I'm not looking for any new hardware right now.

### Services

iCloud needs a lot of love, especially on the Mac side. I was trying to collaborate with a colleague so they shared a folder on iCloud. I was able to access their small set of files (24K total) after about 30 minutes, but my edits never uploaded. In the Finder sidebar, I have a perpetual progress indicator beside my iCloud folder and uploads never complete. The only solution is to reboot my computer, which does a complete sync once. We switched to sharing on our iPads and it all worked immediately, so the problem is not iCloud itself, but the macOS integration.

CloudKit has always looked like a great solution for use in apps. It allows public and private data, it syncs between devices, and it doesn't have the potential for unexpected and huge data fees like some other options. But like many developers, I've tried and failed to get it to work reliably. It appears that the simpler mechanisms work well, but not the more complex options.

And while I'm talking about iCloud sync issues, some apps (Notes, Reminders etc) sync - albeit very slowly, but Messages operates as if it is only partially connected. If I delete a conversation on my iPhone or iPad, I get a warning telling me that this will remove the conversation from my other devices, which is what I would expect. This deletion flows through to my Mac and the conversation is gone everywhere. On my Mac, deleting a conversation only deletes it locally and I have to delete it again on my iPhone or iPad to get it to disappear completely. What is the logic of that?

### Software

There are two parts to Apple's software: the operating systems and their own apps. iOS, iPadOS and watchOS seem quite solid in their latest versions. I don't have any particular requests or complaints. 

With macOS, apart from the iCloud problems that I mentioned above, my main complaint is with notifications. The user experience is terrible. Notifications popup at the top corner, and then disappear quickly. If they have action buttons, you have to mouse over the notification to see them, and this obscures the text. I have tried using System Preferences to change the way notifications are displayed, but this seems to have no effect. And trying to explain this system to a newcomer is impossible.

Apart from that, I like macOS 12 (Monterey). I would prefer Apple to go back to using numbers instead of names. Trying to work out what system people are using by the name is very confusing.

The other aspect of software is Apple's in-house apps. Sadly, Apple has decided to use Catalyst to port a lot of apps from the iPad to macOS. For a small software house with very limited resources, I can see the attraction of Catalyst although, in my opinion, it results in a greatly inferior product that gives Mac users an inferior experience. However this is hardly a valid excuse for a company the size of Apple.

As a developer, one of my main tools is Xcode. This is an amazing app and over the past few years it has got a lot of new features that allow it to integrate better with source control and with the app distribution system. But I would love to see Apple open up the extension ecosystem again. For web development, I use Microsoft's Visual Studio Code. Even though this is a cross-platform Electron-based web app, it is a great tool. It doesn't look like a native Mac app but it performs well. But it's major advantage is the huge number and variety of extensions so you can make VSC look and work the way you want. Apple has deliberately closed Xcode off from this sort of community involvement which is great shame.

Apple will tell you that they do allow Xcode extensions. But these are limited in scope, difficult to install and opaque to use. Xcode extensions used to be great - please bring them back again.

### Developer Relations

This is where things get nasty. We all know that Tim Cook will bounce on to the WWDC stage saying how much they love their developers and how many billions they've paid out, but this is really just a smoke screen. Most of the money goes to a few large software houses who basically blackmail users into paying over and over again to make their apps (mostly games) usable. The race to the bottom has resulted in app stores where charging up front for an app is virtually impossible, although the Mac App Store is slightly better in this regard.

The big issue is Apple's extremely erratic policing of the app stores. They allow behaviour in some apps and ban it is others. Big players get different treatment to small. Despite claiming that the app stores are the safe place to buy apps, Apple makes almost no effort to weed out scam apps, copyright infringements or fake reviews even when they are completely obvious to the most casual search.

I don't mind paying Apple a cut of my app revenue. They do a lot of work that I would find tedious or difficult to set up for myself. I don't even mind their restrictions. What I mind very deeply is the inconsistent way this is handled. I would love it if the App Stores lived up to Apple's claim as being the safe place to buy apps, but in reality, app buyers are being fooled by purchased reviews, tricked into in-app purchases, and cannot assume that the rules designed to keep them safe have been applied to all apps.

### Summary

So what would I really like to see at WWDC 2022?

- iCloud syncing that works on all Apple platforms.
- Real Xcode extensions.
- New App Store rules to weed out copycat apps and fake reviews and that were applied equally to all developers.
- Better notifications for macOS - preferably the type we used to have.
