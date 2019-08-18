import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/collection-item.component';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

/* The 'routeName' we're destructuring below comes from the Elements we've inside the 'collections' 
portion of the 'shop' REDUCER, so this 'routeName' is equal to 'hats' or 'sneakers' or 'jackets' or
'womens' or 'mens' pretty much */
export const CollectionPreview = ({
  title,
  items,
  history,
  match,
  routeName
}) => (
  <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
