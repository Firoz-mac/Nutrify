import React from 'react'
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

    const loggedData= useContext(UserContext)
    const navigate=useNavigate();


    function logout(){

        localStorage.removeItem('nutrify-user');
        loggedData.setLoggedUser(null)
        navigate('/login')

    }


  return (
    <div className='nav-bg'>
      <ul className='nav-ul1'>
        <li className='title-nav'>Nutrify</li>
        <Link to={'/track'}><li>Track</li></Link>
        <Link to={'/diet'}><li>Diet</li></Link>
        
      </ul>
      <ul className='nav-ul2'>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  )
}

export default Header
