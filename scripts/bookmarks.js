/* global api, Store*/

'use strict';

const Bookmarks = (function () {

  function generateBookmarkElement(item) {

    let displayToggle = 'info';

    if (item.expandedView === true) {
      displayToggle = 'expanded';
    }

    return (
      `<li data-item-id="${item.id}" class="bookmark-item">
    <h4>${item.title}</h4>
    <p><i class="fa fa-star-o fa-fw">${item.rating}</i></p>
    <div class="${displayToggle}"> 
    <p><a href="${item.url}"><i class="fa fa-link fa-fw" aria-hidden="true"></a></i></p>
    <p class="desc">${item.desc}</p>
    </div>
    <button id="delete-bookmark" type="button">Delete</button>
    <button id="expand-bookmark" type="button">Detailed View</button>
    </li>`
    );

  }

  function generateBookmarkElements(bookmarks) {
    return bookmarks.map(bookmark => {
      return generateBookmarkElement(bookmark);
    });
  }

  function render() {
    let viewBookmarks = Store.bookmarks;
    const ratingToFilterBy = $('#rating-filter option:selected').val();
    const tempFilteredState = Store.filterByRating(ratingToFilterBy);

    if (handleFilterByRatingClicked) {
      viewBookmarks = tempFilteredState;
    }

    const currentBookmarkElements = generateBookmarkElements(viewBookmarks);
    $('.results').html(currentBookmarkElements);
  }


  function handleDeleteItemClicked() {
    $('.results').on('click', '#delete-bookmark', function () {
      const bmId = $(this).closest('.bookmark-item').attr('data-item-id');
      api.deleteItem(bmId, () => {
        Store.findAndDelete(bmId);
        render();
      });
    });
  }

  function expandedViewToggleClicked() {
    $('.results').on('click', '#expand-bookmark', function () {
      const bmId = $(this).closest('.bookmark-item').attr('data-item-id');
      const getId = Store.findById(bmId);
      getId.expandedView = !getId.expandedView;
      render();
    });
  }

  function handleNewItemSubmit() {
    $('form').submit(function (e) {
     
      e.preventDefault();
      const title = $('#title').val();
      const url = $('#link').val();
      const desc = $('#description').val();
      const rating = $('#rating').val();
      
      $('#title').val('');
      $('#link').val('');
      $('#description').val('');
      $('#rating').val('');

      api.createItem({ title, url, desc, rating }, (item) => {
        Store.addBookmarksToStore(item);
        render();
      });
    });
  }

  function handleFilterByRatingClicked() {
    $('#filter-btn').on('click', function () {
      
      render();
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
    handleDeleteItemClicked();
    expandedViewToggleClicked();
    handleFilterByRatingClicked();
  }

  return {
    bindEventListeners,
    render
  };
}());
