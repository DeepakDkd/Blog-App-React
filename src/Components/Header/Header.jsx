import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status)
  const [menu, setMenu] = useState(false)
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'SignUp',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All-Post',
      slug: '/allpost',
      active: authStatus
    },
    {
      name: 'Add-Post',
      slug: '/addpost',
      active: authStatus
    }
  ]
  return (
    <header onClick={() => {
      {
        menu ? setMenu(false) : null
      }
    }}>
      <Link to='/'>
        <Logo />
      </Link>


      <nav>
        {
          navItems.map((item) =>
            item.active ? (
              <button key={item.name}
                onClick={() => navigate(item.slug)}
                className="button-89" >
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) => (
                    isActive ? "activetab " : ""
                  )} >
                  {item.name}

                </NavLink>
              </button>
            ) : null)
        }
        {authStatus && (<LogoutBtn />)}

      </nav>
      {menu &&
        <div className="hamburger">
          {
            navItems.map((item) =>
              item.active ? (
                <button key={item.name}
                  onClick={() => { navigate(item.slug); setMenu(false) }}
                  className="button-89" >

                  {item.name}

                </button>
              ) : null)
          }
          {authStatus && (<LogoutBtn />)}
        </div>
      }
      <i className={menu ? "ri-menu-5-fill menu" : "ri-menu-3-line menu"} onClick={() => setMenu((prev) => !prev)} ></i>
    </header>
  )
}

export default Header
