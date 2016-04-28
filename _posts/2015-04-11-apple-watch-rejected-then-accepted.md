---
title: Apple Watch App - Rejected, then Accepted
author: Sarah
layout: post
permalink: /2015/04/apple-watch-rejected-then-accepted/
tags:
  - apple watch
  - watch
  - golf
---

As described in a [previous post][1], about 9 days ago I submitted my first Apple Watch app for review.
The app was an extension of my golf scoring app: [The 19th Hole][2].

I expected that App Store review times would go up dramatically once Apple had allowed developers to submit watch apps, but this proved to be incorrect. Three days after submission, the app was marked as "In Review". This seemed to happen last thing on a Saturday, so there was no further action for two days, at which point the app was rejected, with the following details (sic):

> We noticed an issue in your app that contributes to a lower quality user experience than Apple users expect. Specifically, 

> - while using the Apple Watch app with the phone app is in the background mode (display off), the new data entry on the Watch App does not refresh accordingly until the phone app is turn back on. 

So it appeared that the communication between the watch and the phone, which worked perfectly on the simulators, did not work at all on the actual devices. This is the problem with developing for a device that you do not have.

---

After some research, it appears that the problem is with the phone not operating correctly in background mode. Apple provides for communications from the watch to the phone. The phone can respond, but only the watch can initiate a connection. I guess this makes sense since every watch will be paired with a phone but the reverse will not always be true.

To talk to the phone, the watch uses this function:

{% highlight swift %}
    func openParentApplication(_ userInfo: [NSObject : AnyObject],
         reply reply: (([NSObject : AnyObject]!,
         NSError!) -> Void)?) -> Bool
{% endhighlight %}
                                          
The phone listens for messages in this event handler:

{% highlight swift %}
    func application(_ application: UIApplication,
         handleWatchKitExtensionRequest userInfo: [NSObject : AnyObject]?,
         reply reply: (([NSObject : AnyObject]!) -> Void)!)
{% endhighlight %}

The name of the WatchKit function is slightly misleading as it does open the parent application, but only in the background.
Then the parent app is supposed to do whatever tasks are called for in the handleWatchKitExtensionRequest function, and return any required data using the supplied reply() function.

So far, so good, and it all worked perfectly in the simulator. But it appears that although this call wakes the iPhone app, it does not stay awake long enough to do anything. Many thanks to Brian at [Five Minute WatchKit][3] who pointed out the way to make this work. Firstly, you create a dummy background task guaranteed to keep the iPhone app awake for 2 seconds. Then you perform your own work, using another background task. When that is finished, the phone can send the response and end the real background task. The dummy task will time out by itself after 2 seconds.

For my needs, I could probably reduce the 2 seconds considerably, but since this is a problem I am unable to test, I decided just to go with Brian's suggestion as it is.

I re-submitted the app the same day it was rejected, and two days later it was back in review. The review process took longer than usual, but about 30 hours later, the app was marked "Pending an Apple Release". I assumed this meant that Apple would release all WatchKit apps on 24th April when the watches shipped, but the following day the app was reported as "Pending Developer Release" (I had set it to release manually). Now I have told iTunesConnect to release the app and it is "Processing for App Store".

---

On a related note, the start of pre-ordering for the Apple Watch was scheduled for a very civilised 5:01 pm here in eastern Australia. I had three watches all lined up in my Favorites in the Apple Store app, ready for ordering. When the store became live (at about 5:03 pm), I could not work out how to order all three in a single operation, so had to place these orders one at a time. I got the first two ordered for the soonest possible delivery, but by the time I got to the third (about 3 minutes later), I had missed out and it will ship in 4 to 6 weeks!



[1]: /2015/04/my-first-apple-watch-app/
[2]: /19th-hole/
[3]: http://www.fiveminutewatchkit.com/blog/2015/3/11/one-weird-trick-to-fix-openparentapplicationreply