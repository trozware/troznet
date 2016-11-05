---
title: Man Reader
author: Sarah
layout: page
permalink: /manreader/
tags:
  - man reader
  - mac
macappname: Man Reader
macappimage: /icons/ManReader128.png
macappdesc: A utility app for reading macOS man pages.
---

Man Reader is a utility app for reading macOS&#8217;s man pages. Man Reader allows quick, convenient and easy access to the man pages on your system, useful for programmers, system administrators and tweakers.

[![][1]][2]

  * [Buy Man Reader from the Mac App Store][3]

Man pages are available for the Unix commands used mostly in Terminal or when shell scripting. These man pages are normally displayed in Terminal using the &#8220;man&#8221; command e.g. &#8220;man man&#8221; gives you the man page for the man command.

However there are problems with this: the man page is displayed to you in your Terminal window page by page and when you have got to the bottom, you have to know to press &#8216;q&#8217; to get out of the man page display, at which point it disappears completely. Hope you have a good memory!

There are various tricks to get around this: opening it in a separate window, piping it to Preview as a PDF, listing it as a single page etc, but none of these are really convenient, which is why I wrote Man Reader. Basically, I reckon that if I want a utility, then there must be other people who would want the same thing.

Man Reader assembles a list of the commands with available man pages on your system &#8211; this will vary according to what developer tools you have installed. These commands are listed for you and you can click on any one to display the man page for that command.

### Man Reader Features:

  * List of all available man pages on your system.
  * Show only a section of the pages.
  * Search for a man page by name.
  * Display man page in text or HTML (different pages look best in different formats).
  * Step back & forward through recently viewed man pages.
  * Live links to &#8216;See Also&#8217; entries.
  * &#8216;Sticky notes&#8217; at the side to jump to sub-sections in a page.
  * Choose a font and size for the display.
  * Convenient buttons in the toolbar allow quick access to commonly used utilities.
  * Sand-boxed for OS X Lion & later.

---

##### Man Reader version 1.8 changes (23 Oct 2016):
  * More complete search for man pages, including in third-party IDEs.
  * Fix for glitch when displaying previously selected page on launch.

##### Man Reader version 1.7 changes (10 Oct 2016):
  * Updated for macOS Sierra.
  * List of pages now uses alternating colors even if not using the defaults.
  * Minimum supported system version raised to 10.11.
  * Minor display glitches fixed.

##### Man Reader version 1.6 changes (13 Jul 2016):
  * Much improved searching for available man pages, including permissions fix for some pages.
  * Fixed error with new search term being over-written.
  * Sand-boxed version now works just as well as the non-sand-boxed so please switch back to this version.

##### Man Reader version 1.5 changes:
  * Much improved searching for available man pages.
  * Sand-boxed version now works just as well as the non-sand-boxed.
  
##### Man Reader version 1.4 changes:

  * Fix for plain text view not wrapping correctly for odd-sized fonts.
  * Fix for HTML text view over-riding font colors that may be invisible.
  * Search for missing entry (e.g. g++) no longer requires Enter or Return.
  * Better automatic selection of matching entries while searching.
  * Fix for animation warning message appearing in Console.
  * Status display shows when man page list is being updated.
  * Searching inside a page now allows a minimum of 2 characters (was 3), so flags e.g. &#8216;-b&#8217; do not need to be escaped.
  * Fixed path for Network Utility in tool bar (moved in OS X 10.9).
  * More information available about the effects of sand-boxing for this app.

##### Man Reader version 1.3 changes:

  * Better formatting of plain text to allow for HTML entities.
  * Fix for font in some HTML pages getting bigger & bigger.
  * Failed search for page will search for a matching man page anyway.
  * Editable apps in toolbar (see Preferences & View menu).
  * Fixed bug when setting custom colors for marker tabs.
  * Changed shortcuts for Find (see Edit menu).

##### Man Reader version 1.2 changes:

  * Customizable colors for text, background, links, found text.
  * Searching for text within pages marks all matches.
  * Pages will adjust line width to suit window size, even in plain text mode.
  * If a search only results in a single page, press Return to display it.
  * More man pages should be located on your system.
  * Fix for bug where app did not always remember full screen setting.
  * Fix for bug where some pages were being added to the history list twice.

##### Man Reader version 1.1 changes:

  * Search for text within a man page.
  * Bookmark frequently visited pages.
  * Search man page list using &#8220;Starts with&#8221; or &#8220;Contains&#8221;.
  * Preferences for the marker tabs: choose a pre-made color set or design your own.
  * Full screen mode now supported.
  * Custom toolbar configurations now saved & restored correctly.

---

If you have any problems with Man Reader, any suggestions for future versions or encounter any bugs, please [contact me][8].

 [1]: /images/MR_Start_small.png "Man Reader"
 [2]: /images/MR_Start.png
 [3]: http://itunes.apple.com/app/man-reader/id522583774?mt=12
 [4]: /manreader-paddle/ManReader.zip
 [5]: https://pay.paddle.com/checkout/490552
 [6]: /manreader-sandbox/
 [7]: /man-reader-no-sb/
 [8]: mailto:sarah@troz.net?subject=Man%20Reader