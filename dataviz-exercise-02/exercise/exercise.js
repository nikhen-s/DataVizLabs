
/*
## Functions and iteration
To implement:

* isEven(value)
* apply isEven on [1, 2, 3, 4, 5]
* filter [1, 2, 3, 4, 5] by isEven

*/
const array1 = [1,2,3,4,5];

let isEven = (value) => {return value%2==0;};
let isOdd = (value) => {return value%2!=0;};

console.log(array1.map(isEven));

console.log(array1.filter(isEven));


console.log(array1.filter(isEven));

/*
### multiply
To implement:
* multiply, a function that accepts arbitrary number of parameters
* find a product of the following numbers: 1,2,3,4,5
* multiply(1,2,3,4,5) should return 120
*/
let multiply = (...numbers) => {
	let product = 1;
	for (const number of numbers){
		product*=number
	}
	return product;
};
let multiply2 = (...numbers) => {
	return numbers.reduce((a,b) => a*b);
}


console.log(multiply(...array1));
console.log(multiply2(...array1));

/*
## Closures

### divisibleBy
To implement:
* divisibleBy
* filter [0, 1, 2, 3, 4, 5, 6] by divisibleBy(3)
* In JS, functions maintain reference to variables 
that were in scope to it during its creation. (lexical environment)
*/
let divisibleBy = (divisor) => {
	return function (x){
		return (x%divisor == 0)
	}
}
console.log(array1.filter(divisibleBy(2)))

/*
### increment
To implement:
* increment
* initial value is 100, step size is 2, setting default values!
*/
let increment = (initialValue = 0) => {
	return function (stepSize = 1){
		return (initialValue+stepSize)
	}
}
let incrementThatSaves = (initialValue = -1) => {
	let initialVal = initialValue //it needs to keep a variable in the function to be accessible!
	return function (stepSize = 1){
		initialVal+=stepSize
		return initialVal
	}
}
let inc = incrementThatSaves()
console.log(inc())
console.log(inc())
console.log(inc())
/*
### colorCycle
To implement:
colorCycle(colors=COLOR_CYCLE_DEFAULT)
*/


const COLOR_CYCLE_DEFAULT = ['red', 'green', 'magenta', 'blue'];

let colorCycle = (colors = COLOR_CYCLE_DEFAULT) => {
	let counter = -1
	return function (){
		counter+=1
		return colors[counter%colors.length]
	}
}

console.log(colorCycle()())
console.log(colorCycle()())

const cc_r_g = colorCycle(['red', 'green']);
// This is a way to run 10 times, see the task about `range` below.
//Array(10) is an array of length 10. but it is empty.
//from takes the Array(10)
console.log('cycle red/green', Array.from(Array(10), cc_r_g));

const cc1 = colorCycle();
const cc2 = colorCycle();
console.log('cycle default', [cc1(), cc1(), cc2(), cc2(), cc1()]);

const my_cc = colorCycle(['red', 'orange', 'yellow', 'green','blue','indigo','violet']);
showColorCycle(my_cc);

/*
## Range

To implement:
* range
* filter range(100) by divisibility by 13
*/
let rangeWithInc = (n) =>{
	let inc = incrementThatSaves()
	return Array.from(Array(n),(_,index) => inc())
}
let rangeWithMap = (n) =>{
	let inc = incrementThatSaves()
	return Array.from(Array(n)).map((_, index, x) => index)
}

let range = (n) =>{
	return Array.from(Array(n),(_,index) => index)
}

console.log('range(10)', range(10));
console.log('rangeWithInc(10)', rangeWithInc(10));
console.log('divisibleBy13', range(100).filter(divisibleBy(13)))
// Expeceted result:
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



/*
To implement:
* Implement a function `randomInRange(min_val=0, max_val=100)` which returns a random float value between `min_val` and `max_val`.

* Implement a function `randomArray(N, min_val=0, max_val=100)` which generates an array of `N` random values between `min_val` and `max_val`.

*/

let generateRandomInteger = (min=0, max=100) => {
	return Math.floor(Math.random() * (max - min)) + min;
  };
	
