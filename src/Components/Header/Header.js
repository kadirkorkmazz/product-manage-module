import { Outlet, NavLink } from 'react-router-dom';
import './Header.css';
import { Button } from 'primereact/button';

import React from 'react';

function Header() {
  return (
    <div>
      <header>
        <div className='navi'>
          <NavLink className='nav_link' to='products'>
            <Button
              label='Ürünler'
              className=' p-button-raised p-button-info'
            ></Button>
          </NavLink>
          <NavLink className='nav_link' to='posts'>
            <Button
              label='Gönderiler'
              className='p-button-raised p-button-info'
            ></Button>
          </NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
