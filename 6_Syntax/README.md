### 6.2 Let and Const
#### var:
Before any JavaScript code is executed, all variables are "hoisted", i.e. raised to the top of the function scope:
```
function a(param) {
  if(param){var newVar = 'value';}
}
```
becomes
```
function a(param) {
  var newVar;
  if(param){ newVar = 'value';}
}
```
Variables declared with `var` are **scoped to the function**.
In ES6 using `var`is considered **bad practice**.

#### let and const:
Variables declared with `let` and `const` are **scoped to the block**.
[Temporal dead zone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) =  `let` and `const` variables can be **accessed** only **after they’ve been declared**, i.e. variables are in a "temporal dead zone" ([ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError) if tying to access) from the start of the block until their declaration is processed.

#### let: 
* can be **reassigned**, 
* **can’t be redeclared** in the same scope.

Use `let` when you plan to reassign new values to a variable.

#### const:
* **must be assigned an initial value**, 
* **can’t be redeclared** in the same scope, 
* **can’t be reassigned**.

Use `const` to declare a constant :).

### 6.4 Template Literals

[Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) are string literals allowing embedded expressions.

*TIP*: Embedded expressions inside template literals can do more than just reference variables. You can perform operations, call functions and use loops inside embedded expressions!

### 6.5 Quiz: Build an HTML Fragment (1-2)

*Hint*: templates keep formatting (idents)

### 6.6 Destructuring

The [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

[] - array destructuring, indexes are implied (starting from 0)
{} - object destructuring, variable name = object property name (can be of any type: primitive, object, function)

Destructuring = declaration and assignment at the same time

TIP: be carefu with `this` references when destructuring a function

#### undefuned and null destructuring

    const { prop: x } = undefined; // TypeError
    const { prop: y } = null; // TypeError`


As a consequence, you can use the empty object pattern {} to check whether a value is coercible to an object:

	({} = [true, false]); // OK, Arrays are coercible to objects
	({} = 'abc'); // OK, strings are coercible to objects

	({} = undefined); // TypeError
	({} = null); // TypeError

	let y = undefined;
	let {x} = y || {};


Online js book: http://exploringjs.com/es6/ch_destructuring.html

### 6.8 Object Literal Shorthand

Usage:
* you can remove duplicate variables names from object properties if the properties have the same name as the variables being assigned to them.
* for an anonymous function assigned to the property,the function keyword can be omitted

### 6.10 Iteration

ES6 interodices [iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols): interable and iterator.

New loop type:
`for..of` loops excusevely over *iterable* objects (an object that follows the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols))

### 6.11 Family of For Loops, 6.12 For...of Loop

Types:
* The `for loop i`: one needs to keep track of the counter and exit condition
* for...in loops: no counting logic and no tracking of exit condition, but we still need to use an index to access the values of an array; are discouraged when looping over arrays (because of any additional properties to the array's prototype)
* `Array.forEach()`: can only be used exclusively with arrays. There is also no way to stop or break a forEach loop.
* The `for...of` loop is the most recent addition to the family of for loops in JavaScript: we can iterate over the following types: String, Array, Map, and Set. Objects **are not iterable**, by default.

### 6.13 Quiz: Writing a For...of Loop (1-4)

*Hint*: String [methods](https://www.w3schools.com/js/js_string_methods.asp)

### 6.14 Spread... Operator

The [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) `...` gives you the ability to expand, or spread, iterable objects into multiple elements - **"unboxing"** all of the contents of the package.
Useful when:
* logging arrays;
* combining arrays:

    const fruits = ["apples", "bananas", "pears"];
    const vegetables = ["corn", "potatoes", "carrots"];
    const produce = [...fruits,...vegetables];`

### 6.15 ...Rest Parameter
The [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) `...` allows you to represent an indefinite number of elements as an array - taking all the contents and **putting them back** into the package.
Useful when:
* assigning the values of an array to variables:
    const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
    const [total, subtotal, tax, ...items] = order;
* implementing **variadic** functions - functions that take an **indefinite number of arguments**:
    function sum(...nums) {
        let total = 0;  
        for(const num of nums) {
            total += num;
        }
        return total;
    }

Rest parameters are [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) instances, so we can use Array methods directly (sort, map, forEach or pop )

### 6.16 Quiz: Using the Rest Parameter (1-5)

*Hint*: look at Array [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method.