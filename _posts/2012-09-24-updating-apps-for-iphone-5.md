---
id: 382
title: Updating apps for iPhone 5
author: Sarah
layout: post
guid: /?p=382
permalink: /updating-apps-for-iphone-5/
categories:
  - TrozWare
---
I have started work updating my iOS apps to fill the larger screen of an iPhone 5. My iPhone 5 is on order &#8211; I missed out on the first shipment, but hopefully it won&#8217;t be too long. Meanwhile, I will just test in the iPhone Simulator and hope this is OK.

But it was a puzzle to me how to get an app to fill the longer screen. I have the latest Xcode and the latest Simulator which allows you to specify what screen size iPhone to simulate. So I re-built an app and nothing changed &#8211; it showing black strips top & bottom and left my app at the old size.

After trying many different things and reading a lot of the new sections of the Apple developer documentation, I finally found the answer online:

<p style="padding-left: 30px;">
  <strong>If you want your app to fill the 4&#8243; screen, you must provide</strong><br /> <strong> a new launch image file called &#8220;Default-568h@2x.png&#8221;.</strong><br /> <strong> This image must be exactly 640 x 1136 pixels.</strong>
</p>

Apparently the system uses the presence or absence of this file this to detect whether your app supports the longer iPhone.

I read that Xcode is supposed to warn you of the consequences if this file is missing, but in my case, when I opened my project, Xcode helpfully used the old launch image in its place. It showed a warning icon that the image was the wrong size, but nothing else.

The next problem was how to create this file. I use screen shots, but until the app worked in the correct format, I wasn&#8217;t going to be able to get the screen shot. So I made it a 2 step process: first I duplicated the original launch image, renamed it and resized it. It looked wrong but this was irrelevant &#8211; it was enough to get the app working in the correct format. Once I had the app working, I was able to take a screen shot and create the final launch image.

Once you have the app working in 2 sizes, you have to do more work with the layout, either using springs & struts or using the modern auto-layout feature. I find auto-layout confusing, but it is obviously more powerful and the way of the future, so I am trying to work it out. I found a good tutorial at <a href="http://www.raywenderlich.com/20881/beginning-auto-layout-part-1-of-2" target="_blank">Ray Wenderlich&#8217;s site</a>. While directed at iOS 6, it also applies to Mac apps.