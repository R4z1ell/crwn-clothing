import { takeLatest, put, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSucccess,
  signUpFailure
} from './user.actions';

import {
  auth,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

import {
  getSnapshotFromUserAuth,
  signInWithGoogle,
  signInWithEmail,
  isUserAuthenticated,
  signOut,
  signUp,
  signInAfterSignUp,
  onGoogleSignInStart,
  onEmailSignInStart,
  onCheckUserSession,
  onSignOutStart,
  onSignUpStart,
  onSignUpSuccess
} from './user.sagas';

describe('on signup success saga', () => {
  it('should trigger on SIGN_UP_SUCCESS', () => {
    const generator = onSignUpSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
    );
  });
});

describe('on signup start saga', () => {
  it('should trigger on SIGN_UP_START', () => {
    const generator = onSignUpStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_START, signUp)
    );
  });
});

describe('on signout start saga', () => {
  it('should trigger on SIGN_UP_START', () => {
    const generator = onSignOutStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
    );
  });
});

describe('on check user session saga', () => {
  it('should trigger on CHECK_USER_SESSION', () => {
    const generator = onCheckUserSession();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
    );
  });
});

describe('on email sign in start saga', () => {
  it('should trigger on EMAIL_SIGN_IN_START', () => {
    const generator = onEmailSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
    );
  });
});

describe('on google sign in start saga', () => {
  it('should trigger on GOOGLE_SIGN_IN_START', () => {
    const generator = onGoogleSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
    );
  });
});

describe('sign in after sign up saga', () => {
  it('should fire getSnapshotFromUserAuth', () => {
    const mockUser = {};
    const mockAdditionalData = {};
    const mockAction = {
      payload: {
        user: mockUser,
        additionalData: mockAdditionalData
      }
    };

    const generator = signInAfterSignUp(mockAction);
    expect(generator.next().value).toEqual(
      getSnapshotFromUserAuth(mockUser, mockAdditionalData)
    );
  });
});

describe('sign up saga', () => {
  const mockEmail = 'cindy@gmail.com';
  const mockPassword = 'test123';
  const mockDisplayName = 'cindy';

  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName
    }
  };

  const generator = signUp(mockAction);

  it('should call auth.createUserWithEmailAndPassword', () => {
    const createUserWithEmailAndPassword = jest.spyOn(
      auth,
      'createUserWithEmailAndPassword'
    );
    generator.next();
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should fire signUpSucccess if there is an user', () => {
    const mockUser = {
      email: mockEmail,
      password: mockPassword
    };

    expect(
      generator.next({
        mockUser,
        additionalData: { displayName: mockDisplayName }
      }).value
    ).toEqual(
      put(
        signUpSucccess({
          mockUser,
          additionalData: { displayName: mockDisplayName }
        })
      )
    );
  });

  it('should fire signUpFailure if signUpSucccess throws an error', () => {
    const newGenerator = signUp(mockAction);
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(signUpFailure('error'))
    );
  });
});

describe('sign out saga', () => {
  const generator = signOut();

  it('should call auth.signOut', () => {
    const expectSignOut = jest.spyOn(auth, 'signOut');
    generator.next();
    expect(expectSignOut).toHaveBeenCalled();
  });

  it('should call signOutSuccess', () => {
    expect(generator.next().value).toEqual(put(signOutSuccess()));
  });

  it('should call signOutFailure on error', () => {
    const newGenerator = signOut();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(signOutFailure('error'))
    );
  });
});

describe('is user authenticated saga', () => {
  const generator = isUserAuthenticated();

  it('should call getCurrentUser', () => {
    expect(generator.next().value).toEqual(getCurrentUser());
  });

  it('should call getSnapshotFromUserAuth if userAuth exists', () => {
    const mockUserAuth = { uid: '123da' };
    expect(generator.next(mockUserAuth).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });

  it('should call signInFailure on error', () => {
    const newGenerator = isUserAuthenticated();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(signInFailure('error'))
    );
  });
});

describe('sign in with email saga', () => {
  const mockEmail = 'mark@gmail.com';
  const mockPassword = 'test123';

  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword
    }
  };

  const generator = signInWithEmail(mockAction);

  it('should call auth.signInWithEmailAndPassword', () => {
    const signInWithEmailAndPassword = jest.spyOn(
      auth,
      'signInWithEmailAndPassword'
    );
    generator.next();
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  it('should call signInFailure on error', () => {
    const newGenerator = signInWithEmail(mockAction);
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(signInFailure('error'))
    );
  });
});

describe('sign in with Google saga', () => {
  const generator = signInWithGoogle();

  it('should call auth.signInWithPopup', () => {
    const signInWithPopup = jest.spyOn(auth, 'signInWithPopup');
    generator.next();
    expect(signInWithPopup).toHaveBeenCalled();
  });

  it('should call getSnapshotFromUserAuth', () => {
    const mockUser = {
      email: 'jack@gmail.com',
      password: 'test123'
    };

    expect(generator.next(mockUser).value).toEqual(getSnapshotFromUserAuth());
  });

  it('should call signInFailure on error', () => {
    const newGenerator = signInWithGoogle();
    newGenerator.next();
    expect(newGenerator.throw('error').value).toEqual(
      put(signInFailure('error'))
    );
  });
});

describe('get snapshot from userAuth', () => {
  const mockUserAuth = {};
  const mockAdditionalData = {};
  const generator = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);

  expect(generator.next().value).toEqual(
    call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
  );
});
