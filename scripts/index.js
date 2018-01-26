'use strict'

//When the DOM is ready bind all the event listeners
//Update the references in the store

$(document).ready(function () {
  Bookmarks.bindEventListeners();
  Bookmarks.render();
  api.getItems((items) => {
    items.forEach((item) => Store.bookmarks.push(item));
    Bookmarks.render();
  });
});