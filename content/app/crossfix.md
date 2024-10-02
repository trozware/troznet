---
title: 'Crossfix'
date: 2020-11-22T16:23:09+10:00
url: /crossfix/
comment: false
toc: false
ios_app_id: 1526235954
ios_app_name: Crossfix
ios_app_desc: Crossfix is an iPhone app for helping solve anagrams in crosswords, particularly cryptic crosswords.
---

#### Now available on the App Store for iPhones. Also works on Apple Silicon Macs.

## Crossfix

{{< rawhtml >}}
<a href="https://apps.apple.com/us/app/crossfix/id1526235954?itsct=apps_box&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-top-left-radius: 13px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; border-bottom-left-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-US?size=250x83&amp;releaseDate=1522281600&h=316183e4d473a49a7fc392abccb65adb" alt="Download on the App Store" style="border-top-left-radius: 13px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; border-bottom-left-radius: 13px; width: 250px; height: 83px; margin: unset; border: unset;"></a>
{{< /rawhtml >}}

## Crossfix Lite

{{< rawhtml >}}
<a href="https://apps.apple.com/us/app/crossfix-lite/id1526236100?itsct=apps_box&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-top-left-radius: 13px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; border-bottom-left-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-US?size=250x83&amp;releaseDate=1522281600&h=316183e4d473a49a7fc392abccb65adb" alt="Download on the App Store" style="border-top-left-radius: 13px; border-top-right-radius: 13px; border-bottom-right-radius: 13px; border-bottom-left-radius: 13px; width: 250px; height: 83px; margin: unset; border: unset;"></a>
{{< /rawhtml >}}

---

Programmers are basically puzzlers, and programming is the world's best type of puzzle, but I like to start my day with a cryptic crossword. Like programming, cryptic crossword clues have their own syntax and what seems like gibberish on a first glance, can be parsed into logical parts to take you to the answer. But there are aspects of solving crosswords that were easier with pencil and paper, so I decided to write an app to help fill one of those gaps.

There are sites and apps that offer anagram solvers, but they are just looking through a dictionary and showing you all the possibilities. To me, this feels like cheating, but I don’t have a problem with using an app to emulate the techniques I used to use with pencil and paper.

### Anagrams

Anagrams are a very popular clue type but they can be tricky to solve because our brains are too good at discerning patterns. We can recognize words using only the first and last letters if they have the correct number of letters inside. This means that asking our brains to scramble these letters into a completely different word is very difficult. In the olden days, when I used to do crosswords in the newspaper, the best method was to find a space in the margin and write the letters out in a circle which forced my brain to reconsider the options. But I do crosswords on my iPad now and while I could use a notes app and my Apple Pencil to draw the letters out, I don’t always have the Pencil with me and I want to keep looking at the crossword. So I decided that a companion iPhone app was the way that would work best for me.

Look at how I use Crossfix to help me solve this clue.

> _Users rip off revelation (8)_

The word "off" is a hint that this is an anagram, "Users rip" has the right number of letters, so the overall clue must be "revelation". This is not a very long anagram and I think having two words makes it easier, but even so.

{{< img_border-400 >}}

![Anagram solving][i1]

I knew that the third last letter was "I" so I locked that in place, then I was able to shuffle the other letters around to find the answer: SURPRISE.

### A Different Type of Anagram

Now we come to a variation of the anagram clue that is very popular with some crossword creators. I don't know if there is an official name, but I call them "subtraction anagrams".

Here is an example:

> _Creationist has no taste for what's sarcastic (6)_

The idea here is to remove the letters in "taste" from the letters in "Creationist" and then unscramble the remaining letters to find a word that means "sarcastic". This turned out to be "ironic".

![Subraction anagram solving][i2]

### Using the app

Type the letters in your anagram word or words in the entry field at the top. Spell checking is turned off so you can add spaces or not, use abbreviations or anything you like. When you have all the letters in, press Return and the letters will be arranged in a circle.

Tap the arrows in the middle of the circle to shuffle the letters randomly. This can be very useful as sometimes a pattern appears.

Tap a letter square to select it and tap again to move it, either into an answer square or into the discard tray below. Tap a letter in an answer square or in the discard tray to put it back into the circle.

If you already know some of the cross letters, put them into the answer squares and tap the lock button to freeze them in place.

The up arrow button will move all the unlocked letters out of the answer squares and back into the circle. Reset starts the word again completely and Clear removes everything so you can start again with a new set of letters.

Tap the gear wheel to see some help and to configure the sound and animation settings. Swipe down to dismiss this display.

![Settings][i3]

### Which Version to Get

I have published two version of this app on the App Store: [Crossfix][1] and [Crossfix Lite][2].

Crossfix Lite is free, but you are limited to solving three anagrams per day.
Crossfix is a paid app that allows unlimited solves.

Try out Crossfix Lite and then pay for Crossfix if you need more solves or if you would like to support the development of this app.

You may be wondering why I chose to release two apps instead of using in-app purchases to unlock the full version and there is one big reason: family sharing. I share a family account and it has always really annoyed me that direct app purchases are shared, but in-app purchases are not. So if I used IAPs and more than one member of your family wanted to use the app, you would have to pay twice, which seems unfair. I have deliberately chosen to have two distinct apps so as to allow family members to share all the features of the full app with a single purchase.

[i1]: /images/2020/Crossfix-anagram.webp
[i2]: /images/Crossfix-sub-anagram.webp
[i3]: /images/Crossfix-settings.webp
[1]: https://itunes.apple.com/app/crossfix/id1526235954
[2]: https://itunes.apple.com/app/crossfix-lite/id1526236100
