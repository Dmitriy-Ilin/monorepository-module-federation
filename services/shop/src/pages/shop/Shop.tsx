import React from 'react'
import { adminRoutes } from '@packages/shared/src/routes/admin';
import { shopRoutes } from '@packages/shared/src/routes/shop';
import { Link } from 'react-router-dom';

const Shop = () => {
  return (
    <>
      <h1>Shop</h1>
      <div>
        <Link to={shopRoutes.second}>second page</Link>
      </div>
    </>
  )
}

export default Shop