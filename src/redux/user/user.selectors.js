import { createSelector } from 'reselect';

const selectUser = state => state.user;

/* The Function that we pass as second argument to 'createSelector' takes as argument what is RETURNED from the
'selectUser' Input Selector we defined above and that we pass as element of the Array we pass as first argument
to the 'createSelector', that is the 'user' reducer pretty much */
export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);
