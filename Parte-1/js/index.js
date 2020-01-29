function watchButton(){
	let submitForm = document.getElementById('js-search-form');
	submitForm.addEventListener('submit', (event)=>{
		event.preventDefault();
		let countryText = document.getElementById('query').value;
		let url = 'https://restcountries.eu/rest/v2/name/'+countryText;
		let settings = {
			method : "GET"
		}
		fetch(url, settings)
		.then((response)=>{
			if(response.ok){
				return response.json();
			} else {
				let maindiv = document.getElementById('divResults');
				maindiv.innerHTML="";
				let name = document.createElement("h1");
				name.innerHTML = "País no disponible";
				maindiv.appendChild(name);
				return {};
			}
		})
		.then((responseJSON) =>{
			if(responseJSON.length>0){
				displayResults(responseJSON);
			}
		});

	});
}

function displayResults(responseJSON){
	console.log(responseJSON[0].name)
	let maindiv = document.getElementById('divResults');
	maindiv.innerHTML="";
		let name = document.createElement("h1");
		name.innerHTML = responseJSON[0].name;
		maindiv.appendChild(name);
		let capital = document.createElement("h2");
		capital.innerHTML = "Capital: "+responseJSON[0].capital;
		maindiv.appendChild(capital);
		let flag = document.createElement("img");
		flag.src = responseJSON[0].flag;
		flag.style.display = "inline";
		maindiv.appendChild(flag);
		let population = document.createElement("h3");
		population.innerHTML = "Population: "+responseJSON[0].population;
		maindiv.appendChild(population);
		let region = document.createElement("h3");
		region.innerHTML = "Region: "+responseJSON[0].region;
		maindiv.appendChild(region);
		let timezones = document.createElement("h3");
		let i=0;
		timezones.innerHTML = "Timezones: "
		while(i<responseJSON[0].timezones.length){
			timezones.innerHTML = timezones.innerHTML+responseJSON[0].timezones[i] + ", ";
			i++;
		}
		maindiv.appendChild(timezones);
		let borders = document.createElement("h3");
		i=0;
		borders.innerHTML = "Borders: "
		while(i<responseJSON[0].borders.length){
			borders.innerHTML = borders.innerHTML+responseJSON[0].borders[i]+", ";
			i++;
		}
		maindiv.appendChild(borders);
}

function init(){
	watchButton();
}

init();