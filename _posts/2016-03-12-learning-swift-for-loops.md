---
title: Learning Swift - For-Loops
author: Sarah
layout: post
permalink: /2016/03/learning-swift-loops/
tags:
  - swift
  - learning swift
---
Loops are a fundamental building block of any program. Doing repetitive tasks fast and accurately is what computers are really good at and what we humans get very bored doing. Swift offers several different ways to perform loops, but today we are going to concentrate on for-loops.

The most basic form of loop is the `for-in` loop. There are two ways this can be used: looping over the numbers in a range or looping over the elements in an array or dictionary.

Firstly, the range:

{% highlight swift %}
for x in 0 ..< 5 {
    printWithSpace(x)
}
// prints:  0 1 2 3 4 
{% endhighlight %}

*I am using a custom print function that allows me to print the results on a single line for convenience.*

This `for-in` loop uses a half-open range and it is effectively saying:

    start with x at 0
    print x with a space
    add 1 to x
    is x still less than 5?
        yes - go back to the print stage
        no - stop

If we wanted to go all the way to 5 instead of stopping before 5, we would use a closed range by replacing `..<` with `...`

{% highlight swift %}
for x in 0 ... 5 {
    printWithSpace(x)
}
// prints:  0 1 2 3 4 5 
{% endhighlight %}

---

These methods work fine if we want to loop through a range of numbers one at a time but what if we want a different increment? There are several ways to vary the step.

- `stride(from:to:by:)`
- `stride(from:through:by:)`
- `where`

{% highlight swift %}
for x in stride(from: 0, to: 10, by: 2) {
    printWithSpace(x)
}
// prints:  0 2 4 6 8 
{% endhighlight %}


{% highlight swift %}
for x in stride(from: 0, through: 10, by: 2) {
    printWithSpace(x)
}
// prints:  0 2 4 6 8 10 
{% endhighlight %}

The 2 variations of `stride` are analogous to the 2 ways of expressing the range in the the `for-in` loop.

`stride(from:to:by:)` starts with the number in the `from` parameter and each time through the loop, increments that number by the amount of the `by` parameter. If the incremented number is less than the `to` parameter, the loop continues.

`stride(from:through:by:)` works the same way but continues until the incremented number is greater than or equal to the `through` parameter.

Using a negative value for `by` allows counting backwards:

{% highlight swift %}
for x in stride(from: 10, through: 0, by: -2) {
    printWithSpace(x)
}
// prints:  10 8 6 4 2 0 
{% endhighlight %}

Stride can also be used for floating point loops although the result may contain some unexpected changes in precision e.g 0.7000000000000001 instead of the expected 0.7

{% highlight swift %}
let startingNumber = 0.1
for x in stride(from: startingNumber, through: 1.0, by: 0.2) {
    printWithSpace(x)
}
// prints:  0.1  0.3  0.5  0.7  0.9  
{% endhighlight %}

Note that the result does not contain the `through` parameter as the next iteration would have produced 1.1 which is greater than it. And also `startingNumber` did not have to be a variable as it is never actually changed.

Using `where` makes it possible to step through a loop while conforming to some conditional:

{% highlight swift %}
for x in 0 ... 10 where x % 3 == 0 {
    printWithSpace(x)
}
// prints:  0 3 6 9
{% endhighlight %}

---

The other main use for `for-in` loops is for iterating through the elements of an array or dictionary:

{% highlight swift %}
let arrayOfInts = [ 1, 2, 3, 4, 5, 6 ]
for x in arrayOfInts {
    printWithSpace(x * 2)
}
// prints:  2 4 6 8 10 12
{% endhighlight %}

{% highlight swift %}
let myDict = [ 1: "one", 2: "two", 3: "three" ]
for (key, value) in myDict {
    print("\(key) = \(value)")
}
// prints:
//   2 = two
//   3 = three
//   1 = one
{% endhighlight %}

As a dictionary is un-sorted, the order of the items may vary.

If you want to loop through an array while also monitoring the index of each element, you can use `enumerated()`

{% highlight swift %}
let arrayOfNames = [ "Andy", "Buzz", "Woody" ]
for (index, element) in arrayOfNames.enumerated() {
    print("The name at index \(index) is \(element)")
}
// prints:
//   The name at index 0 is Andy
//   The name at index 1 is Buzz
//   The name at index 2 is Woody
{% endhighlight %}

If your array contains optionals, you can use `for case let` to test each value:

{% highlight swift %}
let arrayWithOptionals: [String?] = [ "Woody", nil, "Buzz", nil, "Rex" ]
for case let name? in arrayWithOptionals {
    printWithSpace(name)
}
// prints: Woody Buzz Rex 
{% endhighlight %}

The `name` variable is un-wrapped each time through the loop so can be used safely.

Any of these loop styles can be combined with `where` to perform checks on each iteration:

{% highlight swift %}
let arrayWithOptionals: [String?] = [ "Woody", nil, "Buzz", nil, "Rex" ]
for case let name? in arrayWithOptionals where name.characters.count < 5 {
    printWithSpace(name)
}
// prints: Buzz Rex 
{% endhighlight %}

---

Some of you may be wondering what happened to the old C-style loops like this:

{% highlight swift %}
for var x = 0; x < 5; x++ {
    print(x, terminator: " ")
}
{% endhighlight %}

This does not work in Swift 3: the `++` and `--` operators and this style of loop declaration have been removed from the language. For further details, check out the relevant proposals at Swift Evolution:

- [Remove C-style for-loops with conditions and incrementers][1]
- [Remove the ++ and -- operators][2]

---

All the examples in this article are available in a [Swift playground][3] now updated to Swift 3 syntax.


[1]: https://github.com/apple/swift-evolution/blob/master/proposals/0007-remove-c-style-for-loops.md
[2]: https://github.com/apple/swift-evolution/blob/master/proposals/0004-remove-pre-post-inc-decrement.md
[3]: https://github.com/trozware/for-loops
