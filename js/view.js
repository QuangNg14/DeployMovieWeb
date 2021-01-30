const view = {

}

view.showComponents = function (name) {
  switch (name) {
    case "login": {
      document.getElementById("app").innerHTML = components.login
      let form = document.getElementById("form-login")

      let link = document.getElementById("register-form-link");
      // link.onclick = linkClickHandler
      link.addEventListener("click", linkClickHandler);
      // 1 dạng callback cứ khai báo hàm ra khi nào chạy thì gọi  

      function linkClickHandler() {
        view.showComponents("register");
      }

      form.onsubmit = formSubmitHandler
      function formSubmitHandler(e) {
        e.preventDefault()
        let loginInfo = {
          email: form.email.value,
          password: form.password.value
        }
        if (loginInfo.email) {
          view.setText("email_error", " ")
        }
        else {
          view.setText("email_error", "Invalid Email")
        }

        if (loginInfo.password) {
          view.setText("email_error", " ")
        }
        else {
          view.setText("password_error", "Invalid Password")
        }

        if (loginInfo.email && loginInfo.password) {
          controller.login(loginInfo)
        }
      }

      break
    }
    case "register": {
      document.getElementById("app").innerHTML = components.register

      let loginLink = document.getElementById("register-form-link")
      loginLink.addEventListener("click", formOnClickHandler)
      function formOnClickHandler() {
        view.showComponents("login")
      }

      let registerForm = document.getElementById("form-register")
      registerForm.onsubmit = registerFormSubmitHandler
      function registerFormSubmitHandler(e) {
        e.preventDefault()
        let registerInfo = {
          firstname: registerForm.firstname.value,
          lastname: registerForm.lastname.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value
        }

        // model.displayName = registerInfo.firstname + " " + registerInfo.lastname
        let userInfo = ["firstname", "lastname", "email", "password"];
        for (i = 0; i < userInfo.length; i++) {
          if (registerInfo[userInfo[i]]) {
            view.setText(`${userInfo[i]}_error`, "")
          }
          else {
            view.setText(`${userInfo[i]}_error`, `Invalid ${userInfo[i]}!`)
          }
        }
        //if(validate(register_info.password)){}

        if (registerInfo.confirmPassword && registerInfo.confirmPassword == registerInfo.password) {
          view.setText("confirmPassword_error", "")
        }
        else {
          view.setText("confirmPassword_error", "Invalid confirm password!")
        }

        //3. submit info
        if (registerInfo.firstname
          && registerInfo.lastname
          && registerInfo.email
          && registerInfo.password
          && registerInfo.password == registerInfo.confirmPassword) {
          controller.register(registerInfo)
        }

      }

      break
    }
    case "comment": {
      let detailFilmId = model.detailFilmId

      // 1. exists: show details
      // 2. not found

      document.getElementById("app").innerHTML = components.comment
      model.status = 1
      let currentStatus = model.status

      switch (currentStatus) {
        case 0: {
          let home = document.getElementById("Home")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }

        case 1: {
          let home = document.getElementById("Movie")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }

        case 2: {
          let home = document.getElementById("Bookmark")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }
      }

      let homeBtn = document.getElementById("Home")
      homeBtn.addEventListener("click", function () {
        view.showComponents("mainPage")
      })

      let bookmarkBtn = document.getElementById("Bookmark")
      bookmarkBtn.addEventListener("click", function () {
        view.showComponents("bookmark")
      })

      let signOutBtn = document.getElementById("log-out")
      signOutBtn.addEventListener("click", signOutBtnClickHandler)
      function signOutBtnClickHandler() {
        firebase.auth().signOut()
      }

      // let historyBtn = document.getElementById("History")
      // historyBtn.addEventListener("click", function () {
      //   view.showComponents("history")
      // })


      let authUserEmailSpan = document.getElementById("auth-user-email")
      let displayName = model.authUser.displayName
      authUserEmailSpan.innerText += " " + displayName

      let commentForm = document.getElementById("comment-form")
      commentForm.onsubmit = commentFormSubmitHandler

      let listComments = document.getElementById("list-comments")
      listComments.innerHTML = detailFilmId

      loadFilm()
      loadComments()


      function loadComments() {
        db.collection("comments")
          .where('filmId', '==', detailFilmId)
          // .orderBy("createdAt","asc") //asc tang dan, desc descending
          // .get()
          // .then((res) => {
          //   res.docs.forEach((doc)=>{
          //     let result = doc.data()
          //     let content = result.content
          //     renderComment(content)
          //   })
          // })
          .onSnapshot((snapShot) => {
            document.getElementById("list-comments").innerHTML = ""
            snapShot.docs.map((doc) => {
              let result = doc.data()
              result.id = doc.id
              return result
            }).sort((comment1, comment2) => {
              let content1 = comment1.createdAt || ''
              let content2 = comment2.createdAt || ''
              return content1 - content2
            })
              .forEach(comment => renderComment(comment))
            // let changes = snapShot.docChanges()
            // changes.forEach((change)=>{
            //   let result = change.doc.data()
            //   let content = result.content
            //   renderComment(content)
            // })
          })
      }

      function commentFormSubmitHandler(e) {
        e.preventDefault()

        let commentContent = commentForm.commentMessage.value.trim()
        if (commentContent) {
          let commentDetail = {
            displayName: model.authUser.displayName,
            content: commentContent,
            createdAt: Date.now(),
            owner: model.authUser.email,  //model.authUser
            filmId: detailFilmId
          }
          db.collection("comments")
            .add({
              displayName: commentDetail.displayName,
              content: commentDetail.content,
              createdAt: commentDetail.createdAt,
              owner: commentDetail.owner,
              filmId: commentDetail.filmId
            })

          commentForm.commentMessage.value = ""


        }
      }

      function renderComment(commentDetail) {
        let div = document.createElement("div")
        let span = document.createElement("span")

        span.textContent = commentDetail.content
        div.appendChild(span)

        document.getElementById("list-comments").innerHTML += `
          <li>
            <div id="user">${commentDetail.displayName}</div>
            <span>${commentDetail.content}</span>
          </li>
        `
      }

      //each movie detail 
      function loadFilm() {
        // console.log(detailFilmId)
        db.collection("movies")
          .where("filmId", "==", detailFilmId)
          .get()
          .then((res) => {
            res.docs.forEach((doc) => {
              let result = doc.data()
              let eachFilmDetail = {
                actors: result.actors,
                backdropPath: result.backdropPath,
                duration: result.duration,
                filmLink: result.filmLink,
                overview: result.overview,
                posterPath: result.posterPath,
                rating: result.rating,
                releaseDay: result.releaseDay,
                title: result.title,
                type: result.type
              }
              document.getElementById("each-movie-container").innerHTML = `
              <div id="backdrop-path">
                <div class="background"></div>
                <img id="backdrop" class="img" src="${eachFilmDetail.backdropPath}" alt="helo">
              </div>

              <div id="movie-content">
                <div id="poster-path">
                  <img id="poster" class="img" src="${eachFilmDetail.posterPath}">
                </div>

                <div id="film-detail">
                  <ul>
                    <li id="title">${eachFilmDetail.title}</li>
                    <li id="release-day">${eachFilmDetail.releaseDay}</li>
                    <li id="rating">Rating: ${eachFilmDetail.rating}</li>
                    <li id="type">Duration: ${eachFilmDetail.duration} | Type: ${eachFilmDetail.type} | Actors: ${eachFilmDetail.actors}</li>
                    <li id="overview"><b>ABOUT MOVIE</b>:<br> ${eachFilmDetail.overview}</li>
                    <hr id="hr-bar"></hr>
                    <br>
                    <li id="movie-comment">
                      <button type="button" class="watch-btn">WATCH IT</button>
                      <b>MOVIE COMMENTS</b><br> <br></li>
                  </ul>
                </div>
              </div>
              `
              let watchBtnList = document.getElementsByClassName("watch-btn")
              for (let i = 0; i < watchBtnList.length; i++) {
                watchBtn = watchBtnList[i]
                watchBtn.addEventListener("click", watchBtnOnClick)
                async function watchBtnOnClick() {
                  let detailFilmId = model.detailFilmId

                  let filmWatching = (await db.collection("movies").doc(detailFilmId).get()).data()
                  let now = new Date()
                  let historyMovie = {
                    title: filmWatching.title,
                    createdAt: now.toLocaleString("us"),
                    filmId: filmWatching.filmId
                  }

                  // db.collection("history").add({
                  //   title: historyMovie.title || null,
                  //   createdAt: historyMovie.createdAt || null,
                  //   filmId: historyMovie.filmId || null
                  // })
                  // console.log(eachFilmDetail)
                  model.filmWillWatchLink = eachFilmDetail.filmLink
                  filmWillWatchLink = model.filmWillWatchLink
                  view.showComponents("watchFilm")
                  // controller.watchFilm(filmWillWatchLink)        
                }
              }
            })
          })
      }
      break
    }
    case "mainPage": {
      document.getElementById("app").innerHTML = components.mainPage

      model.status = 0
      let currentStatus = model.status

      let homeBtn = document.getElementById("Home")
      homeBtn.addEventListener("click", function () {
        view.showComponents("mainPage")
      })

      let bookmarkBtn = document.getElementById("Bookmark")
      bookmarkBtn.addEventListener("click", function () {
        view.showComponents("bookmark")
      })

      // let historyBtn = document.getElementById("History")
      // historyBtn.addEventListener("click", function () {
      //   view.showComponents("history")
      // })
      let navNavigator = document.getElementById("nav-navigator")
      let liList = navNavigator.getElementsByTagName("li")
      switch (currentStatus) {
        case 0: {
          let home = document.getElementById("Home")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }

        case 1: {
          let home = document.getElementById("Movie")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }

        case 2: {
          let home = document.getElementById("Bookmark")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }
      }


      let adminBtn = document.getElementById("Admin")
      adminBtn.addEventListener("click", function () {
        view.showComponents("filmManagement")
      })

      let authUserEmailSpan = document.getElementById("auth-user-email")
      let displayName = model.authUser.displayName
      authUserEmailSpan.innerText += " " + displayName

      function stopEvent(event) {
        event.stopPropagation()
      }

      db.collection("movies").get()
        .then((res) => {
          model.results = res.docs
          let results = model.results
          view.loadMovie(...results)
          let eachFilms = document.getElementsByClassName("film-frame")
          for (let j = 0; j < eachFilms.length; j++) {
            let eachFilm = eachFilms[j]
            eachFilm.addEventListener("click", eachFilmClickHandler)

            function eachFilmClickHandler() {
              let filmId = eachFilm.id
              model.detailFilmId = filmId
              view.showComponents("comment")
            }
          }

          let saveBtn = document.getElementsByClassName("bookmark-film")
          for (let i = 0; i < saveBtn.length; i++) {
            save = saveBtn[i]
            save.addEventListener("click", async function (e) {
              event.stopPropagation()
              alert("Film Saved to Bookmark")
              let id = e.target.parentNode.parentNode.id
              let filmJustSaved = (await db.collection("movies").doc(id).get()).data()
              let filmJustSavedInfo = {
                actors: filmJustSaved.actors,
                backdropPath: filmJustSaved.backdropPath,
                duration: filmJustSaved.duration,
                filmLink: filmJustSaved.filmLink,
                overview: filmJustSaved.overview,
                posterPath: filmJustSaved.posterPath,
                rating: filmJustSaved.rating,
                releaseDay: filmJustSaved.releaseDay,
                title: filmJustSaved.title,
                type: filmJustSaved.type,
                filmId: id
              }

              db.collection("bookmarked-movies").add({
                id: id,
                actors: filmJustSavedInfo.actors || null,
                backdropPath: filmJustSavedInfo.backdropPath || null,
                duration: filmJustSavedInfo.duration || null,
                filmLink: filmJustSavedInfo.filmLink || null,
                overview: filmJustSavedInfo.overview || null,
                posterPath: filmJustSavedInfo.posterPath || null,
                rating: filmJustSavedInfo.rating || null,
                releaseDay: filmJustSavedInfo.releaseDay || null,
                title: filmJustSavedInfo.title || null,
                type: filmJustSavedInfo.type || null,
                filmId: id || null
              })
            })
          }

          let signOutBtn = document.getElementById("log-out")
          signOutBtn.addEventListener("click", signOutBtnClickHandler)
          function signOutBtnClickHandler() {
            firebase.auth().signOut()
          }

          // let searchBtn = document.getElementById("search-btn")

          let formSearchFilm = document.getElementById("search")
          formSearchFilm.onsubmit = searchBtnSubmitHandler

          function searchBtnSubmitHandler(e) {
            e.preventDefault()
            let filmName = formSearchFilm.filmName.value
            controller.search(filmName)
          }
        })
      break
    }
    case "watchFilm": {
      document.getElementById("app").innerHTML = components.watchFilm
      let homeBtn = document.getElementById("Home")
      homeBtn.addEventListener("click", function () {
        view.showComponents("mainPage")
      })

      let bookmarkBtn = document.getElementById("Bookmark")
      bookmarkBtn.addEventListener("click", function () {
        view.showComponents("bookmark")
      })

      let signOutBtn = document.getElementById("log-out")
      signOutBtn.addEventListener("click", signOutBtnClickHandler)
      function signOutBtnClickHandler() {
        firebase.auth().signOut()
      }

      // let historyBtn = document.getElementById("History")
      // historyBtn.addEventListener("click", function () {
      //   view.showComponents("history")
      // })

      let authUserEmailSpan = document.getElementById("auth-user-email")
      let displayName = model.authUser.displayName
      authUserEmailSpan.innerText += " " + displayName

      let watchFilm = document.getElementById("watch-film")
      watchFilm.innerHTML += `
      <video width="100%" height="100%" controls>
      <source src="${filmWillWatchLink}" type="video/mp4">
    </video>      `

      break
    }
    case "bookmark": {
      document.getElementById("app").innerHTML = components.bookmark

      model.status = 2
      let currentStatus = model.status

      let homeBtn = document.getElementById("Home")
      homeBtn.addEventListener("click", function () {
        view.showComponents("mainPage")
      })

      let bookmarkBtn = document.getElementById("Bookmark")
      bookmarkBtn.addEventListener("click", function () {
        view.showComponents("bookmark")
      })

      let signOutBtn = document.getElementById("log-out")
      signOutBtn.addEventListener("click", signOutBtnClickHandler)
      function signOutBtnClickHandler() {
        firebase.auth().signOut()
      }

      // let historyBtn = document.getElementById("History")
      // historyBtn.addEventListener("click", function () {
      //   view.showComponents("history")
      // })

      let authUserEmailSpan = document.getElementById("auth-user-email")
      let displayName = model.authUser.displayName
      authUserEmailSpan.innerText += " " + displayName
      switch (currentStatus) {
        case 0: {
          let home = document.getElementById("Home")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }

        case 1: {
          let home = document.getElementById("Movie")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }

        case 2: {
          let home = document.getElementById("Bookmark")
          className = "active"
          homeClassName = home.className.split(" ")
          if (homeClassName.indexOf(className) == -1) {
            home.className += " " + className
          }
          break
        }
      }

      let listFilmsBookmarked = document.getElementById("list-films-bookmark")

      db.collection("bookmarked-movies")
        .onSnapshot((snapShot) => {
          let changes = snapShot.docChanges()
          changes.forEach((change) => {
            if (change.type == "added") {
              renderFilm(change.doc)
            }
            else if (change.type == "removed") {
              let listFilmBookmark = document.getElementById("list-films-bookmark")
              let li = listFilmsBookmarked.querySelector(`[id="${change.doc.data().filmId}"]`)
              listFilmBookmark.removeChild(li)
            }
          })

          let eachFilms = document.getElementsByClassName("film-frame")
          for (let j = 0; j < eachFilms.length; j++) {
            let eachFilm = eachFilms[j]
            eachFilm.addEventListener("click", eachFilmClickHandler)
            function eachFilmClickHandler() {
              let filmId = eachFilm.id
              model.detailFilmId = filmId
              view.showComponents("comment")
            }
          }

        })

      function renderFilm(doc) {
        let film = doc.data()
        let filmDetail = {
          id: doc.id,
          actors: film.actors || null,
          backdropPath: film.backdropPath || null,
          duration: film.duration || null,
          filmLink: film.filmLink || null,
          overview: film.overview || null,
          posterPath: film.posterPath || null,
          rating: film.rating || null,
          releaseDay: film.releaseDay || null,
          title: film.title || null,
          type: film.type || null
        }
        listFilmsBookmarked.innerHTML += `
            <div class="film-frame" id="${film.filmId}">
              <div id="film-pic">
                <img class="img" src="${filmDetail.posterPath}" alt ="">
                <button class="del" id="${filmDetail.id}">Del</button>
              </div>

              <div id="basic-info">
                <div id="name">${filmDetail.title}</div>
                <div id="release-day">${filmDetail.releaseDay}</div>
                <div id="type">${filmDetail.type}</div>
              </div>
            </div>
          `

        // let eachFilms = document.getElementsByClassName("film-frame")
        // for (let j = 0; j < eachFilms.length; j++) {
        //   let eachFilm = eachFilms[j]
        //   eachFilm.addEventListener("click", eachFilmClickHandler)

        //   function eachFilmClickHandler() {
        //     let filmId = eachFilm.id
        //     model.detailFilmId = filmId
        //     view.showComponents("comment")
        //   }
        // }
        let delBtnList = document.getElementsByClassName("del")
        for (let i = 0; i < delBtnList.length; i++) {
          let delBtn = delBtnList[i]
          let filmId = delBtn.id
          delBtn.addEventListener("click", function (e) {
            event.stopPropagation()
            db.collection("bookmarked-movies").doc(filmId).delete()
          })
        }
      }
      break
    }
    case "filmManagement": {
      if (model.adminCheck) {
        document.getElementById("app").innerHTML = components.filmManagement

        let homeBtn = document.getElementById("Home")
        homeBtn.addEventListener("click", function () {
          view.showComponents("mainPage")
        })

        let bookmarkBtn = document.getElementById("Bookmark")
        bookmarkBtn.addEventListener("click", function () {
          view.showComponents("bookmark")
        })

        let signOutBtn = document.getElementById("log-out")
        signOutBtn.addEventListener("click", signOutBtnClickHandler)
        function signOutBtnClickHandler() {
          firebase.auth().signOut()
        }

        // let historyBtn = document.getElementById("History")
        // historyBtn.addEventListener("click", function () {
        //   view.showComponents("history")
        // })

        let authUserEmailSpan = document.getElementById("auth-user-email")
        let displayName = model.authUser.displayName
        authUserEmailSpan.innerText += " " + displayName

        let filmList = document.getElementById("film-list")
        db.collection("movies")
          .onSnapshot((snapShot) => {
            let changes = snapShot.docChanges() //thay đổi trên database mỗi khi database được gọi
            changes.forEach((change) => {
              if (change.type == "added") {
                let doc = change.doc
                renderFilm(doc)
              }
              else if (change.type == "removed") {
                let li = filmList.querySelector(`[data-id="${change.doc.id}"]`) //lay ra item trong cafelist ma co id cua cai doc vừa bị change 

                filmList.removeChild(li)
              }
            })
          })


        //getting data
        function renderFilm(doc) {
          let film = doc.data()
          let filmManage = {
            actors: film.actors || null,
            backdropPath: film.backdropPath || null,
            duration: film.duration || null,
            filmLink: film.filmLink || null,
            overview: film.overview || null,
            posterPath: film.posterPath || null,
            rating: film.rating || null,
            releaseDay: film.releaseDay || null,
            title: film.title || null,
            type: film.type || null,
            filmId: doc.id
          }
          // console.log(doc.id)
          filmList.innerHTML += `
            <li data-id="${doc.id}">
              <span>Title: <span class="info">${filmManage.title}</span></span>
              <span>FilmLink:  <span class="info">${filmManage.filmLink}</span> </span>
              <span>FilmId: <span class="info">${filmManage.filmId}</span></span>

              <div class="dots">...</div>
              <button class="myBtn">Readmore</button>
              <div class="more">

              <span>Actors: <span class="info">${filmManage.actors}</span> </span>
              <span>BackdropPath: <span class="info">${filmManage.backdropPath}</span> </span>
              <span>Duration: <span class="info">${filmManage.duration}</span> </span>
              <span>Overview:  <span class="info">${filmManage.overview}</span>  </span>
              <span>PosterPath:  <span class="info">${filmManage.posterPath}</span> </span>
              <span>Rating: <span class="info">${filmManage.rating}</span></span>
              <span>ReleaseDay: <span class="info">${filmManage.releaseDay}</span></span>
              <span>Type: <span class="info">${filmManage.type}</span></span>
              </div>
              <div class="function">
                <div class="cross">x</div>
                <div class="update">Update</div>
              </div>
            </li>
          `

          let crossList = document.getElementsByClassName("cross")
          let updateList = document.getElementsByClassName("update")
          let dots = document.getElementsByClassName("dots");
          let moreTexts = document.getElementsByClassName("more");
          let btnTexts = document.getElementsByClassName("myBtn");

          for (let i = 0; i < crossList.length; i++) {
            let cross = crossList[i]
            let update = updateList[i]
            let dot = dots[i]
            let moreText = moreTexts[i]
            let btnText = btnTexts[i]

            dot.style.display = "none";
            btnText.innerHTML = "Read less";
            moreText.style.display = "inline";
            if (dot.style.display === "none") {
              dot.style.display = "inline";
              btnText.innerHTML = "Read more";
              moreText.style.display = "none";
            } else {
              dot.style.display = "none";
              btnText.innerHTML = "Read less";
              moreText.style.display = "inline";
            }
            btnText.addEventListener("click", function () {
              if (dot.style.display === "none") {
                dot.style.display = "inline";
                btnText.innerHTML = "Read more";
                moreText.style.display = "none";
              } else {
                dot.style.display = "none";
                btnText.innerHTML = "Read less";
                moreText.style.display = "inline";
              }
            })

            cross.addEventListener("click", function (e) {
              e.stopPropagation()
              let id = e.target.parentNode.parentNode.getAttribute("data-id")
              console.log(id)
              db.collection("movies").doc(id).delete() //lay duoc 1 document co id la tren 
            })

            update.addEventListener("click", function (e) {
              e.stopPropagation()
              let id = e.target.parentNode.parentNode.getAttribute("data-id")
              console.log(id)
              model.updateId = id
              view.showComponents("update")
            })

          }

          //delete data



        }
        let form = document.getElementById("add-film-form")
        form.addEventListener("submit", function (e) {
          e.preventDefault()
          db.collection("movies").add({
            actors: form.actors.value || null,
            backdropPath: form.backdropPath.value || null,
            duration: form.duration.value || null,
            filmLink: form.filmLink.value || null,
            overview: form.overview.value || null,
            posterPath: form.posterPath.value || null,
            rating: form.rating.value || null,
            releaseDay: form.releaseDay.value || null,
            title: form.title.value || null,
            type: form.type.value || null,
            filmId: null
          })
            .then(function (doc) {
              console.log("Document written with ID: ", doc.id);
              db.collection("movies").doc(doc.id).update({
                filmId: doc.id
              })
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });

          // db.collection("movies")
          //   .where("filmId", "==", "just-added")
          //   .get()
          //   .then((res) => {
          //     res.docs.forEach((doc) => {
          //       let filmId = doc.id
          //       db.collection("movies").doc(doc.id).update({
          //         filmId: filmId
          //       })
          //     })
          //   })


          form.actors.value = ''
          form.backdropPath.value = ''
          form.duration.value = ''
          form.filmLink.value = ''
          form.overview.value = ''
          form.posterPath.value = ''
          form.rating.value = ''
          form.releaseDay.value = ''
          form.title.value = ''
          form.type.value = ''

        })
      }
      else {
        alert("Not authorized")
      }

      break
    }
    case "update": {
      document.getElementById("app").innerHTML = components.update
      let homeBtn = document.getElementById("Home")
      homeBtn.addEventListener("click", function () {
        view.showComponents("mainPage")
      })

      let bookmarkBtn = document.getElementById("Bookmark")
      bookmarkBtn.addEventListener("click", function () {
        view.showComponents("bookmark")
      })
      let filmManagementBtn = document.getElementById("Bookmark")
      filmManagementBtn.addEventListener("click", function () {
        view.showComponents("filmManagement")
      })
      // let historyBtn = document.getElementById("History")
      // historyBtn.addEventListener("click", function () {
      //   view.showComponents("history")
      // })

      let updateId = model.updateId
      let form = document.getElementById("add-film-form")
      db.collection("movies")
        .doc(updateId).get()
        .then((res) => {
          let result = res.data()
          form.innerHTML += `
      <input type="text" name="title" value="${result.title}">
      <input type="text" name="actors"  value="${result.actors}">
      <input type="text" name="backdropPath"  value="${result.backdropPath}">
      <input type="text" name="posterPath"  value="${result.posterPath}">
      <input type="text" name="duration"  value="${result.duration}">
      <input type="text" name="rating"  value="${result.rating}">
      <input type="text" name="overview"  value="${result.overview}">
      <input type="text" name="releaseDay"  value="${result.releaseDay}">
      <input type="text" name="type" value="${result.type}">
      <input type="text" name="filmLink"  value="${result.filmLink}">
      <input id="add-film" type="submit">
      `
          // let updateSubmitBtn = document.getElementById("add-film")
        })

      form.onsubmit = submitHandler
      function submitHandler(e) {
        e.preventDefault();
        let updateInfo = {
          actors: form.actors.value || null,
          backdropPath: form.backdropPath.value || null,
          duration: form.duration.value || null,
          filmLink: form.filmLink.value || null,
          overview: form.overview.value || null,
          posterPath: form.posterPath.value || null,
          rating: form.rating.value || null,
          releaseDay: form.releaseDay.value || null,
          title: form.title.value || null,
          type: form.type.value || null,
        }
        console.log(updateInfo)
        db.collection("movies").doc(updateId).update({
          actors: updateInfo.actors,
          backdropPath: updateInfo.backdropPath,
          duration: updateInfo.duration,
          filmLink: updateInfo.filmLink,
          overview: updateInfo.overview,
          posterPath: updateInfo.posterPath,
          rating: updateInfo.rating,
          releaseDay: updateInfo.releaseDay,
          title: updateInfo.title,
          type: updateInfo.type,
        })
        view.showComponents("filmManagement")
      }
      break
    }
    // case "history": {
    //   document.getElementById("app").innerHTML = components.history
    //   let detailFilmId = model.detailFilmId

    //   let homeBtn = document.getElementById("Home")
    //   homeBtn.addEventListener("click", function () {
    //     view.showComponents("mainPage")
    //   })

    //   let bookmarkBtn = document.getElementById("Bookmark")
    //   bookmarkBtn.addEventListener("click", function () {
    //     view.showComponents("bookmark")
    //   })
    //   let filmManagementBtn = document.getElementById("Bookmark")
    //   filmManagementBtn.addEventListener("click", function () {
    //     view.showComponents("filmManagement")
    //   })

    //   let historyBtn = document.getElementById("History")
    //   historyBtn.addEventListener("click", function () {
    //     view.showComponents("history")
    //   })

    //   let historyFilm = document.getElementById("history")
    //   db.collection("history")
    //     .onSnapshot((snapShot) => {
    //       let changes = snapShot.docChanges()
    //       changes.forEach((change) => {
    //         if (change.type == "added") {
    //           renderHistoryFilm(change.doc)
    //         }
    //         else if (change.type == "removed") {
    //           let li = historyFilm.querySelector(`[id="${change.doc.data().filmId}"]`)
    //           historyFilm.removeChild(li)
    //         }
    //       })
    //     })


    //   function renderHistoryFilm(doc) {
    //     let result = doc.data()
    //     historyFilm.innerHTML += ` 
    //       <div id="${result.filmId}">
    //       <b>Name:</b>${result.title} || <b>Watched At:</b> ${result.createdAt}
    //       <span class="delete-btn" id="${doc.id}">X</span>
    //       </div>
    //       `


    //     let deleteLists = document.getElementsByClassName("delete-btn")
    //     for (let i = 0; i < deleteLists.length; i++) {
    //       let deleteList = deleteLists[i]
    //       let filmId = deleteList.id
    //       deleteList.addEventListener("click", function () {
    //         event.stopPropagation()
    //         db.collection("history").doc(filmId).delete()
    //       })
    //     }
    //   }






    //   break
    // }
  }

  view.setText = function (id, text) {
    document.getElementById(id).innerHTML = text
  }

  view.loadMovie = function (...results) {
    let listFilms = document.getElementById("list-films")
    listFilms.innerHTML = ""
    results.forEach((doc) => {
      let result = doc.data()
      let filmDetail = {
        actors: result.actors,
        backdropPath: result.backdropPath,
        duration: result.duration,
        filmLink: result.filmLink,
        overview: result.overview,
        posterPath: result.posterPath,
        rating: result.rating,
        releaseDay: result.releaseDay,
        title: result.title,
        type: result.type
      }
      // console.log(filmDetail)
      listFilms.innerHTML += `
    <div class="film-frame" id="${doc.id}" tabindex="1">
      <div id="film-pic">
        <img class="img" src="${filmDetail.posterPath}" alt ="">
        <button class="bookmark-film">Save</button>
      </div>

      <div id="basic-info">
        <div id="name">${filmDetail.title}</div>
        <div id="release-day">${filmDetail.releaseDay}</div>
        <div id="type">${filmDetail.type}</div>
      </div>
    </div>
  `
    })
  }
}






