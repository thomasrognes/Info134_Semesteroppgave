/**
* Skrevet av 100, 128, 170 
*/


//Første tall i filmens ID
function getFirstDigitOfId(id) {
    if(id < 1000) {
        return 0;
    }
    return id.toString().substring(0,1);       
}

function getTotalMovies(b){
	var number = 0;
	for(movie in b){
		number++;
	}
	return number;

}

//Åpner/lukker meny, basert på nåverende tilstand.
function toggleMenu(){
	if(document.getElementById("mySidenav").style.width > "0px"){
		closeNav();
	}
	else{
		openNav();
	}
}
//Åpner menyen
function openNav(){
	
	if (matchMedia('only screen and (max-width: 480px)').matches) {
  		document.getElementById("mySidenav").style.width = "30%";
		document.getElementById("page_content").style.marginLeft="40%";
	}
	else if(matchMedia('only screen and (max-width: 1060px)').matches){
		document.getElementById("mySidenav").style.width = "25%";
		document.getElementById("page_content").style.marginLeft="25%";
	}
	else if(matchMedia('only screen and (max-width: 1800px)').matches){
		document.getElementById("mySidenav").style.width = "15%";
		document.getElementById("page_content").style.marginLeft= "5%";
	}
	else{ 
		document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("page_content").style.marginLeft="250px";
	}
}
//Lukker menyen
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    if (matchMedia('only screen and (max-width: 480px)').matches) {
  		document.getElementById("page_content").style.marginLeft="0%";
	}
	else if(matchMedia('only screen and (max-width: 1060px)').matches){
		document.getElementById("page_content").style.marginLeft="0%";
	}
	else if(matchMedia('only screen and (max-width: 1800px)').matches){
		document.getElementById("page_content").style.marginLeft="0%";
	}
	else{  
	 	document.getElementById("page_content").style.marginLeft="15%";
	}
}

//Funksjon som lager en film-seksjon for hver film som skrives til Index.
function createMovie(movie){
	const imageURL = "https://nelson.uib.no/o/";

	const section = document.createElement("section");
	section.classList.add("movies");

	const a = document.createElement("a");
	a.href= `show_movie.html?id=${movie.id}`;

	const pic = document.createElement("img");
	pic.classList.add("thumbnails_frontpage");
	pic.setAttribute("src",imageURL+ getFirstDigitOfId(movie.id)+"/"+ movie.id + ".jpg");
	
	a.appendChild(pic);

	const title = document.createElement("h1");
	title.classList.add("movie_titles");
	title.innerHTML = movie.otitle;


	const breakline = document.createElement("br");

	section.appendChild(a);
	section.appendChild(title);
	section.appendChild(breakline);
	section.appendChild(breakline);


	return section;
}

// Finner den høyeste ID'en som finnes i arkivet
function highestID(){
	var movies = movies_object;
	var movieList = new Array();
	for(movie in movies){
		movieList.push(movies[movie]);
	}

	//Sorterer arrayet. Fra høyest til lavest ID.
	movieList.sort(function(a,b){
		return parseFloat(b.id) - parseFloat(a.id);
	});

	//Returnerer den høyeste id'en.
	return movieList[0].id;
}

//Logger deg ut av siden
function logOut(){
	alert("Du er nå logget ut.");
	tekst = document.getElementById("brukertekst");
	tekst.style.visibility = "hidden";
}