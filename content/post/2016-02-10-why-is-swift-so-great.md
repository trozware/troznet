---
author: Sarah
date: 2016-02-10T00:00:00Z
summary: Read Apple's technical answer and then my opinion as a developer.
tags:
- swift
- learning swift
title: Why is Swift so great?
url: /2016/02/why-is-swift-so-great/
---

Firstly, I can give you the technical answer, as published by Apple:

> Swift is a new programming language for iOS, OS X, watchOS, and tvOS apps that
> builds on the best of C and Objective-C, without the constraints of C
> compatibility. Swift adopts safe programming patterns and adds modern features
> to make programming easier, more flexible, and more fun. Swift’s clean slate,
> backed by the mature and much-loved Cocoa and Cocoa Touch frameworks, is an
> opportunity to reimagine how software development works.<br><br> Swift has
> been years in the making. Apple laid the foundation for Swift by advancing our
> existing compiler, debugger, and framework infrastructure. We simplified
> memory management with Automatic Reference Counting (ARC). Our framework
> stack, built on the solid base of Foundation and Cocoa, has been modernized
> and standardized throughout. Objective-C itself has evolved to support blocks,
> collection literals, and modules, enabling framework adoption of modern
> language technologies without disruption. Thanks to this groundwork, we can
> now introduce a new language for the future of Apple software development.”

Excerpt From: Apple Inc. “[The Swift Programming Language (Swift 2.1)][1].”

---

## Now I can give you my opinion:

* Swift makes for code that is easier & faster to write.
* Swift makes for code that is easier & cleaner to read (much more important
  than ease of writing).
* Swift code is safer code.
* Swift breaks free from the out-dated conventions of C-based languages.

---

When Apple announced Swift at WWDC 2105, I was astounded. That such a major
event could have been kept completely secret was amazing. Then I watched every
video from WWDC 2015 that discussed Swift. Some were beyond me and others I
absorbed. Looking back, I can see that the development of Objective-C over the
past few years was all aimed at getting to this point, especially with the
introduction of ARC and blocks.

At that time, I was deeply involved in an existing Objective-C project and not
able to do much in Swift. But I went through the introduction at the start of
the [Swift Programming Language][1] book in iBooks and was able to get some
ideas about how the language worked.

Some months later, I was able to spend time on Swift. As a learning exercise, I
converted an existing Objective-C iOS app to Swift. As might be expected, I
really just wrote Objective-C code using Swift syntax. It took a lot more
learning before I was able to write Swift-y code instead of just translated
Objective-C. In future posts of this series, I hope to enable others to cross
that divide faster than I did.

Now when I go back to an Objective-C app, I feel like I am walking a tight-rope.
When I use an NSArray, NSSet or NSDictionary, I think "How can I tell what sort
of objects are in that array?". When I use an object, I think "What if that
object is nil?". All of a sudden, code that appeared stable now feels random.

---

One of the big things that people have latched onto with Swift is that it allows
functional programming. I plan several detailed posts on functional programming
in this series. But for now I would just recommend that you not worry about the
distinction between procedural & functional programming. Both have their
advocates and their detractors. Both have their advantages and disadvantages.
Just do what ever works for you and we can worry about this later.

[1]: https://itunes.apple.com/book/swift-programming-language/id881256329
