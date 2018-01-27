'use strict';

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/saugat'

  const getItems = function (callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createItem = function (itemData, callback) {
    
    const item = JSON.stringify(itemData);

    const callSettings = {
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: item,
      success: callback
    };

    $.ajax(callSettings);

  };

  const deleteItem = function(id, callback){
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback
    });
  };

  return {
    getItems,
    createItem,
    deleteItem
  };

}());
