// event for search Button
document.getElementById('searchBtn').addEventListener('click', function () {
    let searchItem = document.getElementById('searchItem').value;
    searchMethod(searchItem);
});

// function for searchItem
function searchMethod(searchItem) {
    fetch(`https://api.lyrics.ovh/suggest/${searchItem}`)
        .then(res => res.json())
        .then(data => {
            display(data);
            getData(data);
        })
}

// globar variable
let title;
let artist;

// display 10 songs name that are matching with the searchItem and recovering from database 
function display(responseFromServer) {
    let songName = document.getElementById('songName');
    songName.style.visibility = "visible";
    let html = "";
    document.getElementById('showLyrics').innerHTML = "";
    for (let index = 0; index < 10; index++) {
        title = responseFromServer.data[index].title;
        artist = responseFromServer.data[index].artist.name;
        html += `<div class="single-result row align-items-center my-3 p-3">
                     <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album by <span>${artist}</span></p>
                     </div>
                     <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick="displayLyrics(${index});">Get Lyrics</button>
                     </div>
                </div>`
    }
    songName.innerHTML = html;
}
// global variable
let responseFromServer;
// function for get the data
function getData(data) {
    responseFromServer = data;
}
// display the lyrics
function displayLyrics(index) {
    title = responseFromServer.data[index].title;
    artist = responseFromServer.data[index].artist.name;
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('songName').style.visibility = "hidden";
            if (data == null) document.getElementById('showLyrics').innerHTML = "No lyrics in the database!...We are very Sorry...!";
            else document.getElementById('showLyrics').innerHTML = data.lyrics;
        })
}