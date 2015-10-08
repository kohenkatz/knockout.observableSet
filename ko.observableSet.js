// Knockout Observable Set
// (c) Moshe Katz
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function () {
	'use strict';

	ko.observableSet = function (initialValues) {
		if (typeof initialValues != 'object' || !('length' in initialValues))
			throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");

		if (initialValues instanceof Array) {
			initialValues = new Set(initialValues);
		} else if (! initialValues instanceof Set) {
			initialValues = new Set();
		}

		var result = ko.observable(initialValues);
		ko.utils.extend(result, ko.observableSet['fn']);
		return result;
	};

	ko.observableSet['fn'] = {
		delete: function (valueOrPredicate) {
			var underlyingSet = this.peek();
			var found = false;
			var to_remove = null;

			// If it is a predicate, we need to do this the long way
			var is_predicate = (typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate));

			if (is_predicate) {
				for (var value of underlyingSet) {
					if (underlyingSet.has(predicate(value))) {
						found = true;
						to_remove = value;
						break;
					}
				}
				if (found) {
					underlyingSet.delete(to_remove);
				}
			} else {
				to_remove = valueOrPredicate;
				found = underlyingSet.delete(to_remove);
			}

			if (found) {
				this.valueHasMutated();
			}
			return to_remove;
		},

		deleteAll: function (arrayOfValues) {
			// If you passed zero args, we remove everything
			if (arrayOfValues === undefined) {
				var underlyingSet = this.peek();
				var allValues = this.keys();
				this.valueWillMutate();
				underlyingSet.clear();
				this.valueHasMutated();
				return allValues;
			}
			// If you passed an arg, we interpret it as an array of entries to remove
			if (!arrayOfValues)
				return [];
			return this['remove'](function (value) {
				return arrayOfValues.includes(value);
			});
		},

		has: function (value) {
			let underlyingSet = this.peek();
			return underlyingSet.has(value);
		},

		add: function (value) {
			var underlyingSet = this.peek();
			if (!underlyingSet.has(value)) {
				this.valueWillMutate();
				underlyingSet.add(value);
				this.valueHasMutated();
			}
			return this;
		},

		toArray: function() {
			var underlyingSet = this.peek();
			return [...underlyingSet];
		},
		
		// Because Knockout's `foreach` binding explicitly only works with
		// arrays, we need to pretend that we are an array
		asObservableArray: function() {
			return ko.computed(function() {
				return [...this.call()];
			}, this)
		},
	}
})();
