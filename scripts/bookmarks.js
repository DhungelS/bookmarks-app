/* global api */

'use strict';

//Include all the DOM functions such as event listeners, adding new items to the DOM etc.

const store = {
  bookmarks: []
};

function generateBookmarkElement(item) {

  let displayToggle = 'info'
  
  if (item.expandedView === true) {
    displayToggle = 'expanded'
  }

  return (
    `<li data-item-id="${item.id}" class="bookmark-item">
    <p>${item.title}<p>
    <p>${item.rating}</p>
    <div class="${displayToggle}"> 
    <p>${item.url}</p>
    <p>${item.desc}</p>
    </div>
    <button id="delete-bookmark" type="button">delete</button>
    <button id="expand-bookmark" type="button">View in Full</button>
    </li>`

  );

}

function generateBookmarkString() {

  return store.bookmarks.map(bookmark => {
    return generateBookmarkElement(bookmark);
  });

}

const findAndDelete = function (id) {
  store.bookmarks = store.bookmarks.filter(bookmark => bookmark.id !== id);
};


const findById = function (id) {
  return store.bookmarks.find(bookmark => bookmark.id === id);
};

function render() {
  const bookmarkItemString = generateBookmarkString();
  $('.results').html(bookmarkItemString)
}

function handleDeleteItemClicked() {
  $('.results').on('click', '#delete-bookmark', function () {
    const bmId = $(this).closest('.bookmark-item').attr('data-item-id');
    api.deleteItem(bmId, () => {
      findAndDelete(bmId);
      render();
    });
  });

}

function expandedViewToggleClicked() {
  $('.results').on('click', '#expand-bookmark', function () {
    const bmId = $(this).closest('.bookmark-item').attr('data-item-id');
    const getId = findById(bmId);
    getId.expandedView = !getId.expandedView;
    render();
    //  console.log(getId)

  });
}

function handleNewItemSubmit() {
  $('form').submit(function (e) {
    e.preventDefault();
    const title = $('label #title').val();
    const url = $('label #link').val();
    const desc = $('label #description').val();
    const rating = $('#rating').val();

    api.createItem({ title, url, desc, rating }, (item) => {
      addBookmarksToStore(item);
      render();

    });

  });
}



function addBookmarksToStore(item) {
  store.bookmarks.push(item);
  item.expandedView = false;
}

$(document).ready(function () {
  handleNewItemSubmit();
  api.getItems((items) => {
    console.log(items);
    items.forEach((item) => store.bookmarks.push(item));
    render();
  });
  handleDeleteItemClicked()
  expandedViewToggleClicked()
  // handleDeleteItemClicked();

});