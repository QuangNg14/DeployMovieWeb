const components = {}


components.login = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/login.css">
    
  
  </head>
  <body>
    <section class="log-in-container">
        <form id="form-login" class="form-login">
  
            <div class="form-header">
              <h3>Movie Platform</h3>
            </div>
      
            <div class="form-content">
              <div class="input-wrapper">
                <input name="email" type="email" placeholder="Email">
                <div id="email_error" class="message_error"></div>
              </div>
      
              <div class="input-wrapper">
                <input name="password" type="password" placeholder="Password">
                <div id="password_error" class="message_error"></div>
              </div>
            </div>
      
            <div id="login_error" class="message_error"></div>
            <div class="form-footer">
              <a id="register-form-link" href="#">Not yet registered? Sign Up </a>
              <button id="login_btn">Login</button>
            </div>
          </form> 
    </section>
  
  
  
  </body>
  </html>
  `

components.register = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=\, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="../css/register.css">

</head>

<body>
  <section class="register-container">
    <form id="form-register" class="form-register">

      <div class="form-header">
        <h3>Movie Platform</h3>
      </div>

      <div class="form-content">

        <div class="name-wrapper">
          <div class="input-wrapper">
            <input name="firstname" type="text" placeholder="First Name" required>
            <div id="firstname_error" class="message_error"></div>
          </div>

          <div class="input-wrapper">
            <input name="lastname" type="text" placeholder="Last Name" required>
            <div id="lastname_error" class="message_error"></div>
          </div>
        </div>

        <div class="input-wrapper">
          <input name="email" type="email" placeholder="Email" required>
          <div id="email_error" class="message_error"></div>
        </div>

        <div class="input-wrapper">
          <input name="password" type="password" placeholder="Password" required>
          <div id="password_error" class="message_error"></div>
        </div>

        <div class="input-wrapper">
          <input name="confirmPassword" type="password" placeholder="Confirm Password" required>
          <div id="confirmPassword_error" class="message_error"></div>
        </div>

      </div>
      
      <div id="register_error" class="message_error"></div>
      <div id="register_success" class="message_success"></div>
      <div class="form-footer">
        <a id="register-form-link" href="#">Already have an account? Login </a>
        <button id="register_btn" >Register</button>
      </div>
    </form>
  </section>



</body>

</html>`

components.mainPage = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/mainPage.css">
    
</head>
<section id="home-page">
  <div id="nav">
    <div id="logo"></div>
    <div id="nav-bar">
      <ul id="nav-navigator">
        <li id="Home">Home</li>
        <li id="Movie">Movie</li>
        <li id="Bookmark">Bookmark</li>
        <li id="log-out">Log Out</li>
        <li id="Admin">Admin Page</li>

      </ul>
    </div>
  </div>

  <section id="film-container">
    <div id="header">
      <form id="search">
        <input name="filmName" type="text" id="search" placeholder="SEARCH">
        <button type="submit" id="search-btn">
          <i class="fa fa-search"></i>


        </button>
      </form>

      <div id="user-profile">
        <span id="auth-user-email">Welcome,</span>
        <div id="icon">
          <i class="icon fab fa-instagram"></i>
          <i class="icon fab fa-facebook-f"></i>
          <i class="icon fab fa-twitter"></i>
        </div>
      </div>
    
    </div>

    <div id="list-films">
    </div>
  </section>
</section>
`
components.comment = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/mainPage.css">
    <link rel="stylesheet" href="../css/movieDetail.css">

</head>
<section id="home-page">
  <div id="nav">
    <div id="logo"></div>
    <div id="nav-bar">
      <ul id="nav-navigator">
        <li id="Home">Home</li>
        <li id="Movie">Movie</li>
        <li id="Bookmark">Bookmark</li>
        <li id="log-out">Log Out</li>
        <li id="Admin">Admin Page</li>

      </ul>
    </div>
  </div>

  <section id="film-container">
    <div id="header">
      <form id="search">
        <input name="filmName" type="text" id="search" placeholder="SEARCH">
        <button type="submit" id="search-btn">
          <i class="fa fa-search"></i>


        </button>
      </form>

      <div id="user-profile">
        <span id="auth-user-email">Welcome,</span>
        <div id="icon">
          <i class="icon fab fa-instagram"></i>
          <i class="icon fab fa-facebook-f"></i>
          <i class="icon fab fa-twitter"></i>
        </div>
      </div>
    
    </div>

    <div id="film-detail">
      <section id="each-movie-container">
        
      </section>
      
      <section class="comment-container">
        <ul id="list-comments" class="list-comments">
        </ul>
        <div id="current-comment" class="current-comment">
          <form id="comment-form" class="comment-form">
            <div class="input-wrapper">
              <input class="input-chat" type="text" name="commentMessage" placeholder="Enter your comment">
            </div>
            <button id="comment-submit-btn">Send</button>
          </form>
        </div>
      </section>
    </div>
  </section>
</section>
  
  
  
`


components.bookmark = `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="../css/mainPage.css">
    
</head>
<section id="home-page">
  <div id="nav">
    <div id="logo"></div>
    <div id="nav-bar">
      <ul id="nav-navigator">
        <li id="Home" class="Home">Home</li>
        <li id="Movie" class="Movie">Movie</li>
        <li id="Bookmark" class="Bookmark">Bookmark</li>
        <li id="log-out" class="log-out">Log Out</li>
        <li id="Admin" class="Admin">Admin Page</li>

      </ul>
    </div>
  </div>

  <section id="film-container">
    <div id="header">
      <form id="search">
        <input name="filmName" type="text" id="search" placeholder="SEARCH">
        <button type="submit" id="search-btn">
          <i class="fa fa-search"></i>


        </button>
      </form>

      <div id="user-profile">
        <span id="auth-user-email">Welcome,</span>
        <div id="icon">
          <i class="icon fab fa-instagram"></i>
          <i class="icon fab fa-facebook-f"></i>
          <i class="icon fab fa-twitter"></i>
        </div>
      </div>
    
    </div>

    <div id="list-films-bookmark">
    </div>
  </section>
</section>
`

