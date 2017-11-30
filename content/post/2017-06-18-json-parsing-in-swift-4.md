---
date: 2017-06-18T00:00:00Z
tags:
- swift
- json
- learning swift
title: JSON Parsing in Swift 4
---

**Updated:** 3rd September 2017.

* Checked syntax using Xcode 9.0 beta 6.
* Added section on [allowing for nulls][5].

---

Since **JSON** has become the de facto standard for data transfers around the
internet, there has always been a lot of interest in Swift libraries to parse
JSON into Swift classes or structs. Searching for "swift json library" on
[GitHub][2] discovers <s>77</s> 86 repositories. So why are there so many? And
what has Swift 4 done to _sherlock_ them all?

<!--more-->

The problem has always been converting loosely typed JSON to strictly typed
Swift which involves a lot of type casting, checking, optionals etc. Swift has
always provided access to the Objective-C methods for converting JSON to and
from NSData, NSDictionary and NSArray. (These are now called Data, Dictionary
and Array, but those labels are so universal, that I sometimes feel a more
specific nomenclature would be useful. Have you tried doing a search for
'Data'?)

For sample data, I am using https://jsonplaceholder.typicode.com/users which
returns 10 user objects in this format:

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

The goal will be to convert this to an instance of this matching Swift struct:

```swift
struct User {
    let id: Int
    let name: String
    let username: String
    let email: String
    let phone: String
    let website: String
    let address: Address
    let company: Company

    struct Address {
        let street: String
        let suite: String
        let city: String
        let zipcode: String
        let geo: Coordinates

        struct Coordinates {
            let lat: Double
            let lng: Double
        }
    }

    struct Company {
        let name: String
        let catchPhrase: String
        let bs: String
    }
}
```

The first thing to note is that the Swift struct (and its embedded structs) use
multiple different types: Int, String, Double, Address, Coordinates, Company.
The JSON data only has strings and numbers and even then, some of the numbers
are really strings - look at the lat & lng entries. So converting from JSON to a
struct and back again has always been problematic, but let's give it a go using
built-in Swift 3 processing with no external libraries.

## Decoding in Swift 3

You can insert this into a playground or [download my playground][3] and check
out the Swift 3 JSON page:

```swift
import Foundation

let sampleDataAddress = "https://jsonplaceholder.typicode.com/users"
let url = URL(string: sampleDataAddress)!
let jsonData = try! Data(contentsOf: url)

struct User {
    let id: Int
    let name: String
    let username: String
    let email: String
    let phone: String
    let website: String
    let address: Address
    let company: Company

    init?(dict: [String: Any]) {
        guard
            let id = dict["id"] as? Int,
            let name = dict["name"] as? String,
            let username = dict["username"] as? String,
            let email = dict["email"] as? String,
            let phone = dict["phone"] as? String,
            let website = dict["website"] as? String,
            let addressDict = dict["address"] as? [String: Any],
            let address = Address(dict: addressDict),
            let companyDict = dict["company"] as? [String: Any],
            let company = Company(dict: companyDict)
            else {
                return nil
        }

        self.id = id
        self.name = name
        self.username = username
        self.email = email
        self.phone = phone
        self.website = website
        self.address = address
        self.company = company
    }

    struct Address {
        let street: String
        let suite: String
        let city: String
        let zipcode: String
        let geo: Coordinates

        init?(dict: [String: Any]) {
            guard
                let street = dict["street"] as? String,
                let suite = dict["suite"] as? String,
                let city = dict["city"] as? String,
                let zipcode = dict["zipcode"] as? String,
                let geoDict = dict["geo"] as? [String: Any],
                let geo = Coordinates(dict: geoDict) else {
                    return nil
            }

            self.street = street
            self.suite = suite
            self.city = city
            self.zipcode = zipcode
            self.geo = geo
        }

        struct Coordinates {
            let lat: Double
            let lng: Double

            init?(dict: [String: Any]) {
                guard
                    let latString = dict["lat"] as? String,
                    let lat = Double(latString),
                    let lngString = dict["lng"] as? String,
                    let lng = Double(lngString) else {
                        return nil
                }
                self.lat = lat
                self.lng = lng
            }
        }
    }

    struct Company {
        let name: String
        let catchPhrase: String
        let bs: String

        init?(dict: [String: Any]) {
            guard
                let name = dict["name"] as? String,
                let catchPhrase = dict["catchPhrase"] as? String,
                let bs = dict["bs"] as? String else {
                    return nil
            }

            self.name = name
            self.catchPhrase = catchPhrase
            self.bs = bs
        }
    }
}

if let json = try? JSONSerialization.jsonObject(with: jsonData, options: []) {
    if let jsonArray = json as? [[String: Any]] {
        let users = jsonArray.flatMap {
            User(dict: $0)
        }
        users.count
        dump(users.first)
    }
}
```

