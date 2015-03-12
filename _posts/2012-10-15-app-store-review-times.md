---
id: 411
title: App Store Review Times
author: Sarah
layout: post
guid: /?p=411
permalink: /app-store-review-times/
dsq_thread_id:
  - 3567569230
tags:
  - App Store
  - Mac
  - iOS
---
There are been a lots of stories going around about lengthening Mac App Store review times. <a href="http://reviewtimes.shinydevelopment.com" target="_blank">Shiny Developments</a> crowd-sourced data certainly backs this up although they have  much more data for iOS apps than for Mac apps.

Some people, including <a href="http://www.macworld.com/article/2011430/developers-stymied-by-mac-app-store-approval-delays.html" target="_blank">Lex Friedman of MacWorld</a> and <a href="http://daringfireball.net/linked/2012/10/09/app-store-delays" target="_blank">John Gruber of Daring Fireball</a>, are suggesting that the delays are due to the rush of new apps to support the iPhone 5 and iOS 6. This implies that there is only one set of review staff and that a large proportion of them have been moved from Mac to iOS apps.

I think this is an incorrect analysis. The slowdown started before iOS 6 and before the iPhone 5. I think it started in June when Apple started to enforce Mac sandboxing.

As discussed in a [previous post][1], I have had a lot of trouble getting Man Reader to be sandbox-compatible leading to many rejections. One problem was that I had implemented sand-boxing before the deadline, but with some temporary entitlements to allow read-only access to required system files. This entitlement was approved initially, but after one rejection, an Apple reviewer told me that they had been approving all requested entitlements before the deadline, but now were actually reviewing them all.

To me, this seems like a rather silly thing to have done which has now returned to haunt them. Instead of allowing developers time to get used to the restrictions, Apple reviewers allowed developers to think that their apps were sandbox-complient already. Then Apple was faced with the enormous task of re-checking all the entitlements that they had previously allowed without checking. This was unfair to developers and has only created extra work for the reviewers.

Here is a table showing the recent review times for my Mac apps:

App|Process|Review days|Dates
:--|:------|:---------:|:----:
Time In Words|update|22|Sept 22 &#8211; Oct 14  
Icns Maker|new app|24|Aug 5 &#8211; Aug 29  
A Knight&#8217;s Move|update|26|Sept 6 &#8211; Oct 2  
Icon Builder|new app|33|Aug 22 &#8211; Sept 24  
   
<br>
I have not included Man Reader as it was rejected too many times to be a valid data point.

By comparison, when I submitted an update to A Knight&#8217;s Move for iOS in October, it was passed in only 8 days.

 [1]: /sandboxing-and-the-mac-app-store/