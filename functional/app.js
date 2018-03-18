//JUST ANOTATIONS TO UNDERSTANT SOME CONCEPTS OF FUNCTIONAL PROGRAMMING
//Functions that operate on other functions, either by taking them as arguments or
//by returning them, are called higher-order functions.

//You can encapsulate a repeat action in a function 
const repeat = (max, action) => {
				for(let i = 0; i < max; i += 1) {
								action(i)
				}
}

//And use it to create something. Less code, more sintaxe
repeat(3, (i) => {
				console.log('Number:' , i );
})

//Some functions of Javascript 

//MAP
//Iterate over each item, should return the value to be append into new array
var numbers = [1, 2, 3];

var square = function(x) {
    return x * x;
};

var squaredNumbers = numbers.map(square); // [1, 4, 9]

//Other example
var students = [
    { name: 'Anna', grade: 6 },
    { name: 'John', grade: 4 },
    { name: 'Maria', grade: 9 }
];

var teachers = [
    { name: 'Mark', salary: 2500 },
    { name: 'Todd', salary: 3700 },
    { name: 'Angela', salary: 1900 }
];

var byName = function(object) {
    return object.name;
};

var byNames = function(list) {
    return list.map(byName);
};


//Filter
//Should return the expression to validate if the object can be append into array

var numbers = [1, 4, 7, 10];

//just return numbers bigger than four
var isBiggerThanFour = function(value) {
    return value > 4;
};

var numbersBiggerThanFour = numbers.filter(isBiggerThanFour); // [7, 10]


//Reduce
//Expect that a array of value should be reduce to one value

//Sum all value of an array
const numbers = [1, 2, 3];
const sum = (x, y) => x + y;
const numbersSum = numbers.reduce(sum, 0); // 6

//Currying
//That is the tecnic to transform a function that receive N parameters to a sequence of function that receive just one parameter
//That function
var add = function(x, y) {
   return x + y;
};

add(1, 2) // 3

//Transform to it
var add = function(x) {
    return function(y) {
        return x + y;
    };
};

add(1)(2); // 3

//Why is it better? it's because it is more expressive and resuable code.

//Compose
//You can compose function to great another function 
const compose = (f, g) => x => f(g(x));

const toUpperCase = x => x.toUpperCase();
const exclaim = x => x + '!';

const angry = compose(toUpperCase, exclaim);

angry('ahhh'); // AHHH!
