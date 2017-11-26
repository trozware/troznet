---
author: Sarah
date: 2017-05-20T00:00:00Z
summary:
- Today I have replaced the RSS feed for this site with a JSON feed.
tags:
- trozware
- json
- rss
title: JSON Feed for TrozWare
url: /2017/05/json-feed-for-trozware/
---

[jsonfeed.org][1] has announced a new format for web site feeds, designed as an
alternative to RSS. TrozWare has had an XML RSS feed for years, but I don't
think anyone ever uses it (I certainly don't), so today I have replaced it with
a JSON feed, which you can access through the
<a class="fa fa-rss" href="/feed.json"></a> button at the top of every page.

I am sure many JSON Feed viewers will appear soon, but the only one I know about
so far is at [http://json-feed-viewer.herokuapp.com][8]. As soon as this update
to my site goes live, I will apply to have TrozWare added to the list of sites
on this page. Meanwhile, you can paste in the URL: `http://troz.net/feed.json`.

This site is constructed using Jekyll, so I am very grateful to Niclas Darville
for his very easy to follow [guide][3]. However it is still well worth reading
through the [official specs][4] to see what else you want to add, or if you want
to remove anything. I had to tweak a few settings to make it work for my
configuration, and I added some more objects, but Niclas got me off to a flying
start.

Two things to watch out for:

1. Make sure your feed is producing valid JSON (I had an extra comma that was
   breaking it...).
2. As third-party apps & sites may be displaying your content, you need to make
   sure that you are not using relative URLs for images and internal links. I
   was using relative image URLs like `/images/WorkHelp1.png` but that showed a
   broken link in the feed viewer, so I have changed all such links to
   `/images/WorkHelp1.png`. Hopefully that will work correctly on my local test
   server as well as when published. <br><br>

![JSON Feed icon][6]

JSON Feed offers a nice icon which I would have liked to use, but I could not
work out a way to make it play nicely with the existing icons on my pages which
all use [Font Awesome][7] icons. So I ended up just using the existing Feed
icon. Hopefully Font Awesome will soon add a JSON Feed icon to their already
impressive list.

If anyone still wants to use the [RSS feed][5], it is no longer linked to the
buttons at the top of the pages, but you can access it manually.

[1]: https://jsonfeed.org/2017/05/17/announcing_json_feed
[2]: /feed.json
[3]: https://ndarville.com/blog/2017/05/19/json-feed-for-jekyll/
[4]: https://jsonfeed.org/version/1
[5]: /index.xml
[6]: https://jsonfeed.org/graphics/icon.png
[7]: http://fontawesome.io
[8]: http://json-feed-viewer.herokuapp.com
