---
title: 'The End of Pic-a-POD'
date: 2018-10-06T09:38:20+10:00
lastmod: 2018-10-06T09:38:20+10:00
draft: false
description: ''
tags: ['pic a pod', 'mac']
toc: true
---

I think I wrote the first version of [Pic-a-POD][1] in 2003 and have been updating and maintaining it ever since, but the time has come to shut it down.

<!--more-->

I haven't been able to find a picture of the original version, but here is one from 2005:

![Pic-a-POD 2005][2]

And here it is today:

![Pic-a-POD 2018][5]

It was written originally as a convenient way to download the daily picture-of-the-day from [National Geographic][3] and use it to set the Mac's Desktop Picture automatically. From there is just grew with more sites added (9 at the moment although I think there have been up to 12 at certain times).

The main issue was keeping up with the site changes of the various sources. Early versions had each copy of the app interrogate the sites directly which meant that any change to the site broke the app until an update could be released. And without the App Store making updates easy to distribute, this was a problem. Later I switched to having PHP scripts on my server do the data retrieval and store the results in a database. The app then just had to request the data from my server. That way if there was a change, I could react quickly and a fix to the server-side scripts allowed all users to get the new data.

As my first Objective-C app and my first app on the Mac App Store, Pic-a-POD has always held a place in my affections, and until last week, it was the one app that was always running on my Mac. So what changed? macOS Mojave's dynamic desktops! I turned off Pic-a-POD, and set the Desktop picture to change dynamically through the day and I loved it.

On the server, I have kept Pic-a-POD updated regularly, adding and removing sites, fixing the scripts to accommodate changes and so on. But the desktop app has languished and has needed an update for many years now. It's networking is primitive and I know so much more about programming for the Mac now that looking at the code is positiviely embarrassing! But it has never been a big seller so a re-write is definitely not economically viable, it would only be for my satisfaction. And if even I am not using it any more, what is the point?

So I have made the sad decision to shut it down. But what does this mean for users of Pic-a-POD right now?

Firstly, it is not going away immediately. I will remove it from the App Store, but existing copies are still going to work. If any of the source sites change their data structure, I will not be monitoring this and I will not update the server-side scripts - just turn off that source and carry on with whatever still works. And finally, when the picapod.com domain name expires in 2021, I will not renew it and the app will cease to operate.

What can you use instead? The default dynamic desktops in Mojave are great although there are only two of them, but I have bought myself an app called [24 Hour Wallpaper][4] which includes a great range of dynamic desktop pictures.

So thank you to everyone who has used Pic-a-POD over the years and especially those of you who took the time and trouble to contact me. It has been a fun journey, but there are other apps in my future now.

[1]: https://picapod.com
[2]: /images/POD2005.png
[3]: https://www.nationalgeographic.com/photography/photo-of-the-day/
[4]: https://itunes.apple.com/au/app/24-hour-wallpaper/id1226087575?mt=12
[5]: /images/POD2018.webp
