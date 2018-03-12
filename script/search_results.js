/**
* Skrevet av 100, 128, 170 
*/


/* Her kan dere implementere en søkefunksjon. For eksempel:
function search_for_X() {
}
*/

/* Her kan dere implementere en display function som viser resulatetene av søket. For eksempel:
function display_X() {
}
*/

window.onload = function() {
	query_params = get_query_string_parameters();
	search_results = movies_object;
	
	// Putter alle filmer inn i et array
	var results = new Array();
	for(movie in search_results){
			search_results[movie].sjanger = genres_object[movie];
			results.push(search_results[movie]);
		}


	//Søk for filmtiitel
	if (query_params.film_title){
        film_title = document.getElementById("filmtitle");
        film_title.innerHTML = query_params.film_title;
        for(var i=0; i<results.length;i++){
        	if(results[i].otitle.toUpperCase().includes(query_params.film_title.toUpperCase())){
        		createNode(results[i], "(Tittel)");

        	}
        }

    }
	//Søk for skuespiller
	if (query_params.actor) {
        actor = document.getElementById("actor");
		actor.innerHTML = query_params.actor;
		for(var i=0; i<results.length;i++){
			if(results[i].folk){
	        	if(results[i].folk.toUpperCase().includes(query_params.actor.toUpperCase())){
	        		console.log(results[i].folk.toUpperCase());
	        		createNode(results[i], "(Skuespiller)");

	        	}
        	}
        }

    }
	//Søk for regissør
	if (query_params.director) {
		director = document.getElementById("director");
		director.innerHTML = query_params.director;
		for(var i=0; i<results.length;i++){
			if(results[i].dir){
	        	if(results[i].dir.toUpperCase().includes(query_params.director.toUpperCase())){
	        		createNode(results[i], "(Regissør)");

	        	}
        	}
        }
    }
	//Søk for sjanger
	if (query_params.genre) {
        genre = document.getElementById("genre");
		for(var i=0; i<results.length;i++){
				if(results[i].sjanger && results[i].sjanger.includes(query_params.genre.toLowerCase())){
					createNode(results[i], " (Sjanger)");
				}
        	}

        }
    
    
	//Søk for land
	if (query_params.country) {
        country = document.getElementById("country");
		country.innerHTML = query_params.country;
		for(var i=0; i<results.length;i++){
        	if(results[i].country.toUpperCase().includes(query_params.country.toUpperCase())){
        		createNode(results[i], "(Land)");

        	}
        }
    }
	
	//Her kan dere for eksempel kalle en (display) funksjon som viser søkeresultater 
}

//Lager et punkt i listen, og legger ved grunn til treff på søk. F.eks: (Sjanger)
function createNode(movie, reason){
	const list = document.getElementById('res_list');
	var node = document.createElement("li");
    node.innerHTML = movie.otitle + " " + reason;

    const a = document.createElement("a");
	a.href= `show_movie.html?id=${movie.id}`;


	a.appendChild(node);
    list.appendChild(a);


}