I don't actually expect you to go through all this code in detail, but I
included it here to make it obvious how verbose this method is.

The first 3 lines get the data, and I have force-unwrapped the URL and the Data
which I would not do in a production app but which is OK while testing in a
playground. Then there is a declaration of the Users struct with all its sub
structs. Each one has a failable init that tries to parse the JSON dictionary
and returns nil if the data doesn't match, by way of a lengthy set of guard
statements. The basic layout of each struct is the same but it is very verbose.
And as an extra step, the lat and lng properties need to be converted from
Strings to Doubles.

I have to confess that it took quite come time to get this right ... lots of
guard statements to check that the data can be converted to the required types
which meant that any typos produced an empty array. The sub-structs have to be
extracted from the JSON as Dictionaries and then initialised by themselves.

## Decoding in Swift 4

So this works, and I get an array of Users objects. But it isn't pretty and it
takes a lot of code to do the processing. So now I am going to move on to doing
this in Swift 4. I am using Xcode 9.0 beta 6 (9M214v) so if you have a later
version, you may need to adapt to any changes.

```swift
struct User: Codable {
    let id: Int
    let name: String
    let username: String
    let email: String
    let phone: String
    let website: String
    let address: Address
    let company: Company

    struct Address: Codable {
        let street: String
        let suite: String
        let city: String
        let zipcode: String
        let geo: Coordinates

        struct Coordinates: Codable {
            let lat: String
            let lng: String
        }
    }

    struct Company: Codable {
        let name: String
        let catchPhrase: String
        let bs: String
    }
}

let jsonDecoder = JSONDecoder()
let users = try? jsonDecoder.decode(Array<User>.self,
                                    from: jsonData)
```

Ignoring the complexities of converting latitude and longitude to Doubles, I get
vastly simpler code. I declare all the structs as conforming to the `Codable`
protocol and then I can remove all the init methods and just let `JSONDecoder`
do its magic. I just have to tell it what data type to expect - in this case an
Array of Users. I don't have to worry about the initial conversion of the JSON
data to a Dictionary or looping through the elements using flatMap.

_In the playground, I used a do...catch structure to check the result of the
decode function, but I have used try? here to keep the code short._

## Changing data types

The lat & lng coordinates are stored in the JSON as Strings, but need to be
converted to Doubles for the Swift struct.

This requires a custom init method for the Coordinates struct to do the
conversion from String to Double.

So here is the complete code for Swift 4 - again, if you don't want to create
your own playground, you can [use mine][3], this time looking at the Swift 4
JSON page:

```swift
import Foundation

let sampleDataAddress = "https://jsonplaceholder.typicode.com/users"
let url = URL(string: sampleDataAddress)!
let jsonData = try! Data(contentsOf: url)

struct User: Codable {
    let id: Int
    let name: String
    let username: String
    let email: String
    let phone: String
    let website: String
    let address: Address
    let company: Company

    struct Address: Codable {
        let street: String
        let suite: String
        let city: String
        let zipcode: String
        let geo: Coordinates

        struct Coordinates: Codable {
            let lat: Double
            let lng: Double

            init(from decoder: Decoder) throws {
                let values = try decoder.container(keyedBy: CodingKeys.self)
                let latString = try values.decode(String.self, forKey: .lat)
                let lngString = try values.decode(String.self, forKey: .lng)
                lat = Double(latString) ?? 0
                lng = Double(lngString) ?? 0
            }
        }
    }

    struct Company: Codable {
        let name: String
        let catchPhrase: String
        let bs: String
    }
}

let jsonDecoder = JSONDecoder()
let users = try? jsonDecoder.decode(Array<User>.self, from: jsonData)

users?.count
dump(users?.first)
```

