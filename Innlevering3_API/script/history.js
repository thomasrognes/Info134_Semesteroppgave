/**
* Skrevet av 100, 128, 170 
*/


window.onload=function(){
	generateHistory();
}

//Genererer innholdet på siden
function generateHistory(){
	var section = document.getElementById("history");
	var allMovies = movies_object;
	var numHistory = Math.floor((Math.random() * 20 ) + 4);
	var generated=0;

	while(generated<numHistory){		
		
		var randomMovie = Math.floor((Math.random() * highestID() ) + 1);
		if(allMovies[randomMovie]){
			section.appendChild(createMovie(allMovies[randomMovie]));
			generated++;
		}
	}

}