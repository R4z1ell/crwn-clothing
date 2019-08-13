import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

/* This 'selectCollection' Selector we create here below make use of the CARRYING technique in JavaScript. 
Currying is a technique of evaluating a Function that takes in MULTIPLE arguments, and transforming this 
Function into a SEQUENCE of Function that only take a SINGLE argument. In other words, when a function instead 
of taking ALL arguments at one time, takes the FIRST one and return a NEW function that takes the SECOND argument
and returns a new function which takes the third one, and so forth, until all arguments have been fulfilled. */
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !shop.collections
);
