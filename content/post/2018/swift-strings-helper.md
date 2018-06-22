---
title: "Swift Strings Helper"
date: 2018-06-21T14:45:59+10:00
lastmod: 2018-06-21T14:45:59+10:00
draft: false
description: "I have created a library of string handling routines for Swift."
tags: ["swift", "library", "framework"]
toc: true
---

Hands up everyone who can remember how to work with Swift strings, especially when it comes to substrings and ranges? ....

Nobody?

Me neither. So I decided that I would work it out once and create myself a library to make it easy for myself in the future. And then I thought that other people might like it too. So I have created my first open sourced project.

<!--more-->

## Strings in Swift

Swift's string handling is amazing. It is truly Unicode-compliant, so a Swift `String` doesn't care whether your string is made up of basic alphanumerics, accented characters, or emojis that might be composed of several different emojis joined together.

But this power comes at a price, and every version of Swift has changed the way we interact with strings, seemingly making it more and more confusing for the poor programmers trying to stay current. I have got to the stage where each year I read up on the new String features and then promptly forget them. For every use, I have to go back and search how to do what should be simple.

## The Problems

To my mind, there are two main problems: indexes and substrings.

In most languages, you can get the n-th character of a string, but not in Swift. In Swift, you have to ask the string for its startIndex (or endIndex), then use an offset to adjust that index by a certain number to give you a `String.Index`. Do much the same to get a second index and then you can grab the string between those two indices.

To get a sub-string from the 7th up to the 11th character of a string, this is what you have to do:

```swift
let str = "Hello, playground"

let subStart = str.index(str.startIndex, offsetBy: 7)
let subEnd = str.index(str.startIndex, offsetBy: 11)

let subStr = str[subStart ..< subEnd]       // "play"
```

Splitting the lines up like that at least helps to show what is happening, but then you see abominations like this:

```swift
let sub = str[str.index(str.startIndex, offsetBy: 7)..<str.index(str.startIndex, offsetBy: 11)]
```

And how anyone is supposed to read that, I really do not know.

And now here is the kicker: the results (`subStr` and `sub` in the examples above) are not of type `String`! They are of type `Substring` so when you go to use them, they don't work as expected.

I guess there are cases for using `Substring` but I always just end up casting to `String` to solve this, but only after the compiler has choked on what I thought was a `String` all along.

## The Solution

To make my life easier, I worked out all the ways that I wanted to be able to split up strings. Basically just two ways: by character number or by substring. Swift already has a `substring` method but it uses `String.Index` as shown above. To avoid confusion, I named my functions all `sub`.

But now I can do the following to split strings by character number:

```swift
let subStr = startingString.sub(from: 9)
let subStr = startingString.sub(from: -3)

let subStr = startingString.sub(upTo: 4)
let subStr = startingString.sub(upTo: -3)

let subStr = startingString.sub(from: 3, upTo: 7)
let subStr = startingString.sub(from: 3, upTo: -5)
```

Negative numbers count back from the end of the string. And they all return `String` objects!

Or to split strings by their own sub-strings, I can do this:

```swift
let subStr = startingString.sub(from: "abc")

let subStr = startingString.sub(upTo: "xyz")

let subStr = startingString.sub(from: "abc", upTo: "xyz")
```

## Extras

Once I had created a string helper library, I started thinking about all the other string utilities that would be useful. So I started adding all sorts of facilities:

- Computed properties:
  - length (why should the length of a string be called count - that makes no sense)
  - words
  - lines
  - word count
  - line count
  - title case
- Encoding:
  - URL encoding & decoding for queries or forms
  - base64 encoding & decoding
- Trim:
  - trim
  - trim left
  - trim right
  - trim using extra characters
- Pad:
  - pad left
  - pad right
  - with default space or specified other character

That's as far as I have got so far, but I am hoping for some community involvement that will expand or edit this library to make it more broadly applicable.

## Open Source

I have never created an open source project before and I have rarely contributed to open source. But I have now published this library on GitHub under an MIT license. Please check it out at [https://github.com/trozware/swift-strings-helper][1]. The GitHub repo contains an Xcode project with all the source files, plus the targets to build frameworks for macOS or iOS, and a playground as documentation and to test it all out.

I would love to get as many stars as possible and it would be fantastic if anyone wanted to log an issue or contribute directly. As someone who finds the whole open source world rather intimidating, I would like to assure everyone that there will be no flaming and no shooting down of ANY ideas. I look forward to hearing from you.

I am sure there are other Swift libraries out there dedicated to solving the same problems, but I hope that mine can prove useful to some. And if you just want to use it without contributing, feel free. The usage instructions are all in the ReadMe on the GitHub page.

[1]: https://github.com/trozware/swift-strings-helper
