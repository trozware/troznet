---
author: Sarah
date: 2016-02-26T00:00:00Z
tags:
- swift
- learning swift
title: Singleton to Protocol
url: /2016/02/singleton-to-protocol/
---

I was driving through the town of [Singleton][1] the other day and of course, it
got me thinking about using singletons in my apps. Singletons were a commonly
used pattern in Objective-C programming and appear in many of Apple's own APIs,
but seem to be increasingly frowned upon in the Swift world.

## So what is a singleton?

A singleton is a class that only expects to have a single instance. Think of it
as a global instance of a class. In some cases this makes perfect sense if there
can only ever be one instance of a particular class or if there is a default
variant that suits most cases e.g.

```swift
UIApplication.shared
UserDefaults.standard
NotificationCenter.default
FileManager.default
URLSession.shared
```

If you are using an object with a property name of "shared", "standard" or
"default" you can be pretty sure it is an singleton.

## And what's the problem with singletons?

There are probably many different opinions here but I have two thoughts about
this:

1. They are effectively global variables and global variables can make your code
   messy and un-predictable.
2. If they can be accessed by multiple other objects, possibly at the same time,
   then you can get conflicts. These can be handled by clever use of background
   queues, but it isn't easy.

## What to use instead?

As I drove, I mused on a singleton that I had implemented recently. It was a
logging utility that allowed any object in my app (mostly view controllers) to
save a new entry to a log file. The basic structure of the Logger class was
this:

```swift
class Logger {
    static let sharedLogger = Logger()

    func addToLog(event: String) {
      // use private functions to find log file URL
      // append event text with time stamp
    }

}
```

Any object in my app could use the Logger like this:

```swift
Logger.sharedLogger.addToLog(event: newLogEvent)
```

When I got to think about how I was using this, I realised that instead of a
Logger _object_ that everything could use, what I really needed was a Loggable
_behaviour_ that I could apply & restrict to the few classes that actually
needed to log events. For me, this was the break-through:

> **Create a behaviour, not an object.**

As soon as I started thinking about this as a behaviour, a protocol became the
obvious solution, so this is what I created:

```swift
protocol Loggable {
  // not declaring functions here
  // as they should NOT be over-written
}

extension Loggable {

    func addToLog(event: String) {
      // use private functions to find log file URL
      // append event text with time stamp
    }

}
```

We run immediately into one of the peculiarities of Swift protocol extensions
which has been very well explained by [Caesar Wirth][2]. If I had declared
`addToLog(_:)` in the protocol, then any class or struct conforming to this
protocol would have been free to over-write this function and provide its own
version. This is not what I wanted here - I wanted every object to use the same
version. So I left the function declaration out of the protocol definition and
only included it in the protocol extension.

To use this behaviour, a class or struct just has to be declared as conforming
to the Loggable protocol:

```swift
class MyClass: Loggable {
  func doSomething() {
    addToLog(event: "I did something!")
  }
}
```

For my app, I knew that I would want all my NSViewControllers to be able to add
log events, so instead of setting them all individually as conforming to the
protocol, I used this shortcut which extends all NSViewControllers to conform to
the protocol.

```swift
extension NSViewController: Loggable {}
```

I added this line to the Loggable.swift file where I declared the protocol and
its extension, but outside both of them.

---

Protocol-oriented programming is a new technique to me, so it really helps when
I can find a practical example of where it solves a problem.

If you are new to POP, I highly recommend the [Crusty talk][3] from WWDC 2015.
And this article by [Matthijs Hollemans][4] was invaluable to me in
demonstrating the problems with object inheritance that are solved by protocols.

[1]: https://en.wikipedia.org/wiki/Singleton,_New_South_Wales
[2]: http://cjwirth.com/2016/01/20/swift-protocol-extension-weirdness/
[3]: https://developer.apple.com/videos/play/wwdc2015/408/
[4]: http://matthijshollemans.com/2015/07/22/mixins-and-traits-in-swift-2/
