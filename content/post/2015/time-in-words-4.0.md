---
date: 2015-04-15T00:00:00Z
tags:
  - time in words
  - ios
title: Time In Words 4.0
---

[Time In Words][1] for iOS started off as a fun gimmick, emulating the
[Qlocktwo][2] type of time display where the relevant words are highlighted in
some way to spell out the time as a sentence. This very quickly evolved into
what I hoped would be more useful app, still showing the original display, but
also providing the current time & date as complete sentences. Then I added time
conversions and discovered the real power and utility of writing out times as
words.

When it comes to converting times, I doubt there are many people in the world
who haven't had problems.

- Is that morning or afternoon for them?
- Are they in tomorrow, today or yesterday?
- What if they are using daylight-savings?

Having the time written out removes all ambiguity. As an example, Time In Words
currently reports very clearly:

> In Los Angeles, it is nine minutes to ten on Tuesday evening (daylight-savings
> time).

When writing [Time In Words for Mac][3], I focussed immediately on the time zone
conversion facilities, and provided a menu bar app that can display as many time
zones as you like (although more than will show on a single screen would
probably get annoying).

So when I decided to do a complete re-write of Time In Words for iOS, the
obvious move was to emulate the Mac version and allow for as many time zones as
the user wants, instead of the current 2 or 4 (iPhone or iPad). So I discarded
the Qlocktwo display and the separate date display which used a similar
mechanic. I kept the display that shows the current date and time, but every
display after that shows the time in a different time zone. The time zones can
be changed and re-ordered, so the ones you need most are the fastest to get to
once the app opens.

---

One new feature (again taken from the Mac version), is the ability to calculate
"What time will it be..."

![What time][i1]

You dial in your local date and time to see what time that will be in your
selected zone. And if you want to calculate the other way around, tap the "Swap
time zones" button.

---

The main impetus for a re-write was the Apple Watch. I thought this would be a
perfect app for the watch as it could use the Apple Watch's superb time-keeping
in conjunction with my text generation, to add a significant level of usability
to the Apple Watch as regards time zone conversions.

Sadly, Apple disagrees…

I completed the app and submitted it to the App Store for review. The review
process seems to be very fast at the moment and the app moved into review only
one day later. And there it stuck for 3 days. This was very odd. My experience
is that once an app gets into review, it only takes a few hours, if that. For
[19th Hole][4] - my other app with an Apple Watch component, the review process
took 30 hours. But 3 days!

Then I got a phone call from Apple where a very polite person explained to me
that although this was not mentioned in any of the documentation, the marketing
people had decided that no apps were to be allowed on the watch if they told the
time.

I offered to remove the initial screen telling the local time, so the app would
not actually supply the current time but only the time conversions, but that was
not acceptable either.

Then I tried appealing the rejection. My hopes were not high, but I didn't see
any harm in asking. I again offered to remove the local time display and
emphasised the accessibility advantages of displaying times in this manner.
Another day, another phone call, another polite Apple person saying no.

So now I have re-submitted the app for review without the Apple Watch component,
which is a shame. I am hoping that after some months they will review this
policy and allow me to try again, but who knows.

So you can see what you are missing, here are a couple of screen shots from the
watch app showing my local time, plus one time zone:

![Local time][i2]
![Converted time][i3]

---

One more minor point. People who actually look at version numbers may wonder why
I have gone from version 2.5 to version 4.0. When I was working on version 2.5,
I considered making it version 3.0 and then changed my mind. However by that
time I had already created a version 3.0 in iTunesConnect, so I was not able to
use 3.0 again this time. This version was such a big change that I wanted it to
be a .0 release, so that meant going to version 4.0

[1]: /time-in-words/
[2]: http://www.qlocktwo.com/
[3]: /time-in-words-for-mac/
[4]: /19th-hole/
[i1]: /images/2015/TiW_what_time.png
[i2]: /images/2015/Watch_1.png
[i3]: /images/2015/Watch_2.png
