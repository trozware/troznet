---
date: 2012-02-25T00:00:00Z
tags:
- ui
- mac
title: Scroll bars in Mac OX 10.6 and 10.7
---

With the introduction of OS X 10.7 (Lion), Apple removed the obvious scroll bars
from windows and replaced them with a much more subtle scroll indicator, that
only appears when you are actually scrolling. This was designed to match the iOS
scrolling, as was the swap of scroll direction which makes much more sense if
you use a trackpad.

With the upcoming [Time In Words for Mac][1], I have a Preferences window to
allow selection of time zones to display in the menu. The app will be compatible
with 10.6 or later. Under 10.6, the scrollbars are always visible and this is
what the Preferences display looks like:

<img title="Preferences 10.6" src="/images/TiW-Prefs-10.6.png" alt="Preferences 10.6" width="550" height="272" />

This may change, but the basic layout is there. As you can see, I have a
3-column table listing all the available time zones, with the final column right
justified.

Under 10.7, this doesn't quite work:

<img title="Preferences 10.7" src="/images/TiW-Prefs-10.7.png" alt="Preferences 10.7" width="550" height="272" />

I had to grab this screen shot quickly after swiping the trackpad, but you can
see the problem. When not scrolling, the scroll indicator is hidden and the
right column is fully visible, but when dragging the scroll indicator appears on
top of the right-justified entries in that column.

So now I am not quite sure what to do. Here are the options I have considered:

* Left or centre-justify the text in the final column.
* Add some spacing at the end of each line so that the scroll indicator appears
  in blank space.
* Put up with it.

I will have to experiment with various options and see what I can do.

[1]: /time-in-words-for-mac/
