---
id: 124
title: Man Reader
author: Sarah
layout: page
guid: /?page_id=124
---
Man Reader is a utility app for reading OS X&#8217;s man pages. Man Reader allows quick, convenient and easy access to the man pages on your system, useful for programmers, system administrators and tweakers.

[![][1]][2]

### Where to Get Man Reader

  * [Buy Man Reader from the Mac App Store][3]
  * [Download a 7 day free trial][4]
  * [Purchase Man Reader directly][5]

Man pages are available for the Unix commands used mostly in Terminal or when shell scripting. These man pages are normally displayed in Terminal using the &#8220;man&#8221; command e.g. &#8220;man man&#8221; gives you the man page for the man command.

However there are problems with this: the man page is displayed to you in your Terminal window page by page and when you have got to the bottom, you have to know to press &#8216;q&#8217; to get out of the man page display, at which point it disappears completely. Hope you have a good memory!

There are various tricks to get around this: opening it in a separate window, piping it to Preview as a PDF, listing it as a single page etc, but none of these are really convenient, which is why I wrote Man Reader. Basically, I reckon that if I want a utility, then there must be other people who would want the same thing.

Man Reader assembles a list of the commands with available man pages on your system &#8211; this will vary according to what developer tools you have installed. These commands are listed for you and you can click on any one to display the man page for that command.

### Which Version Should I Get?

There is one major difference between the two versions: the App Store version is **sand-boxed** while the Paddle version is not. The App Store version will only be able to see the standard man pages on your system and will not read any man pages from extra utilities that you may have installed. For more information, read [Sand-boxing Man Reader][6].

If you like to buy all your apps through the Mac App Store for security and convenience, then get the version from the [App Store][3].

If you want to test Man Reader before buying, [download the free trial][4]. After your 7 days has expired, you can buy from the App Store or directly through Paddle from inside the app.

If you have installed Xcode or any system-level utilities, then I suggest [buying directly][5] to get the non-sandboxed version for complete functionality.

**Are both versions the same price?** Yes &#8211; both are priced at US$4.99 although currency fluctuations may make the prices vary from day to day.

**I already own the App Store version &#8211; can I get it un-sandboxed?** Yes &#8211; go to [Man Reader (no SB)][7] for more details.

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

##### Man Reader version 1.1 changes:

  * Search for text within a man page.
  * Bookmark frequently visited pages.
  * Search man page list using &#8220;Starts with&#8221; or &#8220;Contains&#8221;.
  * Preferences for the marker tabs: choose a pre-made color set or design your own.
  * Full screen mode now supported.
  * Custom toolbar configurations now saved & restored correctly.

##### Man Reader version 1.2 changes:

  * Customizable colors for text, background, links, found text.
  * Searching for text within pages marks all matches.
  * Pages will adjust line width to suit window size, even in plain text mode.
  * If a search only results in a single page, press Return to display it.
  * More man pages should be located on your system.
  * Fix for bug where app did not always remember full screen setting.
  * Fix for bug where some pages were being added to the history list twice.

##### Man Reader version 1.3 changes:

  * Better formatting of plain text to allow for HTML entities.
  * Fix for font in some HTML pages getting bigger & bigger.
  * Failed search for page will search for a matching man page anyway.
  * Editable apps in toolbar (see Preferences & View menu).
  * Fixed bug when setting custom colors for marker tabs.
  * Changed shortcuts for Find (see Edit menu).

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

If you have any problems with Man Reader, any suggestions for future versions or encounter any bugs, please [contact me][8].

 [1]: /wp-content/uploads/2012/04/MR_Start-300x187.png "Man Reader"
 [2]: /wp-content/uploads/2012/04/MR_Start.png
 [3]: http://itunes.apple.com/app/man-reader/id522583774?mt=12
 [4]: /manreader-paddle/ManReader.zip
 [5]: https://pay.paddle.com/checkout/490552
 [6]: /manreader-sandbox/
 [7]: /man-reader-no-sb/
 [8]: mailto:sarah@troz.net?subject=Man%20Reader