### 9.2 Old and New Browsers

Not all browser support ES6 features.

[Ecma International](https://www.ecma-international.org/) is an industry association that develops and oversees standards like JavaScript and JSON:
* https://en.wikipedia.org/wiki/Ecma_International
* http://www.ecma-international.org/memento/index.html

### 9.3 ES6 Specification

[ES6 specification](http://www.ecma-international.org/ecma-262/6.0/index.html) lists the set of rules and guidelines on how the language is supposed to function.
Developer resources:

* https://developer.mozilla.org/en-US/
* http://www.ecma-international.org/ecma-262/6.0/index.html


### 9.4 Supported Features

Status per browser:

* Google Chrome - https://www.chromestatus.com/features#ES6
* Microsoft Edge - https://developer.microsoft.com/en-us/microsoft-edge/platform/status/?q=ES6
* Mozilla Firefox - https://platform-status.mozilla.org/
* Webkit - https://webkit.org/status/

ECMAScript Compatibility Table built by [@kangax](https://twitter.com/kangax): http://kangax.github.io/compat-table/es6/

### 9.5 The Web is Eternal

Continue evolving with the Web: read specifications, tutorials, ...

### 9.6 Polyfills

Polyfills - a javascript file that "patches" a missing functionality in the browser by replicating it.

### 9.7 Using Polyfills

Initial term history invented by [Remy Sharp](https://twitter.com/rem), [source](https://remysharp.com/2010/10/08/what-is-a-polyfill).
simple example of Polyfill:
```javascript
if (!String.prototype.startsWith) { //check to avoid overriding native implementation
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
```

### 9.9 Other Uses for Polyfills

Examples for Polyfilled features:

* SVG
* Canvas
* Web Storage (local storage / session storage)
* Video
* HTML5 elements
* Accessibility
* Web Sockets

 A more complete list can be found in this [github repo](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills).
 
 ### 9.10 Transpiling
 
 *Compiling* - converting source language (like C++) into target language (machine code). Running code through compiler changes its level of abstraction: high human readable code => lower level language. 
 
 *Transpiling* - subset of compiling: converting the source code into a target code, which are *of the same level of abstraction*. For example ES6 => ES5.
 
### 9.11 Using Babel
 
 [Bablel](https://babeljs.io/) is the most popular JavaScript transpiler:  ES6 to ES5, JSX to JavaScript, and Flow to JavaScript.
 
 Babel [online transpiling](http://babeljs.io/repl).
 
Babel transforms code from one language to another through [plugins](http://babeljs.io/docs/plugins/).
Babel has [presets](http://babeljs.io/docs/plugins/#presets) which are groups of plugins bundled together.

### 9.12 Transpiling Walkthrough
 
 1. In package.json add NPM dependencies (plugins to download and install): 
 ```
 "devDependencies": {
    "babel-cli": "^6.16.0",
    "babel-preset-es2015": "^6.16.0"
}
```

2. Create .babelrc file. Installed babel-cli checks .babelrc file which contains Babel plugins and presents configuration.
 ```
{
    "presets": ["es2015"]
}
 ```
3. Add build script (in package.json) to run Babel with src and dest parameters:
```
"scripts": {
    "build": "babel ES6 -d ES5"
}
```
### 9.13 Transpiling Recap

Add transpiler to your project to use the latest JS features. When all features are supported natively, juste remove the transpiling step.
