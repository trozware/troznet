//: # Optionals:
//: [Playground to accompany this tutorial article](http://troz.net/2016/02/learning-swift-optionals/)
//:
//: An optional is a variable of a specified type that can also be nil.
//:
//: **The key to understanding optionals is to realise that when you declare an optional variable of a certain type, you are actually declaring a box that can hold a variable of that type or can hold nil.**

var optionalInteger: Int?
var optionalString: String?

//: ## Setting an optional:

optionalInteger = 3
optionalInteger = 42

//: ## Getting an optional:
//:
//: The **WRONG** way:
//: This only works because optionalInteger contains a value
let newInteger = optionalInteger!

//: Comment out the next line to see the error: optionalString contains no string value
// let newString = optionalString!

//: ### Using 'if let':

func doubleNumberUsingIfLet(optionalInteger: Int?) -> Int? {
    if let integerValue = optionalInteger {
        // integerValue is not an optional
        // and is guaranteed to contain an Int
        return integerValue * 2
    }

    // no integer found in the optional,
    // so return nil to indicate failure
    return nil
}

var optionalInteger2: Int?          // not assigned, so still nil

doubleNumberUsingIfLet(optionalInteger)
doubleNumberUsingIfLet(optionalInteger2)


//: ### Using 'guard':

func doubleNumberUsingGuard(optionalInteger: Int?) -> Int? {
    guard let integerValue = optionalInteger else {
        // get out quickly,
        // returning nil to indicate failure
        return nil
    }

    // integerValue is not an optional
    // and is guaranteed to contain an Int
    return integerValue * 2
}

doubleNumberUsingGuard(optionalInteger)
doubleNumberUsingGuard(optionalInteger2)


//: #### The Pyramid of Doom:

func isValidAddressBookEntry(firstName: String?, lastName: String?, emailAddress: String?, phoneNumber: String?) -> Bool {
    if let validFirstName = firstName {
        if let validLastName = lastName {
            if let validEmail = emailAddress {
                if let validPhone = phoneNumber {
                    // print to stop compiler complaining about un-used variables
                    print("\(validFirstName) \(validLastName) <\(validEmail)> #:\(validPhone)")
                    return true
                }
            }
        }
    }
    return false
}

isValidAddressBookEntry("Tim", lastName: "Cook", emailAddress: "tim@apple.com", phoneNumber: "+1 234 567 890")
isValidAddressBookEntry("Tim", lastName: "Cook", emailAddress: "tim@apple.com", phoneNumber: nil)


//: #### Pyramid of Doom removed with Swift 2:

func isValidAddressBookEntrySwift2(firstName: String?, lastName: String?, emailAddress: String?, phoneNumber: String?) -> Bool {
    if let
        validFirstName = firstName,
        validLastName = lastName,
        validEmail = emailAddress,
        validPhone = phoneNumber {
            // print to stop compiler complaining about un-used variables
            print("\(validFirstName) \(validLastName) <\(validEmail)> #:\(validPhone)")
            return true
    }
    return false
}

isValidAddressBookEntrySwift2("Tim", lastName: "Cook", emailAddress: "tim@apple.com", phoneNumber: "+1 234 567 890")
isValidAddressBookEntrySwift2("Tim", lastName: "Cook", emailAddress: "tim@apple.com", phoneNumber: nil)


//: #### 'guard' can be used in the same way:

func isValidAddressBookEntryUsingGuard(firstName: String?, lastName: String?, emailAddress: String?, phoneNumber: String?) -> Bool {
    guard let
        validFirstName = firstName,
        validLastName = lastName,
        validEmail = emailAddress,
        validPhone = phoneNumber else {
            return false
    }

    // print to stop compiler complaining about un-used variables
    print("\(validFirstName) \(validLastName) <\(validEmail)> #:\(validPhone)")
    return true
}

isValidAddressBookEntryUsingGuard("Tim", lastName: "Cook", emailAddress: "tim@apple.com", phoneNumber: "+1 234 567 890")
isValidAddressBookEntryUsingGuard("Tim", lastName: "Cook", emailAddress: "tim@apple.com", phoneNumber: nil)


//: ### Optional chaining:

struct SocialMediaAccounts {
    var facebook: Person?
    var twitter: Person?
}

struct Person {
    var firstName: String?
    var lastName: String?
    var handle: String?
}

var socialMedia: SocialMediaAccounts?
socialMedia = SocialMediaAccounts()
let twitterAccount = Person()

socialMedia?.facebook = twitterAccount
let twitterHandle = socialMedia?.twitter?.handle
