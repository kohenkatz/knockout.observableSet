// Knockout Observable Set
// (c) Moshe Katz
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function () {
	ko.observableSet = function (initialValues) {
		if (typeof initialValues != 'object' || !('length' in initialValues))
			throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");

		if (initialValues instanceof Array) {
			initialValues = new Set(initialValues);
		} else if (! initialValues instanceof Set) {
			initialValues = new Set();
		}

		var result = ko.observable(initialValues);
		ko.utils.setPrototypeOfOrExtend(result, ko.observableSet['fn']);
		return result;
	};

	ko.observableSet['fn'] = {
		delete: function (valueOrPredicate) {
			let underlyingSet = this.peek();
			let found = false;
			let to_remove = null;

			// If it is a predicate, we need to do this the long way
			let is_predicate = (typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate));

			if (is_predicate) {
				for (let value of underlyingSet) {
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
				let to_remove = valueOrPredicate;
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
				let underlyingSet = this.peek();
				let allValues = this.keys();
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
				underlyingArray.add(value);
				this.valueHasMutated();
			}
			return this;
		},

		toArray: function() {
			var underlyingSet = this.peek();
			return [...underlyingSet];
		}
	}
})();
