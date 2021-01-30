// let app = document.getElementById("app");
// view.showComponents("mainPage");
// app.innerHTML = components.eachFilm


window.onload = initHandler;

function initHandler(){
  controller.initAuth();
}

// window.onload = initHandler;

// function initHandler(){
//   controller.initAuth();
// }




// for (let i = 0; i <= listFilms.length; i++) {
      //   let film = listFilms[i];
      //   let bookMarkButton = film.getElementsByClassName("film-bookmark")[0];
      //   bookMarkButton.addEventListener("click", function (e) {
      //     let btn = e.target;
      //     let filmContainer = btn.parentNode;
      //     let filmContainer2 = filmContainer.cloneNode(true)
      //     let listFilmBookMark = document.getElementById("list-film-bookmark")
      //     listFilmBookMark.appendChild(filmContainer2)
      //   })
      // }




// const apiKey = "4ed0cebb0e29c1bf16f16020ca8307af"
// const domain = "https://developers.themoviedb.org/3/"
// // `${domain}search/company?api_key=${apiKey}&query=thor&page=1
// //   `
// function searchFilm() {
//   let request = new XMLHttpRequest();
//   request.open('GET',"https://randomuser.me/api/",true)
//   request.onload = function () {
//     let data = JSON.parse(this.response)
//     if (request.status >= 200 && request.status < 400) {
//       console.log(data)
//     }
//     else{
//       console.log(error)
//     }
//   }
// }

// searchFilm()

// function loadDoc(url, cFunction) {
//   let xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       cFunction(xhttp.response);
//       console.log(xhttp.response)
//     }
//   };
//   xhttp.open("GET", url, true);
//   xhttp.send(null);
// }

// function myFunction1(xhttp) {
//   document.getElementById("search-output").innerHTML = xhttp.responseText;
// }

// let searchBtn = document.getElementById('search-button');
// searchBtn.addEventListener("click",loadDoc("https://randomuser.me/api", myFunction1));


// let searchBtn = document.getElementById("search-button")
// let formSearch = document.getElementById("form-search")
// formSearch.onsubmit = formSubmitHandler;

// function formSubmitHandler(e){
//   e.preventDefault();
//   searchName = formSearch.film.value
//   searchBtn.addEventListener("click", searchFilm(searchName))
// }









