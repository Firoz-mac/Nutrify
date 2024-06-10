import React, { useState,useContext } from 'react'
import { UserContext } from '../Contexts/UserContext';
import { Link,useNavigate } from 'react-router-dom'

function Login() {


    const loggedData = useContext(UserContext)


    const navigate= useNavigate();

    const [loginDetails,setLoginDetails]=useState({
        email:'',
        password:''
    })

    const [message,setMessage]=useState({
        type:'invisible-msg',
        text:''
    })


    function handleInput(event){

        setLoginDetails((previousValue)=>{

            return {...previousValue,[event.target.name]:event.target.value}
        })

    }

    function handleSubmit(event){

        event.preventDefault()
        console.log(loginDetails)

        fetch('http://127.0.0.1:8000/login',{
            method:'POST',
            body:JSON.stringify(loginDetails),
            headers:{
                'Content-type':'application/json'
            }

        })
        .then((response)=>{

            if(response.status===404){

                setMessage({type:'error',text:'Username or Email Doesnt Exist'})
            }
            else if(response.status===403){
                setMessage({type:'error',text:'Incorrect Password'})
            }

                

            setTimeout(()=>{

                setMessage({type:'invisible-msg',text:'dummy text'})

            },5000)

            return response.json();

            
        
        })
        .then((data)=>{

            console.log(data)

            if(data.token!==undefined){

                localStorage.setItem('nutrify-user',JSON.stringify(data));

                loggedData.setLoggedUser(data)

                navigate('/track');

            }else{

                console.log('There is no token is coming')

            }

            

            setLoginDetails({
                email:'',
                password:''
            })

        })
        .catch((err)=>{
            console.log(err)
        })
    }


    return (
        <div>

            <section className='container'>

                <form action="" className='form' onSubmit={handleSubmit}>
                    <h1>Login to Fitness</h1>

                    <input type="email" className='inp' placeholder='Email' name='email' onChange={handleInput} value={loginDetails.email}/>

                    <input type="password" className='inp' placeholder='Password' minLength={8} name='password' onChange={handleInput} value={loginDetails.password}/>


                    <button className='btn'>Login</button>

                    <p>Dont Have A Account? <Link to={'/register'}>Register Now</Link></p>
                    <p className={message.type}>{message.text}</p>

                </form>

            </section>

        </div>
    )
}

export default Login
