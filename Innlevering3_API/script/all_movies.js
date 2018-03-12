/**
* Skrevet av 100, 128, 170 
*/

window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/", true);
    xhr.responseType = "json";
    xhr.onload = function(){
    movie_object = xhr.response.rows;
    
        list_element = document.getElementById("all_movies");
    for (movie_id in movie_object){
        movie_details = movie_object[movie_id];
        list_item = document.createElement("LI");

    // Lager linken til filmsiden
        item_link = document.createElement("A");
        item_link.href = "show_movie.html?id=" + movie_object[movie_id].id;
        link_text = document.createTextNode(movie_details["otitle"]);
        item_link.appendChild(link_text);
    
        list_item.appendChild(item_link);
        list_element.appendChild(list_item);      
    }
    
    };
    xhr.send();
}
