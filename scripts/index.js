/* global Bookmarks, api, Store*/
'use strict';
<<<<<<< HEAD
=======

>>>>>>> 7aab5b4df5744301f6fd823f072c4a51ab261e27
$(document).ready(function () {
  Bookmarks.bindEventListeners();
  Bookmarks.render();
  api.getItems((items) => {
    items.forEach((item) => Store.bookmarks.push(item));
    Bookmarks.render();
  });
});
