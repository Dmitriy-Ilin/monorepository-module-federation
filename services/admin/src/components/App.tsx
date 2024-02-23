import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { deepMerge } from '@packages/shared/src/utils/deepMerge';
import { UserCard } from '@packages/shared/src/components/UserCard';


export const App = () => {
  deepMerge()
  return (
    <div data-testid={'App.DataTestId'}>
      <h1>ADMIN MODULE</h1>
      {/* <Link to={'/about'}>About</Link>
      <br />
      <Link to={'/shop'}>Shop</Link> */}
      <Outlet />
      <UserCard userName={'from admin'}/>
    </div>
  )
}
