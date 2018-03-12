/**
* Skrevet av 100, 128, 170 
*/


window.onload=function(){
	generateHistory();
}

//Genererer innholdet på siden
function generateHistory(){
	var history = history_object;
	var list = document.getElementById("history");
	for(movie in history){
		history_link = document.createElement("A");
       	history_link.href = "show_movie.html?id=" + movie;

		var node = document.createElement("li");
		node.innerHTML = history[movie];

		history_link.appendChild(node);
		list.appendChild(history_link);
	}

}

