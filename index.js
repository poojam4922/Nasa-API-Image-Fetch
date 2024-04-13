document.addEventListener("DOMContentLoaded",getCurrentImageOfTheDay)


function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().slice(0,10);
    const apiKey = `YLyU4A553CBl6Sra87Ld8NyPuVNhG61XibiD5eyG`;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) =>{
      const currentImageContainer = document.getElementById('current-image-container');
      !data ? "loading..." :
      (
        currentImageContainer.innerHTML = `
      <h1>Nasa Picture of the Day</h1>
      <img src ="${data.hdurl}" alt="${data.title}" class ="nasa-image"/>
      <h3>${data.title}</h3>
      <p>${data.explanation}</p>
      `
      )  
    })
    .catch((error) => console.log("Error : getCurrentImageOfTheDay  + ", error ));

}

let form = document.querySelector('form');
form.addEventListener('submit',(event) =>{
    event.preventDefault();
    let error = document.querySelector('.error');
    let date = document.getElementById('search-input').value;
    const currentDate = new Date().toISOString().slice(0,10);
   if(date > currentDate){
    error.innerText = "Invalid date selected"
   }

    getImageOfTheDay(date);
})

function getImageOfTheDay(date){
    const apiKey = `YLyU4A553CBl6Sra87Ld8NyPuVNhG61XibiD5eyG`;
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`; 
    fetch(url)
    .then((response) => response.json())
    .then((data) =>{
      const currentImageContainer = document.getElementById('current-image-container');
      currentImageContainer.innerHTML = `
      <h1>Nasa Picture of the Day</h1>
      <img src ="${data.hdurl}" alt="${data.title}" class ="nasa-image"/>
      <h3>${data.title}</h3>
      <p>${data.explanation}</p>
      `  
      saveSearch(date);
      addSearchToHistory(date);
    })
    .catch((error) => console.log("Error : getImageOfTheDay  + ", error ));
}

function saveSearch(date){
    const currentDate = new Date().toISOString().slice(0,10);
    if(date>currentDate){
        alert("Invalid date Selection.")
    } else {
        let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
    addSearchToHistory(date);
    }
    
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    
    // Check if the date already exists in the search history
    const existingItem = Array.from(searchHistory.querySelectorAll('.Itemlist')).find(item => item.textContent === date);
    console.log(existingItem, "history");
    
    if (!existingItem) { 
        const listItem = document.createElement('li');
        listItem.className = "Itemlist";
        
        const link = document.createElement('a');
        link.href = "#";
        link.textContent = date;
        
        listItem.addEventListener('click', function () {
            getImageOfTheDay(date);
        });    
        
        listItem.appendChild(link);
        searchHistory.appendChild(listItem);
    }
}