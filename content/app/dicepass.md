---
date: 2015-05-29T00:00:00Z
mac_app_desc:
  A utility to app to generate random passphrases based on the Diceware
  system.
mac_app_image: /icons/DicePass128.png
mac_app_name: Dice Pass
title: Dice Pass
url: /dicepass/
draft: true
---

Dice Pass is available from the [Mac App Store][0] and version 3.2 (released 26th September 2018) supports macOS Mojave's dark mode.

Dice Pass is a utility to app to generate random passphrases based on the
[Diceware system][1]. Diceware uses a table of pre-defined words, each assigned
a 5 digit code number containing the digits 1 to 6. The official way to generate
a phrase is to roll 5 dice for each word you want in your passphrase and then
consult the words table to find the matching word.

![Dice Pass for Mac][7]

The resulting phrase uses real words or common abbreviations, so it is easier to
remember than a random collection of characters. At the same time, the random
selection of words makes the generated passphrase much more secure as it avoids
the human tendency to pick words with personal meaning.

The Diceware system was invented by Arnold Reinhold. This utility is not
associated with or supported by Arnold Reinhold in any way, but uses his
techniques with thanks. For more information about Diceware, have a look at the
[Diceware Passphrase FAQ page][2].

The default word list used in this app is a variation compiled by [Alan
Beale][3] that removes some of the more obscure words. But you can select the
original Diceware word list or the Diceware 8k word list fromt rh Word List menu
if you prefer to use something different. You can also provide your own word
list file if you prefer.

---

## F.A.Q.

**How many words should I use in my passphrase?**

Arnold Reinhold recommends 6 words. He used to suggest that 5 was sufficient for
most needs, but as of 2014 has increased this to 6. See the Diceware Passphrase
FAQ page for more details. (Link above.)

**How often can I re-generate the passphrase?**

As often as you like. Keep clicking until you get a phrase that you can
remember. If you get a phrase where most of the words are good but you would
like to change one or two, you can click 'Re-Roll' on individual words to change
them.

**Is there a way to check the strength of my passphrase?**

There are many password strength checkers on the internet and three of these are
listed below. But always be careful when pasting your passphrase into a web
page.

**Online password strength checkers:**

- [Rumkin.com Strength Test][4]
- [How Secure Is My Password?][5]
- [The Password Meter][6]

**Some of the words in the phrase are not complete words.**

The theory is that shorter words or abbreviations are easier to remember than
long ones, without compromising security. But if you get a word you don't like
or think that you will not be able to remember, just re-roll that word.

**What if I want to roll the dice myself?**

Dice Pass allows you to tap on the 5 dice to set the numbers needed for each
word manually. Each time you tap the number will go up be one, wrapping from 6
back to 1. The app will then look up the word table for you and show the new
word.

**When the phrase gets too long I can't see all the words.**

The "Copy" button will copy the complete passphrase even if it is not all
visible. You can also scroll by clicking and dragging along the passphrase.

**Does my passphrase get saved by the app or transmitted over the internet?**

No. The app saves no data except for basic preferences (window positioning &
size, preferred word list etc.). There is never any data sent over the network
and the app will work perfectly if you disconnect your computer before using.

**What are those 3 buttons: #, A and 1?**

Some sites may require a passphrase that contains a mix of character types.
These buttons will insert a special character, change the start of one word to
uppercase, or insert a number. Tap the button again to undo the change. Again,
these characters are chosen using the dice roll system and the special
characters are selected and positioned using the method and data suggested by
Arnold Reinhold.

**I thought there was a version of Dice Pass for iOS!**

There was, but with the need to update apps to support iOS 10, I decided to drop
support for some under-performing iOS apps. If you bought the iOS version and
would like to switch to the Mac, send me a screen shot of the app running on
your iPhone or iPad and I will send you a free promo code for the Mac version.

[0]: https://itunes.apple.com/us/app/dice-pass/id997688302
[1]: http://world.std.com/~reinhold/diceware.html
[2]: http://world.std.com/%7Ereinhold/dicewarefaq.html
[3]: http://world.std.com/~reinhold/beale.wordlist.asc
[4]: http://rumkin.com/tools/password/passchk.php
[5]: https://howsecureismypassword.net
[6]: http://www.passwordmeter.com
[7]: /images/DicePass_Mac.png
[8]: https://itunes.apple.com/app/dice-pass/id998397511
[9]: /images/DicePass_iOS.png
