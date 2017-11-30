---
date: 2016-05-28T00:00:00Z
tags:
- swift
- learning swift
title: Learning Swift - Sets
---

Sets are the forgotten collection type in many languages, including Swift. I
think most developers use Arrays without really considering the advantages of
using a Set but they have some amazingly useful features that should make them a
part of any progammer's toolkit.

If you want to follow along with a playground, you can download it [here][6].

## What is a Set?

**A Set is an un-ordered collection of unique items.** That's it - nothing more
than that. So it is very similar to an Array, but it is not indexed like an
Array and it cannot contain more than one of each entry.

## Creating a Set:

Creating a Set is as easy as creating an Array:

{{< highlight swift >}} var myArray = ["dog", "cat", "hamster", "dog"] var
mySet: Set = ["dog", "cat", "hamster", "dog"] {{< / highlight >}}

If you are running these commands in a playground, notice that the differences
between the 2 results:

{{< highlight swift >}} ["dog", "cat", "hamster", "dog"] // myArray {"hamster",
"cat", "dog"} // mySet {{< / highlight >}}

1. The Array is shown wrapped in square brackets, the Set is shown wrapped in
   curly braces. This is just a visual clue and doesn't really mean anything.
   You cannot initialize a set using curly braces.
2. All the supplied elements of the Array are listed, but the Set has removed
   the duplicate "dog" element. This did not cause an error or warning, it just
   happened quietly.

When initializing a Set, you must add `: Set` to distinguish it from an array
initialization. In the example above, I did not specify the data type of the
elements in the Set as the Swift compiler was able to infer this from the
contents. But if initializing an empty array, the data type must be specified.
To check how to do this, I option-clicked on `mySet` to see what the Swift
compiler thought it was.

![Sets][1]

So mySet is actually `Set<String>`. This means that to create an empty Set, you
need to use something like this:

{{< highlight swift >}} var emptySetOfStrings: Set<String> = [] var
emptySetOfInts: Set<Int> = [] {{< / highlight >}}

## Adding and removing elements:

If you have been using an Array to store unique values, then you have probably
written code like this:

{{< highlight swift >}} if !myArray.contains("cat") { myArray.append("cat") }
{{< / highlight >}}

With Sets, you don't have to care. Just use `insert()` and let the Set work out
whether to add the item or not.

{{< highlight swift >}} mySet.insert("goldfish")\
// goldfish added: {"hamster", "cat", "dog", "goldfish"} mySet.insert("dog")\
// dog already there: {"hamster", "cat", "dog", "goldfish"} {{< / highlight >}}

Removing elements is also easier than in Arrays. For an Array, you first have to
find the index of the element and remove it by index:

{{< highlight swift >}} // myArray.remove("hamster") // will not compile if let
index = myArray.index(of: "hamster") { myArray.remove(at: index) } {{< /
highlight >}}

But in a Set, you can remove any element easily and trying to remove an element
that doesn't exist will fail without an error.

{{< highlight swift >}} mySet.remove("hamster") // returns "hamster"
mySet.remove("canary") // returns nil {{< / highlight >}}

## Converting between Sets and Arrays:

Sometimes you need to be able to switch between the two. My most recent example
was when I wanted to store data from a Set in a plist. Sets are not property
list types but Arrays are, so I converted the Set to an Array before storing it
in the plist. When reading the data in from the plist, I converted it back to a
Set.

{{< highlight swift >}} let myArrayAsSet = Set(myArray) let mySetAsArray =
Array(mySet) {{< / highlight >}}

One useful side-effect of these easy conversions is the ability to 'unique' an
Array in a single line. This may be inefficient for large arrays, but works very
well for small ones. Just be careful if the order of the elements is important
as you cannot guarantee the order of elements in a Set.

{{< highlight swift >}} let myArrayUniqued = Array(Set(myArray)) // ["cat",
"dog"] {{< / highlight >}}

## Iterating over elements in a Set:

As with an Array, you can use a `for element in set` structure, or you can use
`enumerated()`. But you cannot subscript a Set.

{{< highlight swift >}} for animal in mySet { print(animal) }

