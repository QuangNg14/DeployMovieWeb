const model = { 
  authUser: null,
  commentActive:null,
  detailFilmId: null,
  allFilm: [],
  displayName: null,
  filmWillWatchLink: null,
  results: [],
  status: null,
  isSearching: null,
  displayNameComment: null,
  roleAdmin:null,
  adminCheck: false,
  updateId: null,
  history:{}

}
window.model = model

model.authenticated = function(authUser) {
  model.authUser = authUser
}

model.getDisplayName = function(name){
  model.displayName = name
}








