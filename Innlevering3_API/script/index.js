/**
* Skrevet av 100, 128, 170 
*/





//Kaller på funksjonene som utfyller index-siden
function load_content(){
	createNewest();
	createRecommended();
}



//Skriver ut de 10 filmene som har høyest ID i arkivet
function createNewest(){
	var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/", true);
    
    xhr.responseType = "json";

    xhr.onload = function(){
    movie_object = xhr.response.rows;
    

	const movieSection =  document.getElementById('newest');
	var movies = movie_object;
	var movieList = new Array();
	var highestID = new Array();
	
	// Legger alle movies i en Array
	for(movie in movies){
		movieList.push(movies[movie]);
	}

	//Sorterer arrayet. Fra høyest til lavest ID.
	movieList.sort(function(a,b){
		return parseFloat(b.id) - parseFloat(a.id);
	});

	//Skriver ut de 10 første filmene i arrayet etter de har blitt sortert.
	for(var i = 0; i<10; i++){
		var movieDone = createMovie(movieList[i]);
		movieSection.appendChild(movieDone);
	}
 }
 xhr.send();
}

// Skriver ut 10 tilfeldige filmer til Index siden.
function createRecommended(){
	var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/", true);
    
    xhr.responseType = "json";

    xhr.onload = function(){
    movie_object = xhr.response.rows;

	const movieSection =  document.getElementById('recommended');
	var movies = movie_object;
	var movieList = new Array();
	var number = Math.floor((Math.random() * highestID() ) + 1);
	var recommendedMovies = new Array();

	for(movie in movies){
		movieList.push(movies[movie]);
	}

	//Så lenge det ikke er laget 10 filmer enda, genereres en ny.
	while(recommendedMovies.length < 10){
		for(var i=0; i<10; i++){
			number = Math.floor((Math.random() * highestID() ) + 1);
			for(var i=0; i<movieList.length; i++){
				if(movieList[i].id == number){
					recommendedMovies.push(movieList[i]);
				}
			}
		}
	}

	for(var i=0; i<recommendedMovies.length; i++){
		var movieDone = createMovie(recommendedMovies[i]);
		recommended.appendChild(movieDone);
	}
}
xhr.send();
}


   