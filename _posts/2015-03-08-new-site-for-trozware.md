---
title: New Site for TrozWare
author: Sarah
layout: post
permalink: /new-site-for-trozware/
tags:
  - TrozWare
  - Web
---
### Welcome to TrozWare's new site.

It appears that I am not alone in deciding to move away from WordPress. WordPress is great - easy to set up and with lots of cool themes to allow customisation of your site. But it is slow, especially if (like me) you are running on a low-cost shared server.

I had been reading about [Jekyll][5], so I decide to give it a go and also host my site on [GitHub][6], taking advantage of their faster servers.

I followed the advice given by [Girlie Mac][1] and performed the migration from my self-hosted WordPress site. I am using the [Pixyll][2] theme by [John Otander][3] with a few tweaks of my own.
The site is much faster to load, and I am hoping that the easier editing will inspire me to write more posts.

Of course it wasn't all positive. WordPress did give me some features I liked, but I think overall the result is better.

#### WordPress:

- WordPress gave me a full LAMP stack, so I could run my own PHP scripts.
- WordPress gave me a search function.
- Commenting was built-in.

#### Jekyll:

- Jekyll builds the pages out as static HTML, so all pages are pre-generated for fast loading.
- Writing for Jekyll is pure Markdown so it is easier to write and preview locally.
- Some of the things I needed a plugin for in WordPress can be done natively in Jekyll:
	- tables
	- syntax-highlighting
	
For comments, I have switched to [Disqus][8], but I am not sure about it yet. I will evaluate over the next few weeks. In WordPress, I used a plugin to handle the spam that inevitably arrived. I am hoping that Disqus will protect me from that, but I have to see how good a job it does and whether the few real comments are worth it.
A better option might be to turn off comments completely and just have a contact form (which I have added using [Formspree][4]).
	
Working in Markdown is great. I love how I can have a really clean look in my editor and still end up with well formatted HTML. I use Coda 2 on my Mac as my standard web editor, so that is what I am writing in now. I will probably experiment with other Markdown editors as I go. And for any Mac users out there working in Markdown, I highly recommend [Brett Terpstra's Markdown Service Tools][7].

**Update:** I couldn't get  Disqus to apply the old comments to the posts on this new site, and given the low volume of legitimate comments, I have decided to turn off commenting. If anyone wants to say something, use the Contact link at the top right to send me a message and I will add it to the post if required.


[1]: http://www.girliemac.com/blog/2013/12/27/wordpress-to-jekyll/
[2]: http://pixyll.com
[3]: http://johnotander.com
[4]: http://formspree.io
[5]: http://jekyllrb.com
[6]: https://pages.github.com
[7]: http://brettterpstra.com/projects/markdown-service-tools/
[8]: https://disqus.com