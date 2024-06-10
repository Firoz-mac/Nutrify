import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

  const [userDetails,setUserDetails]=useState({
    name:'',
    email:'',
    password:'',
    age:''
  })


  const [message,setMessage]=useState({
    type:'invisible-msg',
    text:''
  })

  function handleInput(event)
  {

    setUserDetails((previousValue)=>{
      
      return {...previousValue,[event.target.name]:event.target.value}
    })



  }


  function handleSubmit(event)
  {
    event.preventDefault()
    console.log(userDetails)

    fetch('http://127.0.0.1:8000/register',{
      method:'POST',
      body:JSON.stringify(userDetails),
      headers:{
        'Content-type':'application/json'
      }
    })
    .then((response)=>response.json())
    .then((data)=>{
      setMessage({type:'success',text:data.message})

      setUserDetails({
        name:'',
        email:'',
        password:'',
        age:''
      })


      setTimeout(()=>{

        setMessage({type:'invisible-msg',text:'dummy text'})

      },5000)

    })
    .catch((err)=>{

      console.log(err)

    })

  }




  return (
    <section className='container'>

      <form action="" className='form' onSubmit={handleSubmit}>
        <h1>Start Your Fitness</h1>

        <input type="text" className='inp' placeholder='Name' name='name' required onChange={handleInput} value={userDetails.name}/>

        <input type="email" className='inp' placeholder='Email' name='email' required onChange={handleInput} value={userDetails.email}/>

        <input type="password" className='inp' placeholder='Password' name='password' minLength={8} required onChange={handleInput} value={userDetails.password}/>

        <input type="number" className='inp' placeholder='Age' name='age' required min={12} onChange={handleInput} value={userDetails.age}/>

        <button className='btn'>Join</button>

        <p>Already Registerd? <Link to={'/login'}>Login</Link></p>
        <p className={message.type}>{message.text}</p>

      </form>

    </section>
  )
}

export default Register
