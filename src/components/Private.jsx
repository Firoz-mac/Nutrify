import React from 'react'
import { UserContext } from '../Contexts/UserContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom';

function Private(props) {

    let loggedData= useContext(UserContext);


  return (
    loggedData.loggedUser!==null?
    <props.Component/>
    :
    <Navigate to={'/login'}/>
  )
}

export default Private
