import React,{useEffect} from 'react'
import './Home.css'
import { Link,useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {auth,removeCookie} from '../helper/Helper'

function Nav() {
const isAuth = auth()
const navigate = useNavigate()
  const setLogout = () => {
    removeCookie();
    navigate("/login");
  }
  
  useEffect(() => {
    const hamburger_menu = document.querySelector(".hamburger-menu");
    const wrapper = document.querySelector(".wrapper");
hamburger_menu.addEventListener("click", () => {
    wrapper.classList.toggle("active-nav");
  });
}, [])
  return (
      <>
  {!isAuth && <header>
          <div className="container">
            <div className="logo">
            <h1 className='img'>Shortly</h1>
            </div>

            <div className="links">
              <ul>
                <li><Link to="/" className='a'>Home</Link></li>
                <li><Link to="/login" className='a'>Login</Link></li>
                <li><Link to="/signup" className="btn a signup-btn">Sign up</Link></li>
              </ul>
            </div>


            <div className="hamburger-menu">
              <div className="bar"></div>
            </div>
          </div>
        </header>}
          

{isAuth && <header>
          <div className="container">
            <div className="logo">
            <h1 className='img'>Shortly</h1>
            </div>

            <div className="links">
              <ul>
                <li><Link to="/" className='a'>Home</Link></li>
                <li><Link to="/links" className='a'>My Links</Link></li>
                <li><div className='name-div'>
                  <AccountCircleIcon />
                  <h4>{isAuth.name}</h4>
                </div></li>
                <li><button to="/login" className="btn a signup-btn" onClick={setLogout}>Logout</button></li>
              </ul>
            </div>


            <div className="hamburger-menu">
              <div className="bar"></div>
            </div>
          </div>
        </header>}
         
      </>
  )
}

export default Nav