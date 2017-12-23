---
date: 2013-02-06T00:00:00Z
tags:
- man reader
- mac
- sand-box
title: Sand-Boxing Man Reader
---

These instructions are no longer valid. As of version 1.5, the App Store version
of Man Reader has solved the sand-boxing issues and is now as powerful as the
non-sand-boxed version.

The non-sand-boxed version will no longer be supported or updated, so please
revert to the App Store version.

---

As with all apps in the App Store, [Man Reader][1] is restricted by Apple's
sand-boxing policy. Sand-boxing is a great thing. It isolates apps from each
other and from the system, making it far less likely that a problem app will
cause wide-spread havoc. However for an app like Man Reader, this can lead to a
drop in functionality.

Due to the permissions limitations of sand-boxing, Man Reader can only search
defined paths on your system drive e.g. /usr/, /opt/\
This is where the default man pages are all stored, but if you install other software
(Xcode is a good example), then Man Reader may not be able to list all the available
man pages on your system.

To tell if Man Reader is missing man pages, copy & paste the following command
into the Terminal app:

    whatis . >> ~/Desktop/whatis.txt

Man Reader runs this command internally when it starts, but the Terminal app is
not sand-boxed and so can access everything.\
Running this command will create a text file on your desktop with a list of all available
man pages on your system. Open it in a text editor that can show the number of lines
in a file. [TextWrangler from Bare Bones Software][2] is a good free editor that
will do this.

To check what man pages ManReader can read, go to Finder and select 'Go to
Folder..." from the Go menu. Paste in the following path:

    ~/Library/Containers/net.troz.Man-Reader/Data/Library/Application Support/Man Reader/

You will see two files: open the one called 'ManReader.raw' in your text editor.
This is the result of Man Reader running the whatis command. Compare the number
of lines in the two files. Don't worry about the order of the items in the file
as that may vary, you are only concerned with the total number of lines in each.

There may be one or two lines more in the whatis.txt file but if there is a big
difference, then you are being sand-boxed...\
As an example, on my system, the whatis.txt file contains 8954 lines and the ManReader.raw
file contains 2320 lines!

<del>If you are affected by this or think that you might be, I now have a
solution - actually two possible solutions:</del>

<del>If you have already bought Man Reader from the App Store, then you can
[download a non-sandboxed version][3]. This will only work if you have the App
Store version of the app installed.</del>

<del>If you do not already own a copy of Man Reader, and want to buy it
un-sandboxed, then you can now [buy it directly][4].</del>

Please [contact me][5] if you have any issues with this.

[1]: /manreader/
[2]: http://www.barebones.com/products/textwrangler/
[3]: #
[4]: #
[5]: mailto:sarah@troz.net?subject=Man%20Reader%20and%20Sand-Boxing
