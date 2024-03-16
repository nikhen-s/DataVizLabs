
/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25,16];

function writeTheTemperatures(){
	console.log("The button was clicked");
	showTemperatures(document.getElementById("weather-part1"), TEST_TEMPERATURES)
}

let showTemperatures = (container_element, temperature_array) => {
	container_element.innerHTML = "";
	temperature_array.forEach((temperature) => {
		const newP = document.createElement("p")
		if (temperature <= 17){
			newP.classList.add('cold')
		} else if (temperature >= 23){
			newP.classList.add('warm')
		}

		const newContent = document.createTextNode(temperature.toString())
		newP.appendChild(newContent)
		container_element.appendChild(newP)
	})
}
// Part 1 - DOM

whenDocumentLoaded(() => {
	// Part 1.1: Find the button + on click event
	const btn = document.getElementById('btn-part1');

	btn.addEventListener('click', () => {
		console.log('The button was clicked');
	});

	// Part 1.2: Write temperatures
	const div_output = document.getElementById('weather-part1');

	btn.addEventListener('click', () => {
		showTemperatures(div_output, TEST_TEMPERATURES);
	});
});

// Part 2 - class

class Forecast {
	constructor(container){
		this.container = container
		this.temperatures = [1,2,3,4,5,6,7]
	}

	toString(){
		return 'Forecast(temp=' + this.temperatures.toString() + ', container=' + this.container.toString() + ')';
	}
	print(){
		console.log(this.toString()) //specify the toString method in this class!
	}
	show() {
		this.container.innerHTML = "";
		this.temperatures.forEach((temperature) => {
			const newP = document.createElement("p")
			if (temperature <= 17){
				newP.classList.add('cold')
			} else if (temperature >= 23){
				newP.classList.add('warm')
			}
			const newContent = document.createTextNode(temperature.toString())
			newP.appendChild(newContent)
			this.container.appendChild(newP)
		});
	}
	reload(){
		this.temperatures = TEST_TEMPERATURES;
		this.show();
	}
}
whenDocumentLoaded(() => {
	// Part 1.1: Find the button + on click event
	const button = document.getElementById("btn-part1")
	//document.getElementById("btn-part1").addEventListener("click",writeTheTemperatures)
	// Part 1.2: Write temperatures
	const div = document.getElementById("weather-part1")
	const forecast = new Forecast(div)
	forecast.print()
	button.addEventListener('click',() => {forecast.reload()}) //forecast.reload is function reference, not calling from an object!
});
// Part 3 - fetch

const QUERY_LAUSANNE = 'http://api.weatherbit.io/v2.0/forecast/daily?city=Lausanne&days=7&key=ed330abe3f5a4104afd9a6ef10b707ca';

function weatherbitToTemperatures(data) {
	
}

class ForecastOnline extends Forecast {
	reload() {
		fetch(QUERY_LAUSANNE)
			.then((response) => {
				return response.json()
			})
		
		//this.temperatures = [2,3,4,5,6,7,8];

		//this.show()
	}
}

whenDocumentLoaded(() => {
	// Part 1.1: Find the button + on click event
	const button = document.getElementById("btn-part1")
	//document.getElementById("btn-part1").addEventListener("click",writeTheTemperatures)
	// Part 1.2: Write temperatures
	const div = document.getElementById("weather-part1")
	const forecast2 = new ForecastOnline(div)
	forecast2.print()
	button.addEventListener('click',() => {forecast2.reload()}) //forecast.reload is function reference, not calling from an object!
});
// Part 4 - interactive

