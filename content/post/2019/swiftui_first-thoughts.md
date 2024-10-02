---
title: 'SwiftUI First Thoughts'
date: 2019-08-18T15:00:05+10:00
lastmod: 2019-08-18T15:00:05+10:00
draft: false
description: 'Should you be using SwiftUI?'
tags: ['swift', 'swiftui']
toc: true
---

{{< img_center >}}

At WWDC 2019, Apple surprised us all by announcing a completely new declarative UI framework called [SwiftUI][1]. Quoting snippets from the Apple announcements, "SwiftUI is an innovative, exceptionally simple way to build user interfaces across all Apple platforms with the power of Swift" and "SwiftUI uses a declarative syntax so you can simply state what your user interface should do." But what does this mean and should we all adopt it now?

<!--more-->

![Swift][i2]

## Swift

Before discussing whether to adopt SwiftUI, we need to consider Swift itself, since you cannot use SwiftUI without Swift.

The announcement of Swift at WWDC 2014 was a complete bombshell. Here in Australia, I watch the keynote every year while half asleep since it starts at 3 am. That announcement had me wide awake and bouncing out of my seat with excitement. I was an early adopter and have never regretted that decision.

Many well-respected developers have decided to ignore Swift and they have their various reasons, so let's go through the ones I have heard:

#### 1. I'm very comfortable and productive in Objective-C

This is not a bad reason and for many people, their employer may insist on the language anyway, but this argument doesn't work for me. Firstly, I think that there is never going to be the One Perfect Language (with apologies to [Chris Lattner][2]) so I am always open to new ideas. And personally, I love learning new languages even if I am never going to use them in production. I feel that this makes me a better programmer overall. And there are vast benefits to Swift - it is a much safer language to write it, it is easier to read and more concise to write, it is just a much more modern language.

#### 2. Swift is too new and changes too much between versions

Swift was new. It is now 5 years old and we are into version 5.2. Undeniably, there have been a lot of changes since 1.0 and many of them have been breaking changes. Swift 3 was especially bad in this respect. But this came with advantages too. As early adopters, we were able to influence the direction of the language. And Xcode was always pretty good about providing a converter to the next version. But either way, since Swift 4, there are supposed to be no more breaking changes, so this is an argument whose time has passed.

#### 3. No ABI stability

ABI stability was a crutch that many people clung to as an excuse to avoid Swift. But unless you were building frameworks for distribution, I don't see that it was ever a complete deal-breaker. The [Swift ABI Stability Manifesto][3] has a good review of what ABI stability is and what it will allow. As app developers, the main advantage is that the Swift libraries will no longer need to be bundled with each app. This will decrease app sizes dramatically. But either way, we now have ABI stability, so again, this argument is finished.

#### 4. Apple may not be serious about Swift and it may not last

I think there was a certain amount of wishful thinking here. The main data behind this theory seemed to be that very few of the Apple apps included any Swift. And in the beginning this was true. I expect Apple's apps have a rather longer development time-frame than apps produced by independents. However over the last few years, more and more of Apple's own apps have started to use Swift, either completely or partially. And any doubt about Apple's commitment to Swift should have been permanently laid to rest by the announcement of SwiftUI.

#### 5. It's too complicated

OK, this one has some validity, but then again, if Swift is to rule the world, it needs to be able to do a lot of things. I love Swift, I love writing in it and I am very productive when using it. But then I see a chunk of code sprinkled with generics and unsafe pointers and I can't make head nor tail of it. However, I think that if you are writing any standard, non-arcade-game app, you can write very good Swift using just the basics.

## Why did Apple make SwiftUI?

Having demolished the arguments against using Swift, it's time to move on to SwiftUI. Let's start with the reasons why something like this had to happen.

