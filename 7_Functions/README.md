### 7.2 Arrow functions, 7.3 Using array functions

Arrow functions are only expressions, there's no such thing as an arrow function declaration.

Arrow function expressions can only be used where an expression is valid.
This includes:

* arrow function stored in a **variable**,
* arrow function passed as an **argument to a function**,
* arrow function stored in an **object's property**.

WARNING: expressions only, be careful with **this** keyword usage.

### 7.6 Arrow functions and "this" keyword

The value of `this` depends:

* **Regular** functions:  on **how** the function is called
* **Arrow** function:  on **where** it is located in the case

### 7.7 "this" and Regular Functions

 `this` refers to one of the following:
 1. inside a constructor ( `new` ) - new instance
 2. [`call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)/[`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) - the instance specified as the first parameter
 3. inside a function called on an instance - the instance on which the function as called
 4. inside a function called with no context - the global object or, if in strict mode, it's `undefined`.
 
### 7.8 "this" and Arrow Functions
 
 The value of this is based on the function's surrounding context.
 The value of `this` **inside** an arrow function **is the same** as the value of `this` **outside** the function.
 
### 7.9 Default Function Parameters

Syntax:

	function <name>(param1 = <param1-default-value>, param2 = <param1-default-value>) {...}
  
### 7.10 Defaults and Destructuring
  
Defaults and destructuring arrays example:
  
	function <name>([elem1 = <elem1-default-value>, elem2 = <elem2-default-value>] = [])
	
Defaults and destructuring objects:

	function <name>({property1 = <property1-default-value>, property2 = <property2-default-value>} = {}) {...}
	
	
**Object defaults** with object destructuring **are preferable** over arrays defaults with array destructuring, since arrays are position based and we need to explicitly pass `undefined` for default element value to be accepted.

### 7.11 Quiz: Using Default Function Parameters (2-2)

*Hint*: template literals and object destructuring

### 7.13 JavaScript's Illusion of Classes

JavaScript **is NOT** a class-based language.

    Class = regular function
    Inheritance = prototypal inheritance

### 7.14 JavaScript classes

ES5 classes:
  *  the constructor function is called with the `new` keyword
  *  the constructor function, by convention, starts with a capital letter
  *  the constructor function controls the setting of data on the objects that will be created
  *  "inherited" methods are placed on the constructor function's prototype object


ES6 intoduced keywords: `class`, `super`, `extends`, `static`

### 7.15 Convert a Function to a Class

The constructor function contents (along with function parameters) moves to `constuctor()` method inside the class definition.
Methods attached to the function prototype move inside the class definition.

### 7.16 Working with JavaScript Classes

	class Plane { .. }
	typeof Plane; // gives 'function'

ATTENTION:

* No commas to separate properties or methods in a Class
* Using classes requires the use of `new`

To add static method use `static`keyword before the name of a method.

### 7.17 Super and Extends

`extends` keyword: used to make one class inherit from another
`super`keyword:
 
* as a method = used to call parent's class contructor
* as an object = used to access parent's class properties/methods

### 7.19 Working with JavaScript Subclasses  

In a subclass contructor `super` must be called before `this`

### 7.20 Quiz: Building Classes and Subclasses (2-3)

*Hint*: Bicycle is Vehicle, so it can have exactly the same constructor, just with another default values.
