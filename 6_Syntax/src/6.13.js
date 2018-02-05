/*
 * Programming Quiz: Writing a For...of Loop (1-4)
 */

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

for(const day of days) {
    console.log(day.charAt(0).toUpperCase() + day.substring(1));
}