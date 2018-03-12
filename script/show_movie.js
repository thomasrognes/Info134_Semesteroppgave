/**
* Skrevet av 100, 128, 170 
*/


function panic(message) {
    // window.history.back();
    alert(message);
}

window.onload = function() {
    query_params = get_query_string_parameters();
    if (!query_params.id) {
        panic("No id given");
        return;
    }
    
    // get the movie_object from the "database" movies_object
    movie_object = movies_object[query_params.id];
    if (!movie_object) {
	panic("Could not retrieve movie_object!");
	return;
    }
    
    // get the genre info (if it exists)
    genre_object = genres_object[query_params.id];
    // get the review info (if it exists)
    review_object = reviews_object[query_params.id];
    
    
    // render page
    const imageURL = "https://nelson.uib.no/o/";
    // otitle
    var title_element = document.getElementById("otitle");
    title_element.innerHTML = movie_object["otitle"];

    //picture
    var picture_element = document.getElementById("thumbnail_movie");
    picture_element.src= imageURL + getFirstDigitOfId(query_params.id) + "/" + query_params.id + ".jpg";

    //info table
    var info_element = document.getElementById("movie_info");
        
        //creates duration line
        var row1 = document.createElement("tr");
        var th_duration = document.createElement("th");
            th_duration.innerHTML="Lengde: ";
        var duration =  document.createElement("td");
            duration.innerHTML = movie_object["length"] + " minutter";

        row1.appendChild(th_duration);
        row1.appendChild(duration);

        

        

        //Produksjonsår
        var row2 = document.createElement("tr");
        var th_year = document.createElement("th");
            th_year.innerHTML="År: ";
        var year = document.createElement("td");
            year.innerHTML = movie_object["year"];

        row2.appendChild(th_year);
        row2.appendChild(year);

        //Sjangerlinje
        var row3 = document.createElement("tr");
        var th_genre = document.createElement("th");
            th_genre.innerHTML="Sjanger: ";
        var genre = document.createElement("td");   
            genre.innerHTML = "";
           
            for(var i = 0; i<genre_object.length;i++){
                genre.innerHTML+=genre_object[i].charAt(0).toUpperCase() + genre_object[i].slice(1);
                if(i+1 == genre_object.length){

                }
                else{
                    genre.innerHTML+=", ";
                }
            }

            row3.appendChild(th_genre);
            row3.appendChild(genre);
        
        //Regissørlinje
        var row4 = document.createElement("tr");
        var th_dir = document.createElement("th");
            th_dir.innerHTML = "Regissør: ";
        
        var dir = document.createElement("td");
            dir.innerHTML= movie_object["dir"];
            var dirlink = document.createElement("a");
        if(dir.innerHTML!=""){
            dirlink.href= "search_results.html?film_title=&actor=&director="+ movie_object["dir"]+ "&genre=&country=";
        }
        else{
            dir.innerHTML="Ukjent";
        }
        dirlink.appendChild(dir);

            row4.appendChild(th_dir);
            row4.appendChild(dirlink);

        //Gjennomsnittlig rating
        var row5 = document.createElement("tr");
        var th_avg = document.createElement("th");
            th_avg.innerHTML="Rating: ";

        var avg = document.createElement("td");
            avg.innerHTML = calculateRating(movie_object["id"]);

            row5.appendChild(th_avg);
            row5.appendChild(avg);
        //Fyller tabellen
        info_element.appendChild(row1);
        info_element.appendChild(row2);
        info_element.appendChild(row3);
        info_element.appendChild(row4);
        info_element.appendChild(row5);


        //Filmbeskrivelsen
        var description_element = document.getElementById("description");
        if(movie_object["description"]){
            description_element.innerHTML = movie_object["description"];
        }
        else{
            description_element.innerHTML = "Ingen beskrivelse tilgjengelig..";
        }

        //Youtube-trailer
        if(movie_object['youtube trailer id']==""){
            var noTrailer = document.createElement("p");
            noTrailer.innerHTML="Ingen trailer tilgjengelig..";
            document.getElementById("trailer").appendChild(noTrailer);
        }
        else{
            var trailerBox = document.createElement("iframe");
                trailerBox.src = "https://www.youtube.com/embed/" + movie_object['youtube trailer id'];
                trailerBox.width = "420";
                trailerBox.height = "315";
                trailerBox.id = "trailerBox";
                document.getElementById("trailer").appendChild(trailerBox);        }


        var review = document.getElementById("review");
        review.innerHTML = loadReview(query_params.id);

        //Setter filmbeskrivelsen til å vises som default.
        togglePanels("description");
}

