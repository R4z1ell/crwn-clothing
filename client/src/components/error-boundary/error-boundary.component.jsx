import React, { Component } from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from './error-boundary.styles';

/* In order for React to KNOW that this is an 'error-boundary' Component we have to use either one or BOTH
the 'static getDerivedStateFromError' and the 'componentDidCatch' Lifecycle methods. We use this Component
to pretty much show a UI representation if something goes wrong(if the 'hasErrored' in the state is TRUE), 
in our case as we can see we show an Image and a 'Sorry this page is broken' message */
class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  /* When ANY Children Component of this 'ErrorBoundary' Component throws an ERROR, that error gets passed
  inside this 'getDerivedStateFromError' Lifecycle method from where we HAVE to return an OBJECT that
  represent the NEW state of the 'ErrorBoundary' Component itself. This method is the MOST important because
  if we DON'T use it we will NOT be able to tell WHICH Component as actually thrown the ERROR. This method
  allow us to CATCH the error ahead of time when it gets thrown inside of ANY Children Component nested INSIDE
  this 'ErrorBoundary' Component */
  static getDerivedStateFromError(error) {
    // Here we SET the 'state' we defined above when an error occur
    return { hasErrored: true };
  }

  // The 'info' property below will give us the NAME of the actual Component that has thrown the 'error'
  componentDidCatch(error, info) {
    console.log(info);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