For comparative purposes, I counted the lines of code in each, removing the
common boiler plate of the top of each and the two lines for displaying the
results in the playground. I also removed the blank lines which I always use a
lot in my code for readability but which are not relevant when comparing code
efficiency:

| Version | Lines | Lines if lat & lng are Strings |
| ------- | ----: | -----------------------------: |
| Swift 3 |    95 |                             93 |
| Swift 4 |    35 |                             28 |

## Encoding

Encoding back to JSON is very similar. In the Swift 3 version, I would have
written a method for each struct that created a Dictionary and then used
JSONSerialization to convert the Dictionary back to JSON. This is very verbose
and tedious to write so I am not going to bother to demonstrate it here.

But in Swift 4, this is even easier than decoding. Add this code to the end of
your Swift 4 JSON playground or playground page:

```swift
if let users = users {
    let jsonEncoder = JSONEncoder()
    jsonEncoder.outputFormatting = .prettyPrinted

    if let backToJson = try? jsonEncoder.encode(users) {
        if let jsonString = String(data: backToJson, encoding: .utf8) {
            print(jsonString)
        }
    }
}
```

The `JSONEncoder` returns Data and I have converted that to a String for
checking. I set JSONEncoder's outputFormatting property to .prettyPrinted get a
more readable String.

Notice how the encoded data is not quite the same as I received because the lat
& lng properties are now Doubles. In a production app, if I needed to be able to
convert back to JSON, I probably would have left them as Strings so as to enable
data transfer in both directions. I would add computed properties to the struct
to convert these Strings to Doubles as I needed them.

## Advanced Decoding

Now that we have the basics, I want to look at three more features: changing
property names, date handling and allowing for nulls.

## Changing Property Names

In these examples I used exactly the same names for the properties as were used
in the JSON. In the Swift 3 version, it would have been easy to change the
property names, since the data for each property was being extracted manually.
In Swift 4, if you want the decoder to change names, you have to tell it what
you want.

Make a new playground or playground page and replace the contents with this - or
go to the Swift 4 Extras page on [my playground][3]:

```swift
import Foundation

let jsonString = """
{
"name1": "Jane",
"name2": "Smith"
}
"""
let jsonData = jsonString.data(using: .utf8)!

struct Person: Codable {
    let firstName: String
    let lastName: String
}

let jsonDecoder = JSONDecoder()
let person = try? jsonDecoder.decode(Person.self, from: jsonData)
dump(person)
```

This uses the new multi-line literals in Swift 4 to assemble the JSON string
which is amazingly useful as it allows quotes to be embedded in the string
without having to escape them. As you can see, the JSON property names are not
very helpful, so I want to change them in my Person struct. At the moment,
`person` is nil because I have not given the decoder any clues to help it
translate the names. To do that, I have to add a CodingKeys enum to the Person
struct and it tells the decoder what names in the JSON match up to what
properties in the struct.

```swift
struct Person: Codable {
    let firstName: String
    let lastName: String

    enum CodingKeys: String, CodingKey {
        case firstName = "name1"
        case lastName = "name2"
    }
}
```

And that's all I have to do. Now the JSON is correctly converted to a Person. As
an exercise, use JSONEncoder to get back to JSON from the Person. You will see
that the JSON correctly names the elements using "name1" and "name2".

## Date Handling

Next let's look at dates - add this code to the playground:

```swift
let jsonString2 = """
{
"name": "My New Project",
"created": "2017-06-18T06:28:25Z"
}
"""
let jsonData2 = jsonString2.data(using: .utf8)!

struct Project: Codable {
    let name: String
    let created: Date
}

let jsonDecoder2 = JSONDecoder()
let project = try? jsonDecoder2.decode(Project.self, from: jsonData2)

dump(project)
```

