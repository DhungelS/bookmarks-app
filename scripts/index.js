/* global Bookmarks, api, Store*/
'use strict';
$(document).ready(function () {
  Bookmarks.bindEventListeners();
  Bookmarks.render();
  api.getItems((items) => {
    items.forEach((item) => Store.bookmarks.push(item));
    Bookmarks.render();
  });
});