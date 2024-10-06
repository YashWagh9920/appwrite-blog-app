import React from 'react'
import { Logo,LogoutBtn,Container } from "../index";
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authstatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active:true
    },
    {
      name: "Login",
      slug: "/login",
      active:!authstatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authstatus
    },
    {
      name: "Your Posts",
      slug: "/your-posts",
      active:authstatus
    },
    {
      name: "Add post",
      slug: "/add-post",
      active:authstatus
    }
  ]
  return (
    <div className='py-3 shadow bg-slateBlue'>
      <Container>
        <nav className='flex'>
        <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'height='5px'/>
              </Link>
          </div>
          <ul className='flex ml-auto gap-2'>
           {
            navItems.map((item)=>
               item.active ? 
               <li key={item.name}>
                <NavLink
                to={item.slug}
                className={({isActive}) => 
                  isActive ? 'text-white inline-block px-6 py-2 duration-200 rounded-full bg-gray-800 hover:bg-gray-700' 
                           : 'text-white inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-600'}                               
            >{item.name}
             </NavLink>
             </li> : null)
            }
            {authstatus && <li><LogoutBtn/></li>}
          </ul>
        </nav>
      </Container>
    </div>
  )
}

export default Header
