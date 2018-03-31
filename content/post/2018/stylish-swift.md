---
title: "Stylish Swift"
date: 2018-03-31T09:34:18+10:00
lastmod: 2018-03-31T09:34:18+10:00
draft: true
description: "Writing Swiftier Swift."
tags: ["swift"]
toc: true
---

When Swift first appeared in 2014, the early adopters were mainly, like me, Objective-C programmers. This lead to people writing what was effectively Objective-C code, but with Swift syntax. While it worked, this was code that didn't make use of the advantages of a modern language like Swift. It was like speaking a foreign language by using a direct translation of each word - understandable, but not really correct.

<!--more-->

## Early Swift

As an example, here is how an Objective-C programmer might have written Swift code to double every number between 1 and 20:

```swift
var doubles = Array<Int>();
for (i = 1; i <= 20; i++) {
    doubles.append(i * 2);
}
```

This doesn't even compile in modern Swift, but it shows how things might have been done.
So what's wrong with this?

* The array and its type are declared in a very un-Swift way.
* The loop uses the old C-style loop which is no longer supported in Swift but was up until Swift 3.
* Lines are ended with semi-colons.
* The array is a variable, not a constant.

## Swifty Swift

So after Swift had been out for a while, there was a movement towards writing "Swiftier" code.
Let's try writing that previous example in a Swifty manner:

```swift
let doubles = (1 ... 20).map { $0 * 2 }
```

And if you are not a fan of single line solutions:

```swift
let doubles = (1 ... 20).map { num in
    num * 2
}
```

And what makes the Swiftier version better?

* Immutability - it uses a constant (let) instead of a variable (var) and never changes it.
* Range instead of a strict loop.
* No semi-colons or unnecessary symbols.
* Functional programming (map) for greater efficiency.

## What makes code Swifty?

I don't have a definitive list, but here are some of the things I try to do, or at least consider:

* Use `let` instead of `var` wherever possible.
* Don't end lines with semi-colons.
* Avoid using `self.` when not necessary.
* Use `for ... in` to loop through collections.
* Never force-unwrap optionals.
* Think about whether you can use a `struct` instead of a `class`.
* Think about using a `protocol` instead of class inheritance.
* Use `map`, `filter` and `reduce` where possible.
* Performs checks early in functions and get out quickly, using `guard`.
* Make `extensions` to keep your code organised.
