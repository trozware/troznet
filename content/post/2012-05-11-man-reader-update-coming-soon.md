---
author: Sarah
date: 2012-05-11T00:00:00Z
guid: /?p=229
id: 229
tags:
- man reader
- trouble-shooting
- mac
title: Man Reader update coming soon
url: /man-reader-update-coming-soon/
---

Man Reader launched on the Mac App Store a couple of days ago and yesterday I
got an email from a purchaser who reported that Man Reader was not displaying
the man pages for MacPorts, even though he had the paths set up correctly.

I installed MacPorts to check this out and ran into the same problem. Running
the command "man port" in Terminal worked fine, but "port" did not appear in Man
Reader's list.

Man Reader uses the "apropos" command to list all available man pages, so I
tested it next. When I found that it was not listing "port" either, I thought I
had discovered the problem. OS X offers two commands for searching for man
pages: apropos & whatis. The database files used by these commands are updated
weekly by one of the periodic system commands. I manually ran this update
command using:

```bash
sudo /etc/periodic/weekly/320.whatis
```

This did part of the job, as the apropos command when used in Terminal now
contained the MacPorts man pages. However Man Reader still did not show these
man pages.

Reverting to the Console log, I found that this was a sand-boxing problem. The
Mac OS X sand-box was preventing access to the man.conf file (which tells where
to look for man pages), and the whatis database file containing the new data. I
assume that without access to these files, the default locations for man pages
were still searched, but no non-standard locations were being searched.

I have just submitted an update to the App Store that still uses sand-boxing but
requests temporary read-only access to the file system to read these files. If
Apple rejects this, then I will release a version without sand-boxing.

Either way, you can be assured that the matter is being dealt with and the next
update, whether sand-boxed or not, will allow access to all man pages.