components.watchFilm = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<link rel="stylesheet" href="../css/mainPage.css">

</head>
<section id="home-page">
<div id="nav">
<div id="logo"></div>
<div id="nav-bar">
  <ul id="nav-navigator">
    <li id="Home">Home</li>
    <li id="Movie">Movie</li>
    <li id="Bookmark">Bookmark</li>
    <li id="log-out">Log Out</li>
    <li id="Admin">Admin Page</li>

  </ul>
</div>
</div>

<section id="film-container">
<div id="header">
  <form id="search">
    <input name="filmName" type="text" id="search" placeholder="SEARCH">
    <button type="submit" id="search-btn">
      <i class="fa fa-search"></i>


    </button>
  </form>

  <div id="user-profile">
    <span id="auth-user-email">Welcome,</span>
    <div id="icon">
      <i class="icon fab fa-instagram"></i>
      <i class="icon fab fa-facebook-f"></i>
      <i class="icon fab fa-twitter"></i>
    </div>
  </div>

</div>

<div id="watch-film">
</div>
</section>
</section>
`

components.filmManagement = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<link rel="stylesheet" href="../css/mainPage.css">
<link rel="stylesheet" href="../css/admin.css">


</head>
<section id="home-page">
<div id="nav">
<div id="logo"></div>
<div id="nav-bar">
  <ul id="nav-navigator">
    <li id="Home">Home</li>
    <li id="Movie">Movie</li>
    <li id="Bookmark">Bookmark</li>
    <li id="log-out">Log Out</li>
    <li id="Admin">Admin Page</li>
  </ul>
</div>
</div>

<section id="film-container">
<div id="header">
  <form id="search">
    <input name="filmName" type="text" id="search" placeholder="SEARCH">
    <button type="submit" id="search-btn">
      <i class="fa fa-search"></i>


    </button>
  </form>

  <div id="user-profile">
    <span id="auth-user-email">Welcome,</span>
    <div id="icon">
      <i class="icon fab fa-instagram"></i>
      <i class="icon fab fa-facebook-f"></i>
      <i class="icon fab fa-twitter"></i>
    </div>
  </div>

</div>

    <div id="admin-content">
      <h1>Film Admin Page</h1>

      <form id="add-film-form">
        <input type="text" name="title" placeholder="Movie Name">
        <input type="text" name="actors" placeholder="Movie actors">
        <input type="text" name="backdropPath" placeholder="Movie backdropPath">
        <input type="text" name="posterPath" placeholder="Movie posterPath">
        <input type="text" name="duration" placeholder="Movie duration">
        <input type="text" name="rating" placeholder="Movie rating">
        <input type="text" name="overview" placeholder="Movie overview">
        <input type="text" name="releaseDay" placeholder="Movie releaseDay">
        <input type="text" name="type" placeholder="Movie type">
        <input type="text" name="filmLink" placeholder="Movie filmLink">
      <button id="add-film">Add film</button>
      
      </form>

      <ul id="film-list"></ul>

    </div>
</section>
</section>
`

components.update = `
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<link rel="stylesheet" href="../css/mainPage.css">
<link rel="stylesheet" href="../css/admin.css">


</head>
<section id="home-page">
<div id="nav">
<div id="logo"></div>
<div id="nav-bar">
  <ul id="nav-navigator">
    <li id="Home">Home</li>
    <li id="Movie">Movie</li>
    <li id="Bookmark">Bookmark</li>
    <li id="log-out">Log Out</li>
    <li id="Admin">Admin Page</li>
  </ul>
</div>
</div>

<section id="film-container">
<div id="header">
  <form id="search">
    <input name="filmName" type="text" id="search" placeholder="SEARCH">
    <button type="submit" id="search-btn">
      <i class="fa fa-search"></i>


    </button>
  </form>

  <div id="user-profile">
    <span id="auth-user-email">Welcome,</span>
    <div id="icon">
      <i class="icon fab fa-instagram"></i>
      <i class="icon fab fa-facebook-f"></i>
      <i class="icon fab fa-twitter"></i>
    </div>
  </div>

</div>

    <div id="admin-content">
      <h1>Film Admin Page</h1>

      <form id="add-film-form">

      </form>

      <ul id="film-list"></ul>

    </div>
</section>
</section>
`

components.history = `
  
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<link rel="stylesheet" href="../css/mainPage.css">

</head>
<section id="home-page">
<div id="nav">
<div id="logo"></div>
<div id="nav-bar">
  <ul id="nav-navigator">
    <li id="Home">Home</li>
    <li id="Movie">Movie</li>
    <li id="Bookmark">Bookmark</li>
    <li id="log-out">Log Out</li>
    <li id="Admin">Admin Page</li>

  </ul>
</div>
</div>

<section id="film-container">
<div id="header">
  <form id="search">
    <input name="filmName" type="text" id="search" placeholder="SEARCH">
    <button type="submit" id="search-btn">
      <i class="fa fa-search"></i>


    </button>
  </form>

  <div id="user-profile">
    <span id="auth-user-email">Welcome,</span>
    <div id="icon">
      <i class="icon fab fa-instagram"></i>
      <i class="icon fab fa-facebook-f"></i>
      <i class="icon fab fa-twitter"></i>
    </div>
  </div>

</div>

<div id="history">
</div>
</section>
</section>
`