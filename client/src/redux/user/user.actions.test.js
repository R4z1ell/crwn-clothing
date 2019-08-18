import UserActionTypes from './user.types';

import {
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailure,
  checkUserSession,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpStart,
  signUpSucccess,
  signUpFailure
} from './user.actions';

describe('googleSignInStart action', () => {
  it('should create the googleSignInStart action', () => {
    expect(googleSignInStart().type).toEqual(
      UserActionTypes.GOOGLE_SIGN_IN_START
    );
  });
});

describe('emailSignInStart action', () => {
  it('should create the emailSignInStart action', () => {
    const mockEmailAndPassword = {
      email: 'test@gmail.com',
      password: 'asdasd'
    };

    const action = emailSignInStart(mockEmailAndPassword);

    expect(action.type).toEqual(UserActionTypes.EMAIL_SIGN_IN_START);
    expect(action.payload).toEqual(mockEmailAndPassword);
  });
});

describe('signInSuccess action', () => {
  it('should create the signInSuccess action', () => {
    const mockUser = { id: 1, displayName: 'Yihua' };

    const action = signInSuccess(mockUser);

    expect(action.type).toEqual(UserActionTypes.SIGN_IN_SUCCESS);
    expect(action.payload).toEqual(mockUser);
  });
});

describe('signInFailure action', () => {
  it('should create the signInFailure action', () => {
    const action = signInFailure('errored');

    expect(action.type).toEqual(UserActionTypes.SIGN_IN_FAILURE);
    expect(action.payload).toEqual('errored');
  });
});

describe('checkUserSession action', () => {
  it('should create the checkUserSession action', () => {
    expect(checkUserSession().type).toEqual(UserActionTypes.CHECK_USER_SESSION);
  });
});

describe('signOutStart action', () => {
  it('should create the signOutStart action', () => {
    expect(signOutStart().type).toEqual(UserActionTypes.SIGN_OUT_START);
  });
});

describe('signOutSuccess action', () => {
  it('should create the signOutSuccess action', () => {
    expect(signOutSuccess().type).toEqual(UserActionTypes.SIGN_OUT_SUCCESS);
  });
});

describe('signOutFailure action', () => {
  it('should create the signOutFailure action', () => {
    const action = signOutFailure('errored');

    expect(action.type).toEqual(UserActionTypes.SIGN_OUT_FAILURE);
    expect(action.payload).toEqual('errored');
  });
});

describe('signUpStart action', () => {
  it('should create the signUpStart action', () => {
    const mockUserCredentials = {
      email: 'jack@gmail.com',
      password: 'asdasd',
      displayName: 'Jack'
    };

    const action = signUpStart(mockUserCredentials);

    expect(action.type).toEqual(UserActionTypes.SIGN_UP_START);
    expect(action.payload).toEqual(mockUserCredentials);
  });
});

describe('signUpSucccess action', () => {
  it('should create the signUpSucccess action', () => {
    const action = signUpSucccess({
      user: '',
      additionalData: {}
    });

    expect(action.type).toEqual(UserActionTypes.SIGN_UP_SUCCESS);
    expect(action.payload).toEqual({
      user: '',
      additionalData: {}
    });
  });
});

describe('signUpFailure action', () => {
  it('should create the signUpFailure action', () => {
    const action = signUpFailure('errored');

    expect(action.type).toEqual(UserActionTypes.SIGN_UP_FAILURE);
    expect(action.payload).toEqual('errored');
  });
});
