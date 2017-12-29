const james = {
    name: 'James',
    height: `5'10"`,
    weight: 185,
    [Symbol.iterator]() {
        let KEYS = Object.keys(this);
        let currentIndex = 0;
        let obj = this;
        return {
          next: () => {
            if (currentIndex < KEYS.length) {
                let keyV = KEYS[currentIndex++];
                let valueV = obj[keyV];
				return {value: obj[keyV],key: keyV,done: false};
            }
			return {done: true};
          }
        }
    }
};

 const iterator = james[Symbol.iterator]();

 console.log(iterator.next()); // 'James'
 console.log(iterator.next()); // `5'10`
 console.log(iterator.next()); // 185