Apple now has 5 or possibly 6 user platforms: macOS, iOS, iPadOS, tvOS, watchOS and maybe CarPlay. (I've never considered any CarPlay development so I have no idea how it works.) The screen sizes range from 38mm for the smallest watch to over 75" to large screen TVs (apologies for mixing my units there, but it seems that TVs have not gone metric yet). As far as user interface frameworks go, we have had AppKit, UIKit and WatchKit. AppKit is the venerable old member of this team, descended from NextStep (which is why every element name has the NS prefix) and is used to make macOS apps. UIKit was built from scratch for the iPhone and so is a lot newer and neater than AppKit, but at the same time it is more limited. It has never had to deal with the vast variability and complexity of a Mac app's interface. WatchKit is an even more slimmed down framework with a relatively small number of interface elements.

Now imagine that you are trying to write a multi-platform app. You have to learn at least 3 different ways of doing everything. And there are differences that always catch me out. For example, in AppKit, to set the text in a text field, you set the field's `stringValue` but in iOS, you can set the field's `text` property. And in WatchKit, you call the `setText()` method.

Want to change the background color of a view? UIView - no problem, set `backgroundColor`. NSView - nope - do something weird with layers. I forget what, I have to look it up every time.

These inconsistencies are annoying, time-consuming and a huge barrier to cross-platform development. It really annoys me when I read articles or tweets that assume Swift programming = iOS programming when it is so much more. But before SwiftUI, it was not easy to jump between the platforms.

[Catalyst][4], previously code-named Marzipan, was supposed to be the answer. And it is a partial answer. It allows iPad apps to be ported to the Mac and that's great for iPad developers who want to expand their reach. But it isn't the answer for everybody.

### Interface Builder

Before I go further into what I think is so great about SwiftUI, I would like to take a moment to discuss Interface Builder. Xcode is a brilliant tool that gets better with every release, but its weak point has always been Interface Builder. I am old enough to remember when Interface Builder was a separate app (not that we called them "apps" in those days) and although it has been folded into Xcode for many years now, the connection between interface and code has always been clunky and un-intuitive. Control-dragging from interface to code and then remembering to switch between Action and Outlet so that you don't end up naming your button "doneButtonWasTapped". And if you get the modifier key wrong, who knows what weird stuff will happen.

And then came Auto Layout... It was vastly more flexible than the old school springs & struts and with the ever increasing number of iPhone & iPad models something had to be done, but if you have never ended up swearing at Auto Layout and reverting to a previous commit or mashing Undo repeatedly, then you can't have used Auto Layout very much!

WatchKit had an entirely different approach to layout and it was easy, intuitive and very refreshing. You drag in objects, they go one under another. You can group them horizontally or vertically, you can make them into table cells. WatchKit has a much more limited set of interface elements and a much more limited set of device sizes to deal with, but I think we can clearly see the origins of SwiftUI in the way it worked. Even if you still had to use Interface Builder to do it.

Interface Builder's quirks lead to a category of programmers who felt the need to write all their interface in code. To my way of thinking, this is a huge waste of time and you still had to wrestle with Auto Layout, but without the visual clues! But if it makes them happy...

[![SwiftUI][i1]][1]

## What Is SwiftUI?

A "declarative UI framework" - what does that mean? Basically, declarative programming is a way of specifying what a program should do, rather than specifying how to do it. A common example is making a sandwich. If you want a sandwich, you say to the sandwich maker, "Please can I have a ham, cheese and tomato sandwich". You don't say "Get two pieces of bread, butter both of them, cut 3 slices of ham and 2 slices of cheese...". They know how to make a sandwich so you only have to ask for what you want.

Back in the Apple UI world, what if you want a button? Is it for an iPhone app? Then you need an UIButton with a certain type. Set its title, size, location, layout constraints. What are the default sizes for an iPhone button? What is the default font? What color should the text be? Now make a button for a tvOS app? That has to be huge! And what other settings does it have? But the thing is, iOS, macOS, tvOS etc. already **KNOW** what their buttons should look like. So why not just tell the system "I want a button"? Let the system work out the details and you can get on with the cool app ideas.

I'm not going to turn this post into a SwiftUI tutorial, but I would like to thank and recommend the people that have really helped me get to grips with it, especially [Paul Hudson of Hacking with Swift with his Learn SwiftUI tutorials][5], [Mohammad Azam's great YouTube series][6], and [Meng To's SwiftUI course at Design+Code][7].

The other great benefit of SwiftUI is that when used with the Combine framework, it gives you a reactive interface. There have been various third-party libraries for doing this: RxSwift, ReactiveSwift, ReactiveCocoa, Bond etc, but with Combine, Apple is baking this into the ecosystem, which makes it a lot easier to set up and means that it will stay up-to-date with the operating systems. A reactive interface is one where you can bind a UI element to a piece of data and then when the data changes, the user interface updates automatically. You can even bind both ways so that the user interface updates the data without you having to do a thing. Imagine how much boiler-plate code that can eliminate?

## The Good, The Bad and The Ugly

### 1. The Good

You get a lot of interface for very little code. Making tables is a joy without the masses of boilerplate code needed to set up data sources and delegates. The instant preview in the canvas makes iteration much easier. Being able to create something like a Picker and having SwiftUI render it in one of multiple different styles depending on the platform is magical.

### 2. The Bad

It's early days yet and SwiftUI has some quirks and bugs. Sometimes the canvas just stops responding, switching into live mode in the canvas can take a while and of course it is still in beta, so there will be breaking changes to come.

### 3. The Ugly

It is very easy to build up the Pyramid of Doom where you have multiple levels of nesting leading to the end of your code being a seemingly endless stream of closing curly braces. In SwiftUI, one tends to build from the inside out: make a Text view, embed it in a VStack so you can add another one, embed that stack in an HStack so you can add an Image and so on... But there is an answer: Command-click on one of your outer layers and select "Extract Subview".

## Coding the Layout

Earlier in the article, I spoke about programmers ignoring Interface Builder and laying out the interface in code. I don't think this is a good approach, so how is SwiftUI different? Firstly, you get immediate feedback of the UI you are coding, so you are not losing that visual benefit of using Interface Builder. Secondly, SwiftUI does much of the layout for you, so you are not hand-coding auto layouts or every last detail of every UI element. So as far as SwiftUI is concerned, I am a convert to programmatic layouts. But if not using SwiftUI, I would still stick to Interface Builder.

Another point to consider here is that developers have long argued that if Apple wants the iPad to be seen as a "Pro" device, there should be a version of Xcode for iPad. One of the problems with this was Interface Builder - it is difficult to see how it could be made to work with a touch interface. But with SwiftUI and iPadOS, is it possible that Apple can make an iPad version of Xcode?

## Should you use SwiftUI?

I hope that from my previous paragraphs, you have come away with a good feeling for why Apple made SwiftUI and why it is good for us as developers. Personally, I find it a joy to use even in these early beta stages, but some of the arguments against using Swift, can now be applied again to SwiftUI.

That SwiftUI is very new cannot be debated. It is extremely new and even in the handful of betas released since WWDC, we have seen some breaking changes. It feels quite buggy still but as I am running it in a beta operating system with a beta version of Xcode, it would be unfair to blame all the instability on SwiftUI.

SwiftUI is not yet a complete replacement for UIKit/AppKit/WatchKit etc. There are SwiftUI equivalents for many of the interface elements and I recommend the [Gosh Darn SwiftUI site][8] which maintains a list of UIKit equivalents as well as really useful snippets of SwiftUI code. But even when SwiftUI does not have the UI element you want, there are two easy options: use UIKit/AppKit or build your own. Apple has made sure that there is no problem about mixing and matching UIKIt/AppKit code with SwiftUI. And maybe the SwiftUI tools would allow you to build your own version of the missing element. I needed a progress bar and I built one myself with not much code and ended up with what I think is a better look than the standard one.

[![Progress Bar][i3]][9]

_Click the image for a link to the GitHub repository._

For years, Apple has been telling us to use standard interface elements in our apps and if we did this, when system updates changed the look and feel, we mostly got that change for free. Now they are giving us even more for free by saying effectively, tell us what UI element you want and we will do all the work of configuring it for the platform and for the user's settings.

But with this, Apple has given us a lot of modifiers we can apply to elements as well as a great animation suite, so I expect to see a lot of more interesting design choices being made in apps, while they are still adhering to all the standard human interface guidelines for the various platforms.

Apple does not promote SwiftUI as "write once, run everywhere" but as "learn once, apply everywhere" and that is an important distinction. It seems at first glance that we can write once but only on a basic level. You are still going to need to design the appropriate UI for a platform, but it will be able to re-use components from the other versions of the same app.

Do I intend to use SwiftUI in my next app - YES. If I was writing code for NASA, I wouldn't, but my apps are rarely mission-critical, so I can indulge myself and learn as I go. It will be frustrating when there are breaking changes, but at the same time, my bug reports are going to make it better.

One caveat is that SwiftUI apps will require the latest operating systems, iOS 13 and macOS 10.15 so if your app has to support older versions of the systems, you will have to wait until next year. But there is nothing to stop you building some test components and starting the learning process.

[1]: https://developer.apple.com/xcode/swiftui/
[2]: https://oleb.net/blog/2017/06/chris-lattner-wwdc-swift-panel/#in-which-fields-would-you-like-to-see-swift-in-the-future
[3]: https://github.com/apple/swift/blob/master/docs/ABIStabilityManifesto.md#what-does-abi-stability-enable
[4]: https://developer.apple.com/ipad-apps-for-mac/
[5]: https://www.hackingwithswift.com/articles/196/learn-swiftui-with-free-tutorials
[6]: https://www.youtube.com/user/azamsharp/videos
[7]: https://designcode.io/swiftui-course
[8]: https://goshdarnswiftui.com
[9]: https://github.com/trozware/swiftui_progressbar
[i1]: https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96_2x.png
[i2]: https://developer.apple.com/assets/elements/icons/swift/swift-96x96_2x.png
[i3]: /images/2019/SwiftUi_progressbar.png
