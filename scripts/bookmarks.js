'use strict';

//Include all the DOM functions such as event listeners, adding new items to the DOM etc.

const store = {
  bookmarks: []
};

function generateBookmarkElement(item) {
  return (`<li></li>`);
}

function generateBookmarkString() {

}

function render() {

}

function handleNewItemSubmit(){
  $('form').submit(function (event) {
    event.preventDefault();
    const title = $('label #title').val();
    console.log(title);
  });
}

handleNewItemSubmit();