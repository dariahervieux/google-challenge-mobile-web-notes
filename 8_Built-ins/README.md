### 8.3 Symbols

Symbol - a unique and immutable data type, a unique identifier, most often used to uniquely identify properties within the object.
Creation:
```
Symbol('description');
```

Use case:
```
const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
```

### 8.4 Iteration & Iterable Protocols

The **iterable protocol** is used for defining the way for iterating through values in an object, such as what values are looped over in a `for..of` construct.
[Built-in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#Built-in_iterables) iterables:

* String
* Array
* TypedArray
* Set
* Map

In order for an object to be iterable, it must implement the iterable interface(implement the @@iterator method), meaning that the object (or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator).
Symbol.iterator, is a zero arguments function that returns an iterator object. An iterator object is an object that conforms to the iterator protocol.

Whenever an object needs to be iterated (such as at the beginning of a for..of loop), its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.

The [**iterator protocol**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol) is used to define a standard way that an object produces a sequence of values, through implementing the `.next()` method.

The .next() method is a zero arguments function that returns an object with two properties:

* done (boolean)
Has the value `true` if the iterator **is past the end** of the iterated sequence. In this case value optionally specifies the return value of the iterator.
Has the value `false` if the iterator **was able to produce** the next value in the sequence. This is equivalent of not specifying the done property altogether.
* value - any JavaScript value returned by the iterator. Can be omitted when `done` is true.

WARNING: quiz 8.4 has a [mistake](https://discussions.udacity.com/t/mistake-in-course-materials-lesson-8-4-iterables/440705)

### 8.5 Sets

`Set` - a collection of distinct items, works as array, except that it is not index-based, items can not be accessed individually.
```javascript
const games = new Set(['0', 0]);
```

### 8.6 Modifying Sets

#### Methods:
* [add()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add)
* [delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete)
* [clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)

### 8.7 Working with Sets

`size` property gives the number of items in a Set.

#### Methods:
* [has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has)
* [values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) - returns an Iterator (in insertion order)

### 8.8 Sets & Iterators

Looping options:

* Use Set's iterator (values() or its alias keys() and then call next() on iterator's object)
* Use `for...of`
```javascript
for (const value of set) {
    console.log(value);
}
```

### 8.10 WeakSets

A WeakSet is just like a normal Set with a few key differences:

* can only contain objects
* is not iterable
* no .clear() method

Setting a reference to null on any object in a WeakSet makes it eligible for [garbage collection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Garbage_collection).

Usage: an efficient, lightweight solution for creating groups of objects.

Examples:

1. extending sealed objects (from this [stackoverflow](https://stackoverflow.com/questions/29413222/what-are-the-actual-uses-of-es6-weakmap)) 
Example:

> Let's say you're NodeJS and you have Promise objects - now you want to keep track of all the currently rejected promises - however you do not want to keep them from being garbage collected in case no references exist to them.

Solution: using WeakMap with Promise as a key and Promise associated state as a value.
And the real implementation can be seen [here](https://github.com/nodejs/node/pull/758).

2. making private data (from this [article](https://www.nczonline.net/blog/2014/01/21/private-instance-members-with-weakmaps-in-javascript/)) really private
```js
var Person = (function() {

    var privateData = new WeakMap();

    function Person(name) {
        privateData.set(this, { name: name });
    }

    Person.prototype.getName = function() {
        return privateData.get(this).name;
    };

    return Person;
}());
```

3. Caching computed results via WeakMaps (from [Exploring ES](https://leanpub.com/exploring-es6/) book)
Example is available [here](http://exploringjs.com/es6/ch_maps-sets.html#_caching-computed-results-via-weakmaps)

4. Managing listeners (from the same book)
Example is [here](http://exploringjs.com/es6/ch_maps-sets.html#_managing-listeners)


###8.13 Creating & Modifying Maps

 `Map` - stores key-value pairs, like objects contain named properties with values.
 
#### Create:
 
```javascript
const map = new Map();
```

 #### Modify methods:
* [set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set)
* [delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)
* [clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)

### 8.14 Working with Maps

Methods:

* [has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) to check if a key-value pair exists in a Map, passing a key
* [get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) to get a value by key

### 8.15 Looping Through Maps

Looping options:

* Use Map's iterator: call [keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) or [values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) and use next() to get the next key or value correspondingly
* Use `for...of` loop, in this case each element is an array of 2 elements: key, value.
```javascript
for (const [key, value] of map) {
    console.log(key, value);
}
```
* Use Map's [forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach)
```javascript
map.forEach((value, key) => console.log(key, value));
```

### 8.16 WeakMaps

A WeakMap is just like a normal Map with a few key differences:

* only Objects as keys
* is not iterable
* no clear() method

Setting a reference to null on any key object in a WeakMap makes it eligible for [garbage collection](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Garbage_collection).

Usage:  an efficient, lightweight solution for creating groupings of objects with metadata.
Examples:

1. tagging objects without changing them 
Example (from [Exploring ES](https://leanpub.com/exploring-es6/) book): [mark](http://exploringjs.com/es6/ch_proxies.html#sec_detect-proxies) objects that were created by a factory
2. [class branding](https://mail.mozilla.org/pipermail/es-discuss/2015-June/043027.html) (ensuring that class methods are only called on instances that were created by it)


### 8.18 Promises

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object representing the eventual completion or failure of an asynchronous operation.

#### Creating a Promise:

```javascript
const promise = new Promise( /* executor function*/ function(resolve, reject) {
  /*some asynchronous work*/
  /*if completed successfully - call resolve function with the result value*/
  /*if error - call reject function with error*/
  /*if error is thrown - promise is rejected, executor value is ignored*/
 } );
```

#### Getting a result of a Promise

Using [then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method:

```javascript
promise.then(function(value) {
  // handling promise fulfillment
}, function(reason) {
  // handling promise rejection
});
```

### 8.19 More Promises

Promises dedicated [Udacity corse](https://www.udacity.com/course/javascript-promises--ud898).

My [chained promises example](https://jsfiddle.net/dashik/eakwz7L2/).

### 8.20 Proxies into

Proxy lets one object to stand in for another object to handle all the interactions for that object.

### 8.21 Proxies

The [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object is used to define *custom behavior* for fundamental operations, e.g. property lookup, assignment, enumeration, function invocation, etc.
Target - a target object to proxy.
Handler - a placeholder object which contains *traps* (interceptors).
Traps -  methods that provide property access, traps define the behavior of the proxy when an operation is performed on it.

If no trap is specified for a particular operation, it is performed on the target object (pass trough proxy).

#### Create a Proxy:

```javascript
var proxy = new Proxy(target, handler);
```

### Traps

List:

* [the get trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get) - a trap for getting property values
* [the set trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set) - a trap for setting property values.
* [the apply trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply) - a trap for a *function call*
* [the has trap] - a trap for the [`in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) operator
* [the deleteProperty trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty) - a trap for the [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) operator.
* [the ownKeys trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys) - a trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
* [the construct trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct) - a trap for the `new` operator
* [the defineProperty trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty) - lets the proxy handle when defineProperty is used to create a new property on the object
* [the getOwnPropertyDescriptor trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor) - a trap for Object.getOwnPropertyDescriptor
* [the preventExtenions trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions) - a trap for Object.preventExtensions().
* [the isExtensible trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible) - a trap for [Object.isExtensible()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
* [the getPrototypeOf trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf) - a trap for [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
* [the setPrototypeOf trap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf) - a trap for [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).

### Validation proxy example (from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy))

```javascript
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  }
};

let person = new Proxy({}, validator);

person.age = 100;
console.log(person.age); // 100
person.age = 'old'; // Throws an exception
person.age = 300; // Throws an exception
```

### 8.22 Proxies vs. ES5 Getter/Setter

The [get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) syntax *binds an object property to a function* that will be called when that property is looked up.
The [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) syntax binds an object property to a function to be called when there is an attempt to set that property

With ES5's getter and setter methods, you need to know *before hand* the properties that are going to be get/set.
With ES6 Proxies, we do not need to know the properties beforehand, hence you do not need to initialize the object with getters/setters for each property when the object is initialized.

### 8.24 Generators

By default, JS functions are "run-to-completion". There is no way to stop the function.

Pausable Function or [Generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) (from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)):

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen(); // "Generator { }"
```

Calling a generator function does not execute its body immediately.

### 8.25 Generators & Iterators

When a generator function is invoked, it doesn't actually run any of the code inside the function. Instead, it creates and returns a [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) object.
Generator conforms to both the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable) and the [iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator).

[`yield`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield) is an keyword used to pause and resume a generator function.  It can be thought of as a generator-based version of the `return` keyword.
The yield keyword actually returns an IteratorResult object with two properties, `value` and `done`. The `value` property is the *result* of evaluating the yield expression, and `done` is false, indicating that the generator function has not fully completed.
Once paused on a `yield` expression, the generator's code execution remains paused until the generator's `next()` method is called.
`yield` can be used *only* inside a generator function.

### 8.26 Sending Data into/out of a Generator

We can send data into generator passing some data to next() function: `next(data)`. First we a getting the result of yield, then we can pass data into generator. Hence passing data to the *first* `next()` call *has no sense*.

```
data = yield <expression>;
```
expression - out, defines the value to return from the generator function via the iterator protocol (see 8.4). If omitted, `undefined` is returned instead.
data - in, data object/primitive passed to `next()` function, value is available when function is resumed.

Generators use cases:

* handling each item generator function produces on its own
* nested callbacks :
example taken from [here](https://modernweb.com/replacing-callbacks-with-es6-generators/)
```javascript
//delay function
function delay(time, callback) {
  setTimeout(function () {
    callback("Slept for "+time);
  }, time);
}

//nesting 2 delays
delay(1000, function(msg) {
  console.log(msg);
  delay(1200, function (msg) {
      console.log(msg);
    }
})

//replacing nesting with generator function and its run function


//run function which resumes generator function
function run(generatorFunction) {
    var generatorItr = generatorFunction(resume);
    function resume(callbackValue) {
        generatorItr.next(callbackValue);
    }
    generatorItr.next()
}

run(function* myDelayedMessages(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(1200, resume));
})

```
* [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
 Async function is like a generator function that is automatically wrapped in a runner (run function). Inside you can send out promises and the async function automatically wires them up to resume itself on completion: instead of `yield` we use `await`, which instructs the async function to *wait for the promise to complete* before proceeding.