console.log(generateRandomInteger(10,12));
let generateRandomArray = (N, min_val = 0, max_val = 100) => {
	return N.map(() => generateRandomInteger(min_val, max_val))
}
console.log(generateRandomArray(Array.from(Array(10)), 0, 100))
/*
## Counting

* Create a function `countOccurrences(string)` which counts the number of occurrences of each letter in a string.
	For example `countOccurrences("hello")` yields `{'h': 1, 'e': 1, 'l': 2, 'o': 1 }`.
*/
let countOccurrences = (str) => {
	let charCounts = {}
	let chars = Array.from(str)
	chars.forEach((char) => {
		charCounts[char] = (charCounts[char] || 0) + 1; //returns 0 if it's falsy
	})
	return charCounts
}

console.log(countOccurrences('hello'));
// Expected result:
// countOccurrences("hello") ---> {'h': 1, 'e': 1, 'l': 2, 'o': 1 }

/*
* Create the function `normalizeCounts` which takes the character counts outputted by `countOccurrences`,
	and calculates normalized counts - that is divided by the total sum.
	Please calculate the sum using [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).
	For example:
	`normalizeCounts({'h': 1, 'e': 1, 'l': 2, 'o': 1})` yields `{'h': 0.2, 'e': 0.2, 'l': 0.4, 'o': 0.2}`

* Create `countOccurencesNormalized` - a function which given a string, first applies `countOccurrences` and then normalizes the counts using `normalizeCounts`.

* Visualize the results by calling `setCharacterCountingFunction(countOccurencesNormalized);` - look at `index.html`, now you should be able to count the distribution
of characters in any text you input. You can pass a `colorCycle` with your colors as the second argument to color the bars.
*/
let normalizeCounts = (charCounts) => {
	let sum = Object.values(charCounts).reduce(((a,b) => a+b), 0)
	Object.keys(charCounts).forEach(
		(key) => 
		charCounts[key] /= sum
		)
	return charCounts
}

console.log(normalizeCounts(countOccurrences('hello')));
// Expected result:
// normalizeCounts({'h': 1, 'e': 1, 'l': 2, 'o': 1 }) ---> {'h': 0.2, 'e': 0.2, 'l': 0.4, 'o': 0.2 }

let countOccurencesNormalized = (str) => {
	return normalizeCounts(countOccurrences(str))
}
setCharacterCountingFunction(countOccurencesNormalized)

/*
## Throwing balls

We will simulate a ball thrown at angle $b$ with velocity $v_0$. The initial velocity $(v_x, v_y)$ is:

$$v_x = v_0 cos(b)$$
$$v_y = v_0 sin(b)$$

The position of the ball at time $t$ is given by:

$$x(t) = v_x * t$$
$$y(t) = v_y * t + (a * t^2 * 0.5)$$

where $a$ is the acceleration caused by gravity, usually -9.81 $m/s^2$.

Implement a function `simulateBall(v0, angle, num_steps, dt, g)` such that:

* `v0` is the magnitude of the initial velocity
* 'angle' is the inclination angle in degrees, multiply by `DEG_TO_RAD = Math.PI / 180.` to get radians for the trigonometric functions,
* `num_steps` is the number of steps of the simulation, the default value should be 256,
* `dt` is the time that advances between steps, default value 0.05,
* `g` is the acceleration, default value -9.81,
* it returns an array of ball positions at each time step,
* each position is given as a array `[x, y]`,

Use the `range` function to create the array of time points, then `map` them to the `[x, y]` values given by the equations above.
* We want to finish the plot when the ball hits the ground (y=0), so please filter the point array to remove points with y below 0.
* Visualize the ball trajectories using `plotBall` (the 2nd optional argument is the line color):
* Use `randomArray` to create 20 random angles between 0 deg and 90 deg, then plot the ball trajectories for each angle.
*/

const DEG_TO_RAD = Math.PI / 180.;


const ball_cc = colorCycle(['hsl(160, 100%, 64%)', 'hsl(200, 100%, 64%)', 'hsl(240, 100%, 64%)', 'hsl(120, 100%, 64%)', 'hsl(80, 100%, 64%)']);
plotBall(simulateBall(40, 60), ball_cc());
plotBall(simulateBall(40, 30), ball_cc());
plotBall(simulateBall(40, 45), ball_cc());
