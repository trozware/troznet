---
title: Learning Swift - Generics
author: Sarah
layout: post
permalink: /2016/02/learning-swift-generics/
tags:
  - swift
  - learning swift
---

One of the nice things about Swift is how clean your code looks. A lot of the weird characters that pepper the code of other languages has been eliminated: No more semi-colons, asterisks etc.

But then you are reading somebody else's code and you find these angle brackets all over the place and they don't seem to make sense.

What does this mean?

{% highlight swift %}
func mid<T: Comparable>(array: [T]) -> T
{% endhighlight %}

It looks like it is a function to find the middle element in an array, but what is `<T: Comparable>` or `[T]` or even just `T`? They are describing Generic data types.

Using the dictionary, I find the following definition for `generic`:

> characteristic of or relating to a class or group of things; not specific.

And that really provides quite a good definition for Swift's generics too. They allow you to assign a non-specific data type to a function so that function can be used for many different data types.

---

But enough of the theory: by far the best way to understand generics is to encounter the problem they are meant to solve and then to solve it.

The other day I was processing data to feed to a charting library. I ended up with an array of CGFloats, but there were too many of them, so I wrote a function to give me the last x elements of an array of CGFloats:

{% highlight swift %}
func endOfArray(array: [CGFloat], numberOfElementsToInclude: Int) -> [CGFloat] {
    if numberOfElementsToInclude > array.count {
        return array
    }

    let startingElement = array.count - numberOfElementsToInclude
    let endOfArray = Array(array[startingElement ..< array.count])
    return endOfArray
}

let largeArray: [CGFloat] = [
    1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0
]
let smallArray = endOfArray(largeArray, numberOfElementsToInclude: 3)
// smallArray now equals [8.0, 9.0, 10.0]
{% endhighlight %}

OK, so `largeArray` isn't actually the largest array you have ever seen, but it works for demo purposes. In my code, I had over 20,000 entries in the large array and only wanted the last 5,000.

I was completely happy with that until I found another data source where the data was an array of Ints. Still perfectly chartable using my charting library, but I could not get the end of the array using my nice function. First thought was to replicate the function:

{% highlight swift %}
func endOfArray(array: [Int], numberOfElementsToInclude: Int) -> [Int] {
    if numberOfElementsToInclude > array.count {
        return array
    }

    let startingElement = array.count - numberOfElementsToInclude
    let endOfArray = Array(array[startingElement ..< array.count])
    return endOfArray
}

let largeArrayInt = [ 	// type inferred to be Int
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]
let smallArrayInt = endOfArray(largeArrayInt, numberOfElementsToInclude: 7)
// smallArrayInt now equals [4, 5, 6, 7, 8, 9, 10]
{% endhighlight %}

A quick glance will reveal that the declaration line was the only thing that changed. I didn't have to give the function a new name because the compiler worked out which of the two functions to use based on the types supplied. So all I was doing was replacing `CGFloat` with `Int` in two places (the `numberOfElementsToInclude` parameter remains an `Int` in both cases).

**As soon as you find yourself replicating code and only changing the types of the data, that is a sign that you need to use generics.**

For my first attempt at creating a generic function, all I did was replace the word `CGFloat` with `T` where `T` indicates some type that will be specified when the function is called. The convention is to use single letters for generic types: `T` for Type, `A` for AnyObject, `Z` because you feel like it. The choice is up to you.

That produced this error:

![Generics error][1]

`Use of undeclared type 'T'`. Well that seems fair enough... how is the compiler supposed to know what a T is? 

It turns out that this is where the angle brackets come into play. You have to warn the compiler that this function is going to get a generic type and that the `T` is only a placeholder, not a real type. So this version compiles and works - notice the `<T>` between the function name and the opening bracket:

{% highlight swift %}
func endOfArray<T>(array: [T], numberOfElementsToInclude: Int) -> [T] {
    if numberOfElementsToInclude > array.count {
        return array
    }

    let startingElement = array.count - numberOfElementsToInclude
    let endOfArray = Array(array[startingElement ..< array.count])
    return endOfArray
}
{% endhighlight %}

Now I have no code duplication and if I ever get another data set that uses a different object type, my function will still work.

---

Now we know to use generics instead of replicating code that operates in the same way on different data types.
   
And we know how to construct a generic function.

Using it is identical to using the two functions I had before:

{% highlight swift %}
let largeArray: [CGFloat] = [
    1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0
]
let smallArray = endOfArray(largeArray, numberOfElementsToInclude: 3)

let largeArrayInt = [ 	// type inferred to be Int
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]
let smallArrayInt = endOfArray(largeArrayInt, numberOfElementsToInclude: 7)
{% endhighlight %}

You do not have to specify what `T` is when calling the function, that will be inferred from the supplied data.

---

Moving on into more advanced use cases, we have two things to consider:

1. Functions where the generic parameters must conform to a protocol.
2. Functions that take generic parameters of different types.

The example function I started with (not mine but I forget where I got it... If it is yours, thanks you very much) used:

{% highlight swift %}
func mid <T: Comparable> (array: [T]) -> T
{% endhighlight %}

Instead of specifying the type as completely generic, it specified that it must conform to the Comparable protocol.
This is because the function body used a `sort()` function so the generic function needed to be sure that the elements in the array could be compared. This technique can also be used to restrict the parameter types to sub-classes of a certain class.

For a function with more than one generic data type, you need to use more than one placeholder letter:

{% highlight swift %}
func genericWithTwoDifferentTypes<T, U>(param1: T, param2: U) -> Bool {
    // ...
}
{% endhighlight %}

And in exactly the same way, both `T` and `U` can be set to conform to a protocol or be members of a certain super-class.

---

Hopefully this has taken some of the mystery out of generics, but if you have any questions, please get in touch using the [Contact page][2], comment below or contact me via Twitter: [@trozware][3].


[1]: /images/Generics_error.png
[2]: /contact/
[3]: https://twitter.com/trozware