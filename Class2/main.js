// //main file
// import { square, diag } from 'lib';
// console.log(square(11)); // 121
// console.log(diag(4, 3)); // 5


const { reverse } = require("./reverse");

// Index 2 holds the first actual command-line argument
let argument = process.argv[2];

console.log(reverse(argument));