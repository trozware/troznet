---
title: "Functional Programming in Swift"
date: 2018-04-02T12:37:31+10:00
lastmod: 2018-04-02T12:37:31+10:00
draft: true
description: "What is Functional Programming and how can we use it in Swift?"
tags: ["swift", "functional"]
toc: true
---

What is Functional Programming and how can we use it in Swift?

Search online for any definition of functional programming and you will find many different definitions, few of which are practically helpful. I have no claim to be an expert, but as a Swift enthusiast, this is what I have distilled out of the morass.

<!--more-->

## What is Functional Programming

Without providing a concrete definition, here are what I see as the 3 main goals of functional programming:

* use pure functions where possible
* avoid mutability where possible
* use functions as the basic building blocks

So let's go through those one by one and see how they fit into the Swift language.

## Function Programming in Swift

### Pure functions

A function is considered pure if it will always produce the same result for the same input, regardless of where it is and what calls it.

Imagine you are writing a role-playing game and for a given fight, you need to be able to calculate the damage per second caused by a character.

```swift
class DamageDealer {

    var damageDone: Int = 0
    var timeTaken: TimeInterval = 0

    func damagePerSecond() -> Double {
        if timeTaken == 0 {
            return 0
        }
        let dps = Double(damageDone) / timeTaken
        if dps < 0 {
            return 0
        }
        return dps
    }

}

let mage = DamageDealer()
mage.damageDone = 32
mage.timeTaken = 10

mage.damagePerSecond(damage: mage.damageDone, time: mage.timeTaken)
```

The `damagePerSecond` function takes no parameters but uses the properties of its containing object. This works, but there are 3 big problems:

1.  The function is not transportable - you cannot copy it into another class as it is totally dependent on the structure of the properties in the containing class.
2.  When calling the function, it is not clear what data it is going to use.
3.  This function is very difficult to test - you cannot just call the function with various values and check the result. Instead you have to set up an instance of the class, vary the properties and then test the result.

So for a version that uses a pure function, we could replace `damagePerSecond()` with this:

```swift
func damagePerSecondPure(damage: Int, time: TimeInterval) -> Double {
    if timeTaken == 0 {
        return 0
    }
    let dps = Double(damageDone) / timeTaken
    if dps < 0 {
        return 0
    }
    return dps
}

mage.damagePerSecondPure(damage: mage.damageDone, time: mage.timeTaken)
```

Calling the function is now more verbose, but reading the call gives you much more information about what is going to happen. Testing is easy, and the function is completely self-contained so can be copied into any class or struct.

### Avoid mutability

This one has become the poster child of Swift Functional Programming as Swift provides some very convenient ways to avoid mutability.

The first is `let` versus `var`. My rule is always to start defining any variable/constant with `let` and only changing to `var` if the compiler raises an error. In the current versions of Xcode, it will give a warning if you use `var` unnecessarily which is great, but I still stick to using `let` first.

The most powerful way Swift lets us use Functional Programming is with `map`, `filter` and `reduce`. Consider this function that checks possible player names:

```swift
func checkPlayerNames(names: [String]) -> [String] {
    var validNames: [String] = []

    for name in names {
        if name.count > 3 && !name.contains(" ") {
            validNames.append(name)
        }
    }

    return validNames
}

let allNames = [ "Woody", "Rex", "Slinky", "Buzz Lightyear", "Hamm" ]
let checkedNames = checkPlayerNames(names: allNames)
```

Only names with more than 3 characters and no spaces are considered valid. So this function creates an empty array and then loops through each member of the supplied array and appends any valid names to the new array before returning it.

This function is a pure function and it works as expected. But the `validNames` array is mutable and there is no need for it to be.

Converting this to avoid mutability, we get:

```swift
func checkPlayerNamesUsingFilter(names: [String]) -> [String] {
    let validNames = names.filter { name in
        name.count > 3 && !name.contains(" ")
    }
    return validNames
}
```

Inside the `filter` closure delimited by the curly braces after the word `filter`, (more about closures below), the element in the array being evaluated is stored in the `name` constant. The checks are done and this implicitly returns a `Bool` - true if the checks pass, false if they do not. If the closure returns true, the name is valid and will be part of the validNames array.

And if you really want to be concise:

```swift
func checkPlayerNamesUsingFilterShort(names: [String]) -> [String] {
    return names.filter { $0.count > 3 && !$0.contains(" ") }
}
```

I recommend the first method even if it is a bit more verbose. Storing the result in a constant before returning it makes debugging much easier. Using $0 instead of using a named parameter is convenient, but I prefer not to do this unless the closure is very simple.

`filter` takes an array of objects and returns a sub-array where every element has returned true for the checks inside the filter body.

`map` changes the elements in an array and can return an array of the same type or an array of different types.

Here is a function to square every integer in an array in the old style, using a mutable array to accumulate the result:

```swift
func squareNumbers(_ numbers: [Int]) -> [Int] {
    var squares: [Int] = []

    for number in numbers {
        squares.append(number * number)
    }

    return squares
}

let numbers = [ 1, 2, 3, 4, 5, 6 ]
squareNumbers(numbers)
```

And doing the same thing using `map`:

```swift
func squareNumbersUsingMap(_ numbers: [Int]) -> [Int] {
    let squares = numbers.map { $0 * $0 }
    return squares
}
```

In this case, the type of the data did not change: integers went in, integers came out.
But `map` can change the type as well.

```swift
func squareRoots(_ numbers: [Int]) -> [Double] {
    let roots = numbers.map { number in
        sqrt(Double(number))
    }
    return roots
}

squareRoots(numbers)
```

And there is a final twist to `map` that used to be called `flatMap` but is now called `compactMap` and that allows us to get rid of optionals as we map through an array.

```swift
func convertStringsToInts(_ strings: [String]) -> [Int] {
    let ints = strings.compactMap { return Int($0) }
    return ints
}

let strings = [ "1", "two", "", "0.34", "65", "-93", "4e8" ]
convertStringsToInts(strings)
```

The conversion of `String` to `Int` may fail and so returns an optional. If this function had used `map` instead of `compactMap`, the result would have been an array of optional Ints: `[Int?]`. By using `compactMap`, every `nil` value was dropped and only valid integers are included.

The final tool in the immutability toolbox is `reduce` and this is one that took me a while to wrap my head around.
