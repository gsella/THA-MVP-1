import React from 'react';
import { Route } from 'react-router-dom';
import HeaderWrapperContainer from 'components/common/header-wrapper/HeaderWrapperContainer';

const HeaderWrapperRoute = props => {
  const { component: Component, ...rest } = props;

  return (
    <HeaderWrapperContainer>
      <Route
        {...rest}
        render={routeProps => {
          return <Component {...routeProps} />;
        }}
      />
    </HeaderWrapperContainer>
  );
};

export default HeaderWrapperRoute;
