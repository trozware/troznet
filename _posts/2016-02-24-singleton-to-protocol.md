---
title: Singleton to Protocol
author: Sarah
layout: post
permalink: /2016/02/singleton-to-protocol/
tags:
  - swift
  - learning
---

I was driving through the town of [Singleton][1] the other day and of course, it got me thinking about using singletons in my apps. Singletons were a very common pattern in Objective-C programming and appear in many of Apple's own APIs, but seem to be coming increasingly frowned upon in the Swift world.

### So what is a singleton? 

A singleton is a class that only expects to have a single instance. Think of it as a global instance of a class. In some cases this makes perfect sense if there can only ever be one instance of a particular class or if there is a default variant that suits most cases e.g.

{% highlight swift %}
UIApplication.sharedApplication()
NSUserDefaults.standardUserDefaults()
NSNotificationCenter.defaultCenter()
NSFileManager.defaultManager()
NSURLSession.sharedSession()
{% endhighlight %}

If you use an object whose name starts with "shared", "standard" or "default" you can be pretty sure it is an singleton.

### And what's the problem with singletons?

There are probably many different opinions here but I have two thoughts about this:

1. They are effectively global variables and global variables can make your code messy.
2. If they can be accessed by multiple other objects, possibly at the same time, then you can get conflicts. These can be handled by clever use of background queues, but it isn't easy.

### What to use instead?

As I drove, I mused on a singleton that I had implemented recently. It was a Logging utility that allowed any object in my app (mostly view controllers) to save a new entry to a log file. The Logging class looked like this (stripped down for clarity):

{% highlight swift %}
class Logger {
    static let sharedLogger = Logger()

    func addToEventLog(event: String) {
      // use private functions to find log file URL
      // append event text with time stamp
    }
}
{% endhighlight %}

Any object in my app could use the Logger like this:

{% highlight swift %}
Logger.sharedLogger.addToEventLog(newLogEvent)
{% endhighlight %}

When I got to think about how I was using this, I realised that instead of a Logger *object* that everything could use, what I really needed was a Loggable *behaviour* that I could apply to some classes that would allow them to log events. For me, this was the break-through:

> **Create a behaviour, not an object.**

As soon as I started thinking about this as a behaviour, a protocol became the obvious solution, so this is what I created:

{% highlight swift %}
protocol Loggable {
  // not declaring functions here
  // as they should NOT be over-written
}

extension Loggable {

    func addToEventLog(event: String) {
      // use private functions to find log file URL
      // append event text with time stamp
    }
    
}
{% endhighlight %}


We run immediately into one of the peculiarities of Swift protocol extensions which has been very well explained by [Caesar Wirth][2]. If I had declared the `addToEventLog()` function in the protocol, then any class or struct conforming to this protocol would have been free to over-write this function and provide its own version. This is not what I wanted here - I wanted every object to use the same version. So I left the function declaration out of the protocol definition and only included it in the protocol extension.

To use this behaviour, a class or struct just has to be declared as conforming to the Loggable protocol:

{% highlight swift %}
class MyClass: Loggable {
    func doSomething() {
        addToEventLog("I did something!")
    }
}
{% endhighlight %}

In my case, I knew that I would want all my NSViewControllers to be able to add log events, so instead of setting them all individually as conforming to the protocol, I used this shortcut which extends all NSViewControllers to conform to the protocol.
{% highlight swift %}
extension NSViewController: Loggable {}
{% endhighlight %}

I added this line to the Loggable.swift file where I declared the protocol and its extension, but outside both of them.

[1]: https://en.wikipedia.org/wiki/Singleton,_New_South_Wales
[2]: http://cjwirth.com/2016/01/20/swift-protocol-extension-weirdness/