//Henter annmeldelsen for en film basert på ID. Returneres som tekststreng.
function loadReview(id){
    var allReviews = reviews_object[id];
    var reviewsArray = new Array();
    var textReview ="";

    if(!allReviews){
        return "Ingen annmeldelser funnet..";
    }

    
    for(review in allReviews){
            textReview += "User: " + allReviews[review].username+ "<br>"; 
            textReview += "Rating: " + allReviews[review].rating;
            if(allReviews[review].comment != ""){
                textReview+= "<br>" + "Comment: " + allReviews[review].comment;
            }
            textReview+= "<div class ='sexy_line_comments'></div>";

            
        

    }
    return textReview;
}


// Funksjon som styrer hvilket panel som er aktivt på filmsiden.
function togglePanels(a){
    var curr = document.getElementById("current_tab");
    var desc = document.getElementById("description");
    var rev = document.getElementById("review");
    var feedback = document.getElementById("feedback");
    var trailer = document.getElementById("trailer");
    var temp = document.getElementById("temp_tab");
    var desc_tab = document.getElementById("desc_tab");
    var rev_tab = document.getElementById("rev_tab");
    var trailer_tab = document.getElementById("trailer_tab");
    var feedback_tab = document.getElementById("feedback_tab");

    //Hvis bruker vil se filmbeskrivelse
    if(a=="description"){
        resetCurrent();
        
        setTimeout(function(){
            showCurrent();
        }, 300);
        
        setTimeout(function(){
            showDescription();
        },350)
        
    }
    //Hvis bruker vil se filmtrailer
    else if(a=="trailer"){
        resetCurrent();
        
        setTimeout(function(){
             showCurrent();
        }, 300);
        
        setTimeout(function(){
            showTrailer();
        },350)
        
    }
    //Hvis bruker vil se tilbakemeldingsskjema
    else if(a=="feedback"){
        resetCurrent();
        
        setTimeout(function(){
            showCurrent();
        }, 300);
        
        setTimeout(function(){
            showFeedback();
        },350)
    }
    //Hvis bruker vil se filmannmeldelser
    else {
        resetCurrent();
       
        setTimeout(function(){
            showCurrent();
        }, 300); 
       
        setTimeout(function(){
            showReviews();
        }, 350);
    }
    
    //Viser filmbeskrivelse
    function showDescription(){
        desc_tab.style.color ="white";
        rev_tab.style.color ="#EAC67A";
        feedback_tab.style.color= "#EAC67A";
        trailer_tab.style.color="#EAC67A";
        curr.appendChild(desc);
        temp.appendChild(rev);
        temp.appendChild(trailer);
        temp.appendChild(feedback);
        rev.style.visibility="hidden";
        trailer.style.visibility="hidden";
        desc.style.visibility="visible";
        feedback.style.visibility="hidden";

    }
    //Viser filmannmeldelser
    function showReviews(){
       desc_tab.style.color ="#EAC67A";
       trailer_tab.style.color="#EAC67A";
       feedback_tab.style.color= "#EAC67A";
       rev_tab.style.color ="white";
       curr.appendChild(rev);
       temp.appendChild(desc);
       temp.appendChild(trailer);
       temp.appendChild(feedback);
       rev.style.visibility="visible";
       desc.style.visibility="hidden";
       trailer.style.visibility="hidden";
       feedback.style.visibility="hidden";
       
    }
    //Viser filmtrailer
    function showTrailer(){
        desc_tab.style.color ="#EAC67A";
        rev_tab.style.color ="#EAC67A";
        trailer_tab.style.color="white";
        feedback_tab.style.color= "#EAC67A";
        curr.appendChild(trailer);
        temp.appendChild(rev);
        temp.appendChild(feedback)
        temp.appendChild(desc);
        trailer.style.visibility="visible";
        rev.style.visibility="hidden";
        desc.style.visibility="hidden";
       feedback.style.visibility="hidden";

    }
     //Viser tilbakemeldings-skjema
     function showFeedback(){
        feedback_tab.style.color ="white";
        desc_tab.style.color ="#EAC67A";
        rev_tab.style.color ="#EAC67A";
        trailer_tab.style.color="#EAC67A";
        curr.appendChild(feedback);
        temp.appendChild(trailer);
        temp.appendChild(rev);
        temp.appendChild(desc);
        rev.style.visibility="hidden";
        desc.style.visibility="hidden";
        trailer.style.visibility="hidden";
        feedback.style.visibility="visible";
    }

    function resetCurrent(){
        curr.style.width="0";
    }
    function showCurrent(){
        curr.style.width="100%";
    }
}

//Regner ut gjennomsnittsrating
function calculateRating(movieID){
    var allReviews = reviews_object[movieID];
    var avgRating = 0;
    numberOfReviews = 0;
    
    for(review in allReviews){
        
            if(allReviews[review].rating != null){
                avgRating+=allReviews[review].rating;  
                numberOfReviews++;         
            }
    }

    if(numberOfReviews==0){
        numberOfReviews++;
    }

    if(avgRating / numberOfReviews == 0 ){
        return "Ingen rating funnet";
    }
    else{
        var avg = avgRating / numberOfReviews;
        var rounded = Math.round(avg*10)/10;
        return rounded;
    }
    
}