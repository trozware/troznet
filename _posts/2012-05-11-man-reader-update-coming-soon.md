---
id: 229
title: Man Reader update coming soon
author: Sarah
layout: post
guid: /?p=229
permalink: /man-reader-update-coming-soon/
categories:
  - Man Reader
  - Trouble-shooting
---
Man Reader launched on the Mac App Store a couple of days ago and yesterday I got an email form a purchaser who reported that Man Reader was not displaying the man pages for MacPorts, even though he had the paths set up correctly.

I installed MacPorts to check this out and ran into the same problem. Running the command &#8220;man port&#8221; in Terminal worked fine, but &#8220;port&#8221; did not appear in  Man Reader&#8217;s list.

Man Reader uses the &#8220;apropos&#8221; command to list all available man pages, so I tested it next. When I found that it was not listing &#8220;port&#8221; either, I thought I had discovered the problem. OS X offers two commands for searching for man pages: apropos & whatis. The database files used by these commands are updated weekly by one of the periodic system commands. I manually ran this update command using:

<pre class="toolbar:2 lang:sh decode:true">sudo /etc/periodic/weekly/320.whatis</pre>

This did part of the job, as the apropos command when used in Terminal now contained the MacPorts man pages. However Man Reader still did not show these man pages.

Reverting to the Console log, I found that this was a sand-boxing problem. The Mac OS X sand-box was preventing access to the man.conf file (which tells where to look for man pages), and the whatis database file containing the new data. I assume that without access to these files, the default locations for man pages were still searched, but no non-standard locations were being searched.

I have just submitted an update to the App Store that still uses sand-boxing but requests temporary read-only access to the file system to read these files. If Apple rejects this, then I will release a version without sand-boxing.

Either way, you can be assured that the matter is being dealt with and the next update, whether sand-boxed or not, will allow access to all man pages.