When this runs, `project` is nil because the decoder has no idea how to get from
the String "2017-06-18T06:28:25Z" to a Date object. Add this line after creating
`jsonDecoder2`:

```swift
jsonDecoder2.dateDecodingStrategy = .iso8601
```

Now the date can be converted and an instance of the Project struct will be
created.

And to get back to the JSON, converting the Date back to ISO8601 format:

```swift
let jsonEncoder = JSONEncoder()
jsonEncoder.dateEncodingStrategy = .iso8601

if let backToJson = try? jsonEncoder.encode(project) {
    if let jsonString = String(data: backToJson, encoding: .utf8) {
        print(jsonString)
    }
}
```

<a name ="nulls"></a>

## Allowing For Nulls

JSON data will often include **null** where there is no value for a particular
property name. When using JSONDecoder or JSONEncoder, this can be allowed for by
using Optionals. If you are not clear about Optionals, have a look at my
previous article: [Learning Swift - Optionals][4].

The crucial step is to declare the properties of the Swift object as optionals
if you think they could get a null value.

```swift
struct Role: Codable {
    let firstName: String
    let lastName: String
    let nickName: String?
}

let jsonStringWithNulls = """
[
    {
        "firstName": "Sally",
        "lastName": "Sparrow",
        "nickName": null
    },
    {
        "firstName": "Doctor",
        "lastName": "Who",
        "nickName": "The Doctor"
    }
]
"""
let jsonDataWithNulls = jsonStringWithNulls.data(using: .utf8)!

let jsonDecoder3 = JSONDecoder()
let roles = try? jsonDecoder3.decode(Array<Role>.self, from: jsonDataWithNulls)
dump(roles)
```

In this example (which you can find in the Swift 4 Extras page on [my
playground][3]), I have declared a struct called Role with 3 String properties.
The 3rd String - nickName - is an Optional so it may be a String or it may be
nil.

The JSON contains 2 elements - one has a nickName value and the other has it as
null. Because the matching property in the Swift struct is an optional, this
works as expected and the nickName property for Sally Sparrow is decoded as nil.
If you remove the question mark to make nickName non-optional, the decoding will
fail.

Going back to JSON from a Swift object with optionals works much the same except
that it does not specifically mark items as null, it just leaves them out.

```swift
let jsonEncoder2 = JSONEncoder()
jsonEncoder2.outputFormatting = .prettyPrinted

if let backToJsonWithNulls = try? jsonEncoder2.encode(roles) {
    if let jsonString = String(data: backToJsonWithNulls, encoding: .utf8) {
        print(jsonString)
    }
}
```

## Property Lists

As well as JSONDecoder and JSONEncoder, Swift 4 has introduced
PropertyListDecoder and PropertyListEncoder, so let's take a quick look at that.

Add this to the bottom of the last playground as it uses the Project struct and
data:

```swift
let plistEncoder = PropertyListEncoder()
plistEncoder.outputFormat = .xml
if let plist = try? plistEncoder.encode(project) {
    if let plistString = String(data: plist, encoding: .utf8) {
        print(plistString)
    }

    let plistDecoder = PropertyListDecoder()
    let project2 = try? plistDecoder.decode(Project.self, from: plist)

    dump(project2)
}
```

I don't see this is being quite as useful as the JSON Encoding & Decoding, but I
mention it here for completeness.

## Codable

In all the Swift 4 examples above, I set the structs to conform to `Codable`.
Reading Apple's docs, I see that `Codable` is actually a typealias referring to
2 separate protocols:

```Swift
typealias Codable = Decodable & Encodable
```

If you only need to convert data one way, it will be more efficient to set your
struct or class as confirming to only one of these protocols. For example, if
you download JSON data from an API but never need to send it back, just conform
to Decodable to transform the JSON data into your data structure.

Much more information can be found in the [Apple documentation][1].

[1]: https://developer.apple.com/documentation/swift/encoding_decoding_and_serialization
[2]: https://github.com/search?q=swift+json+library
[3]: https://github.com/trozware/json
[4]: /post/2016-02-12-learning-swift-optionals/
[5]: #nulls
