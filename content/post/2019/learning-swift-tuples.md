---
title: 'Learning Swift  - Tuples'
date: 2019-02-03T19:48:51+10:00
lastmod: 2019-02-06T16:49:24+10:00
draft: false
description: 'I sometimes like to focus on aspects of the Swift language that get less publicity, but that I think are really useful without adding a lot of complexity. This time I am looking at tuples.'
tags: ['swift', 'learning swift']
toc: true
---

{{< img_border >}}

I sometimes like to focus on aspects of the Swift language that get less publicity, but that I think are really useful without adding a lot of complexity. This time I am looking at tuples.

There are many different ways of collecting data together in Swift, but for small amounts of transitory data, I find tuples to be an extremely convenient data structure.

<!--more-->

## What is a Tuple?

A tuple is basically an array with a pre-determined length and unlike normal Swift arrays, it can hold a mix of data types.

Here are some examples:

```swift
let pair = ("Jessie", "Woody")
let coords = (0, 4, -6)
let pet = (type: "cat", trained: false, age: 5)
```

To define a tuple, you enclose the data elements in parentheses - normal brackets, not curly or square. Optionally, the elements can have a label attached as shown in the `pet` example.

Tuples can have any number of components, but if they get too long, a struct might be a better option. [SwiftLint][3] will complain if you use tuples with more than 3 elements and usually I go along with that.

There are various ways to access the parts of a tuple. The first way is using index numbers which works but isn't very intuitive and could be hard to decipher when you come back to a project after some time.

```swift
print(pair.0)
print(pair.1)
```

The next way is if the tuple has used labels for the elements as in the `pet` example above:

```swift
print(pet.type)
print(pet.trained)
print(pet.age)
```

But the way I prefer to use them is by deconstructing the parts into separate variables in a single statement:

```swift
let (x, y, z) = coords
print(x, y, z)
```

The elements of a tuple can be of different types but once a tuple has been defined, that type of each element is fixed, so you still get all the benefits of Swift's type safety.

Option-clicking on the variable name shows the inferred type of the tuple:

![The type of a tuple.][1]

Trying to re-assign the tuple or any elements of the tuple will only work if the new assignments match the initial types for each element:

![Errors when mutating a tuple.][2]


## Where could you use a tuple and why?

Let's imagine you have a function that checks a database or web service and comes back with the title of a movie and its rating.

```swift
func getMovieInfo() {
  var movieTitle: String
  var rating: Int

  // get the data from somewhere
  // now return both movieTitle and rating
}
```

Having got the data, this function needs to return two pieces of data: `movieTitle` and `rating` - one `String` and one `Int`. How could this be done?

1. **Array**: since there are 2 different data types, the array would have to be of type `[Any]` or the `Int` could be converted to a `String` before returning. Neither of these are good options. Using `Any` removes the protection of Swift's type safety and converting the `Int` to and from a `String` may fail, so then you have to deal with optionals.

2. **Dictionary**: the same arguments hold true. The dictionary would have to be of type `[String: Any]` or the rating would have to be converted to a `String`.

3. **Struct or Class**: either of these would be fine but unless this is a data structure that is going to be re-used, it seems like overkill.

4. **Tuple**: this would get my vote, so let's see how that would work.

```swift
func getMovieInfo() -> (String, Int) {
  var movieTitle: String
  var rating: Int

  // get the data from somewhere

  return (movieTitle, rating)
}
```

Two main things to notice here:

1. The return type of the function lists the data types of both the elements being returned, enclosed in parentheses.

2. The returning tuple is created by wrapping the elements inside parentheses, just like in the examples above.

And then in the calling function, you can access the parts of the returned data like this:

```swift
let (returnedMovieTitle, returnedRating) = getMovieInfo()
```

The tuple is being returned and immediately deconstructed to give 2 new variables so accessing the parts of the tuple is easy and type-safe.

A function returning a tuple can also be configured to use named elements by specifying the names in the return type declaration.

```swift
func getMovieInfo() -> (name: String, score: Int) {
    var movieTitle: String
    var rating: Int

    // get the data from somewhere

    return (movieTitle, rating)
}

let result = getMovieInfo()
let returnedMovieTitle = result.name
let returnedRating = result.score
```

My feeling is that once a tuple is complex enough to need names, you should really consider using a class or a struct, but for returning 2 or 3 chunks of data from a function, this is a very useful technique, espeicialy if the data types are different.

## Looping through tuples

If you have an array of tuples, looping through the tuples is made very convenient if you use the deconstruction method of accessing the parts.

As an example, suppose you are dealing with some 3D coordinate system and you want to perform an operation on each location.

```swift
let coords_array = [
    (0, 0, 0),
    (0, 1, -3),
    (1, 4, 2),
    (-2, 0, 5),
    (5, 2, 4)
]

for (x, y, z) in coords_array {
    let distanceFromOrigin = abs(x) + abs(y) + abs(z)
    print(distanceForOrigin)
}
```

You can deconstruct the tuple each time through the loop, assigning temporary variables so you can act on them.

## Wrapping Up

So those are the basics of tuples: how to create them, how to use them and where they might be useful. My main use is as a light-weight alternative to a struct for returning multi-part data from a function. But hopefully after reading this article, they have become another tool in your Swift tool belt that you can consider using in certain circumstances.

### That leaves only one important question: how do you pronounce 'tuple'?

I have heard two variations: 'toople' using a long U as in universe or 'tupple' using a short U as in cup. There does not appear to be any strict geographical differentiation, so take your pick. I prefer 'toople' myself, but if somebody says 'tupple', I know what they mean.

[1]: /images/2019/Tuple_type.png
[2]: /images/2019/Tuple_errors.png
[3]: https://github.com/realm/SwiftLint