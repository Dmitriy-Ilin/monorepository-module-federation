import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { adminRoutes } from '@packages/shared/src/routes/admin';
import { shopRoutes } from '@packages/shared/src/routes/shop';


export const App = () => {

  return (
    <div data-testid={'App.DataTestId'}>
      <h1>PAGES</h1>
      <Link to={adminRoutes.admin}>Admin</Link>
      <br />
      <Link to={shopRoutes.main}>Shop</Link>
      {/* <Link to={'/admin'}>Admin</Link>
      <br />
      <Link to={'/shop/main'}>Shop</Link> */}
      <Outlet />
    </div>
  )
}
