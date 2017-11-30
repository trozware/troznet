---
date: 2012-05-16T00:00:00Z
dsq_thread_id:
- 3571578097
tags:
- operating systems
- mac
title: Easy access to the Library folder
url: /easy-access-to-the-library-folder/
---

In Mac OS X 10.7 (Lion), Apple decided to make it more difficult to access your
Library folder, presumably to stop people doing stuff that made apps crash. But
as a developer, I need access to my Library folder a lot. I need to check that
preferences are being saved correctly. If I have an app that uses the
Application Support folder, then I need to be able to check it. And for
sand-boxed apps, they keep all their data in the Containers folder inside the
Library.

You can easily get to the Library folder by holding down the Option key while
choosing the Go menu in Finder. This adds Library to the menu and you can get to
the folder that way. But this is not as convenient as single-click access from a
Finder window, so here is my preferred method.

Use the Option key and the Finder's Go menu to get the Library folder open in a
Finder window. Switch this window to column view, which will display the Library
folder (slightly greyed out) in the first column. Drag this Library folder to
the side bar of your Finder window. Now it is there all the time, in every
Finder window that is showing the side bar.

I have read about various Terminal tricks to get the Library to show up, but
every system update seems to turn it off again. This technique doesn't involve
anything except the Finder's side bar preferences and so far (I'm now up to
10.7.4), it hasn't needed to be reset after any update.