for (index, animal) in mySet.enumerated() { print("\(index) = \(animal)") }

// will not compile //for index in 0 ..< mySet.count { // print("\(index) =
\(mySet[index])") //} {{< / highlight >}}

---

## Where Sets get really interesting:

Remember in school when you learnt about Venn diagrams with pretty interlocking
circles? Sets can do the same things, although you will have to do your own
pretty drawings :-)

{{< highlight swift >}} let set1: Set = ["dog", "cat", "pig"] let set2: Set =
["cow", "horse", "pig"]

let intersect = set1.intersection(set2) // {"pig"}

let subtract = set1.subtracting(set2) // {"cat", "dog"}

let union = set1.union(set2) // {"pig", "cat", "dog", "cow" "horse"}

let xor = set1.symmetricDifference(set2) // {"cat", "dog", "cow", "horse"} {{< /
highlight >}}

In the code example above, we have two Sets of animals, with one animal in
common.

* `intersection()` lists the elements in common.
* `subtracting()` lists the elements in one Set after removing all elements that
  are in the other.
* `union()` joins all the elements without duplicates.
* `symmetricDifference()` lists the elements that are in one or other of the
  Sets but not in both. (Swift 3 renamed this function from `exclusiveOr()`)

Here is my best attempt at a pretty drawing to show how these go together:

![Sets][2]

---

The next fun trick is working out sub-sets, super-sets and disjoint sets.

{{< highlight swift >}} let set1: Set = ["dog", "cat", "pig"] let set2: Set =
["cow", "horse", "pig"]

let smallSet: Set = ["pig", "cow"]

smallSet.isSubset(of: set1) // false smallSet.isSubset(of: set2) // true {{< /
highlight >}}

`smallSet` is **not** a subset of `set1` because it contains an element that is
not in `set1`. `smallSet` **is** a subset of `set2` because every element in
`smallSet` is also in `set2`.

![Sets][3]

If you want to get technical, a Set should not be considered a subset of an
identical Set. The default `isSubset(of:)` allows this, but you can use
`isStrictSubset(of:)` if you prefer.

{{< highlight swift >}} set1.isSubset(of: set1) // true set1.isStrictSubset(of:
set1) // false {{< / highlight >}}

Superset works just the same but in reverse so the diagram above explains it
too:

{{< highlight swift >}} let set1: Set = ["dog", "cat", "pig"] let set2: Set =
["cow", "horse", "pig"]

let smallSet: Set = ["pig", "cow"]

set1.isSuperset(of: smallSet) // false set2.isSuperset(of: smallSet) // true

set1.isSuperset(of: set1) // true set1.isStrictSuperset(of: set1) // false {{< /
highlight >}}

`set1` is **not** a superset of `smallSet` because it does not contain every
element in `smallSet`. `set2` **is** a superset of `smallSet` because every
element in `smallSet` is also in `set2`.

The `isSuperset(of:)` and `isStrictSuperset(of:)` functions allow or reject
identical sets.

The final comparison tool that might be useful is `isDisjoint(with:)` which
returns true only if the two Sets have no elements in common i.e. if there is no
overlap in the circles.

{{< highlight swift >}} let set1: Set = ["dog", "cat", "pig"] let set2: Set =
["cow", "horse", "pig"] let otherSet: Set = ["duck", "chicken"]

set1.isDisjoint(with: set2) // false set1.isDisjoint(with: otherSet) // true {{<
/ highlight >}}

"pig" occurs in both `set1` and `set2` so they are **not** disjoint. `otherSet`
and `set1` have no matching entries so they **are** disjoint.

---

## When should you use a Set?

1. If you want the elements to be unique.
2. If you want easy methods of comparing the contents of different collections.
3. If you want to be able to remove elements easily.

## When should you not use a Set?

1. If you need the collection to be able to hold multiples of an element.
2. If the order of the collection is important.

---

For more details on Sets, check out [SwiftDoc.org][5].

[1]: /images/set_types.png
[2]: /images/sets_1.png
[3]: /images/sets_2.png
[4]: /images/sets_title.png
[5]: http://swiftdoc.org/v2.2/type/Set/
[6]: https://github.com/trozware/sets
