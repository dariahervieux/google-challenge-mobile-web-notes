/*
 * Programming Quiz: Using the Rest Parameter (1-5)
 */

// your code goes here

function average(...numbers) {
    let avrg = 0;
    if(numbers && numbers.length > 0) {
        for (const number of numbers) {
            avrg += number; 
        }
        avrg = avrg / numbers.length;
    }
    return avrg;
}

console.log(average(2, 6));
console.log(average(2, 3, 3, 5, 7, 10));
console.log(average(7, 1432, 12, 13, 100));
console.log(average());