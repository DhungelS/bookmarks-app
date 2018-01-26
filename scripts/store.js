'use strict'
//Store where all the data is kept/pushed inside

const Store = (function () {

  const addBookmarksToStore = function(item) {
    this.bookmarks.push(item);
    item.expandedView = false;
  }

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };


  const findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  function filterByRating(rating) {
    this.filteredBookmarks = this.bookmarks.filter(bookmark => {
      return bookmark.rating > rating;
    });

  }




  return {
    bookmarks: [],
    filteredBookmarks: [],
    addBookmarksToStore,
    findAndDelete,
    findById,
    filterByRating
  };
}());