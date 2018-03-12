/**
* Skrevet av 100, 128, 170 
*/


var b = document.getElementById("knapp");
b.addEventListener("click",addToDo)

movies = movies_object;
var results = new Array();

for(movie in movies){
		results.push(movies[movie]);
	}


// Legger til et punkt i listen
function addToDo(e){
	e.preventDefault();
	var foundMovie=false;
	var input = document.getElementById("input-text").value;
	console.log(input);
	for(var i=0; i<results.length; i++){
		//Hvis brukerinput tilsvarer en filmtittel i arkivet
		if(input.toUpperCase() == results[i].otitle.toUpperCase()){
			var ul = document.getElementById("reminderList");
			var a = document.createElement("a");
			a.href = "show_movie.html?id=" + results[i].id;
			var li = document.createElement("li");
			li.setAttribute("onClick", "finished(this)");
			li.appendChild(document.createTextNode(input));
			li.innerHTML += " (Finnes i database, trykk her!)";
			a.appendChild(li);
			ul.appendChild(a);
			document.getElementById("input-text").value="";
			foundMovie=true;;

		}
	}
	//Hvis brukerinput ikke tilsvarer en filmtittel.
		if(!foundMovie){
		var ul = document.getElementById("reminderList");
		var li = document.createElement("li");
		li.setAttribute("onClick", "finished(this)");
		li.appendChild(document.createTextNode(input));
		ul.appendChild(li);
		document.getElementById("input-text").value="";
		}

	
}

var c = document.getElementById("remove_button");
c.addEventListener("click", removeAll);

//Tømmer ønskelisten
function removeAll(){
	var list = document.getElementById("reminderList");
	list.innerHTML="";

}

// Endrer farge og legger line-through på punkt i listen om man trykker på det.
function finished(a){

	if(a.style.color == "red"){
		a.style.color = "#EAC67A";
		a.style["text-decoration"] = "none";
	}
	else{
		a.style.color = "red";
		a.style["text-decoration"] = "line-through";
	}
	
}