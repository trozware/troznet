---
id: 81
title: Interface options for selecting time zones
author: Sarah
layout: post
guid: /?p=81
permalink: /interface-options-for-selecting-time-zones/
dsq_thread_id:
  - 3569601004
tags:
  - time in words
  - mac
  - ui
---
As part of the design for [Time In Words for Mac][1], I had to work out the interface for selecting time zones. With [Time In Word for iOS][2], I used picker wheels which are excellent for selecting hierarchical data. On the Mac, there is no such thing as the iOS picker wheel and so I had to consider what to use instead.

When you ask the system (Mac or iOS) for the available time zones, you get a list of names like this:
> Africa/Abidjan  
> Africa/Accra  
> &#8230;  
> America/Cayman  
> America/Chicago  
> &#8230;  
> Europe/Riga  
> Europe/Rome  
> etc.

This seems obviously designed for a hierarchical display with the major regions as a first selection, filtering down to the cities in that region, making selection a two-step process. With the picker wheel in iOS, that is what I did. The first wheel selects the region which then populates the second wheel with the relevant city names. It makes it quick and easy to select a zone.

I always prefer to use standard user interface objects because people are familiar with them, they automatically update with the system, and there is much less chance of the App Store rejecting the app. So I scrolled through the available Mac options and came to NSBrowser. This is basically what Finder uses when in column mode.

I created an NSBrowser object, worked out a way to populate it and tested. It was incredibly slow! The list of regions appeared when the window opened, and that was no problem. Then I clicked a region and the first set of city names appeared instantly. But subsequent selections took about 3 seconds to appear.

I added some timing tests and my data gathering was taking about 20 milliseconds. The log thought the browser had updated within about 100 milliseconds, so I guess the rest of the time was some redraw issue.

Apple provides a large number of sample projects so I downloaded one that used NSBrowser. It seemed fast and responsive, so I duplicated it&#8217;s different method of assembling the data and tried again. No luck &#8211; it was as slow as before.

I am sure that if I kept at it, I would eventually work out what was causing the bottleneck and make NSBrowser work &#8211; after all, Finder is responsive enough, even if not great. But in the end, I decided that the advantages to using this form of interface didn&#8217;t justify the time spent, so I went with a simple table and a search field.

It is fast to populate, responsive to searches and didn&#8217;t take long to set up. So I am happy, although still perplexed about NSBrowser. It is on my to-do list of things I want to work out one day.

 [1]: {{ site.url }}/time-in-words-for-mac/
 [2]: {{ site.url }}/time-in-words/
