import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

import WithSpinner from './../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

/* This 'isLoading' property below we just created inside the 'mapStateToProps' is going to be passed inside
the 'WithSpinner' HOC(High Order Component) that is EXPECTING to receive a property named 'isLoading', so that's 
why here below we NEED to name this property EXACTLY 'isLoading' */
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

/* Functions will evaluate from the INSIDE OUT. So what will happen is that the 'WithSpinner' HOC will FIRST
wrap the 'CollectionsOverview' Component giving us back a MODIFIED version of the 'CollectionsOverview' Component 
that is what we then pass to the 'connect' HOC(coming from 'react-redux') that will give us access to the 'isLoading' 
property we just created inside the 'mapStateToProps', that is what we need to pass into the 'WithSpinner' HOC */
// const CollectionsOverviewContainer = connect(mapStateToProps)(
//   WithSpinner(CollectionsOverview)
// );

/* This 'compose' below is a UTILITY Function(coming from 'redux') that allows us to evaluate MULTIPLE 
"Curried Functions"(Functions that return ANOTHER Function that EXPECT something to be passed to it) and 
CHAIN them as we're doing below. So what we've written below is the EXACT same thing as the one above, it
just give us a BETTER and more CLEAN way to write it pretty much */
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
