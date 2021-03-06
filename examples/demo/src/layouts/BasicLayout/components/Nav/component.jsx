import Nav from '~/components/Nav';
import React from 'react';
import navConfig from '~/config/nav';

function NavBar(props) {
  return (
    <div className="basic-layout-nav">
      <Nav {...props} mode="horizontal" items={navConfig} />
    </div>
  );
}

export default NavBar;
