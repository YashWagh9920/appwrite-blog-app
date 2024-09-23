import React from 'react'
import { Logo,LogoutBtn,Container } from "../index";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authstatus = useSelector((state) => state.auth.status)
   const navigate = useNavigate()

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
      name: "All posts",
      slug: "/all-posts",
      active:authstatus
    },
    {
      name: "Add post",
      slug: "/add-post",
      active:authstatus
    }
  ]
  return (
    <div className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
        <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
              </Link>
          </div>
          <ul className='flex ml-auto'>
           {
            navItems.map((item)=>
               item.active ? 
               <li key={item.name}>
                <button
                className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100'
             onClick={ ()=> navigate(item.slug)}>{item.name}
             </button>
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
