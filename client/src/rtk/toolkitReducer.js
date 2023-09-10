import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  favorite: [],
  recent: [],
};

export const setQuantity = createAction('SET_QUANTITY');
export const setSize = createAction('SET_SIZE');
export const addItemToBasket = createAction('ADD_ITEM_TO_BASKET');
export const loadBasketItems = createAction('LOAD_BASKET_ITEMS');
export const addItemToFavorite = createAction('ADD_ITEM_TO_FAVORITE');
export const loadFavoriteItems = createAction('LOAD_FAVORITE_ITEMS');
export const clearItems = createAction('CLEAR_ITEMS');
export const loadRecentItems = createAction('LOAD_RECENT_ITEMS');
export const addRecentItem = createAction('ADD_RECENT_ITEM');

const updateLocalStorage = (localStorageItem, stateItem) => {
  localStorage.removeItem(localStorageItem);
  localStorage.setItem(localStorageItem, JSON.stringify(stateItem));
};

export default createReducer(initialState, {
  [addItemToBasket]: (state, action) => {
    // if (state.items.find((item) => item === action.payload._id)) {
    //   state.items = state.items.filter((item) => item !== action.payload._id);
    // } else {
    //   state.items = [...state.items, action.payload._id];
    // }
    // updateLocalStorage('basket', state.items);
    if (state.items.find((item) => item._id === action.payload._id)) {
      console.log('im here!');
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    } else {
      console.log('im here!');
      console.log(state.items);
      const newItem = {
        _id: action.payload._id,
        quantity: action.payload.quantity,
        size: action.payload.size,
      };
      state.items = [...state.items, newItem];
      console.log(state.items);
    }
    updateLocalStorage('basket', state.items);
  },
  [loadBasketItems]: (state) => {
    const basket = JSON.parse(localStorage.getItem('basket'));
    if (basket) {
      state.items = basket;
    }
  },
  [setQuantity]: (state, action) => {
    state.items = state.items.map((item) => {
      if (item._id === action.payload._id) {
        item.quantity = action.payload.quantity;
      }
      return item;
    });
    updateLocalStorage('basket', state.items);
  },
  [setSize]: (state, action) => {
    state.items = state.items.map((item) => {
      if (item._id === action.payload.id) {
        item.size = action.payload.size;
      }
      return item;
    });
    updateLocalStorage('basket', state.items);
  },
  [clearItems]: (state) => {
    state.items = [];
    updateLocalStorage('basket', state.items);
  },
  [addItemToFavorite]: (state, action) => {
    if (state.favorite.find((item) => item._id === action.payload._id)) {
      state.favorite = state.favorite.filter(
        (item) => item._id !== action.payload._id
      );
    } else {
      state.favorite = [...state.favorite, action.payload];
    }
    updateLocalStorage('favorite', state.favorite);
  },
  [loadFavoriteItems]: (state) => {
    const favoriteItems = JSON.parse(localStorage.getItem('favorite'));
    if (favoriteItems) {
      state.favorite = favoriteItems;
    }
  },
  [loadRecentItems]: (state) => {
    const recentItems = JSON.parse(localStorage.getItem('recent'));
    if (recentItems) {
      state.recent = recentItems;
    }
  },
  [addRecentItem]: (state, action) => {
    if (state.recent.filter((el) => el._id === action.payload._id).length > 0) {
      return;
    }
    if (state.recent.length > 3) {
      state.recent.unshift(action.payload);
      state.recent.pop();
    } else {
      state.recent.unshift(action.payload);
    }
    updateLocalStorage('recent', state.recent);
  },
});
