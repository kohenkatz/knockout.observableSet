# knockout.observableSet
Observable Set object for Knockout JS. Inspired by https://github.com/jamesfoster/knockout.observableDictionary

## How to use

**This library requires a browser that supports JavaScript `Set` objects.** (See the [Browser Compatibility Tables](http://kangax.github.io/compat-table/es6/#test-Set) and the [MDN Browser Compatibility Chart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Browser_compatibility) for more information)

    <script src="http://knockoutjs.com/downloads/knockout-3.3.0.js"></script>
    <script src="ko.observableSet.js"></script>

The following sample code is based on [example uses of `Set` from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Examples)

```
var mySet = new ko.observableSet();

mySet.add(1);
mySet.add(5);
mySet.add("some text");
var o = {a: 1, b: 2};
mySet.add(o);

mySet.has(1); // true
mySet.has(3); // false, 3 has not been added to the set
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

// Just like calls to get the `length` of an `observableArray` must evaluate the
// observable, calls to get the `size` of an `observableSet` must do the same.
mySet().size; // 4

mySet.delete(5); // removes 5 from the set
mySet.has(5);    // false, 5 has been removed

mySet().size; // 3, we just removed one value
```
