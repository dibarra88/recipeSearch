let recipe = document.getElementById("recipes");
let url = ""  //starter page
let currentPage = 1;

function setUpURL(){
    //set up the url before fetching
    let temp = document.getElementById("searchBox").value;
    if (temp.search(/[,]/g) !== -1) {
        url = "http://www.recipepuppy.com/api/?i=" + temp + "&p=" + currentPage;
    }
    else {
        url = "http://www.recipepuppy.com/api/?q=" + temp + "&p=" + currentPage;
    }
}
function fetchData() {

    fetch(url)
        // Data is fetched and we get a promise.
        .then(
        // The promise returns a response from the server.
        function (response) {
            // We process the response accordingly.
            if (response.status !== 200) {
                console.log(response.status);
                return;
            }
            response.json().then(function (data) {
                loadInfo(data);
            });
        }
        )
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

function loadInfo(data) {
    let recipeDiv = "";
    console.log(data)
    data.results.forEach(function (item) {
        recipeDiv += `<div class="rec">`;

        if (item.thumbnail === "") {
            recipeDiv += `<img src="./img/huh.jpg">`
        }
        else {
            recipeDiv += `<img src="${item.thumbnail}"></img>`
        }

        recipeDiv += `<div><a href="${item.href}">${item.title}</a></div></div>`
    });
    recipe.innerHTML = recipeDiv;
}
document.getElementById('search').addEventListener('click', function (e) {
    e.preventDefault()
    setUpURL();
    fetchData();
})

document.getElementById('pageButtons').addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target;
    if (target.id === "previous") {
        if (currentPage > 1) {
            currentPage = currentPage - 1;
        }
        setUpURL();
        fetchData();
    }
    else if (target.id === "next") {
        currentPage = currentPage + 1;
        setUpURL();
        fetchData();
    }
})
document.getElementById('searchBox').onkeypress=function(e){
    if(e.keyCode==13){
        document.getElementById('search').click();
    }
}
setUpURL();
fetchData();