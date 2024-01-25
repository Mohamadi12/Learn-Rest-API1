import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// "react-toastify" est utilisée pour afficher des notifications à l'utilisateur
import { toast } from 'react-toastify'
// redux et thunk
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


const Login = () => {
    const[formData, setFormData]=useState({
        email:'',
        password:'',
    })
    const{ email,password }=formData

        // La navigate voir les redirection
        const navigate=useNavigate()

        // Distribué les stock de données
        const dispatch=useDispatch()
    
        // Les données stockées qu'on veut utilisé dans le magasin store
        const { user, isLoading, isSuccess, message, isError }=useSelector((state)=>state.auth)

            // Les validations
    useEffect(()=>{
        // Ici c'est la partie rejected qu'il consomme
        if(isError){
            toast.error(message)
        }

        // Ici c'est la partie fulfilled qu'il consomme et navigue vers la page principale 
        if(isSuccess || user){
            navigate('/')
        }
        // Si les conditions echoue
        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        const userData={ 
            email, 
            password
        }

        // register vient de register de authSlice de thunk
        dispatch(login(userData))
    }

     //    Mise en attente
    if(isLoading){
        return <Spinner/>
     }

  return (
    <>
      <section className="heading">
        <h1>
            <FaSignInAlt/>Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                   type="email" 
                   className="form-control" 
                   id='email' 
                   name='email' 
                   value={email} 
                   placeholder='Enter your email...'
                   onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input 
                   type="password" 
                   className="form-control" 
                   id='password' 
                   name='password' 
                   value={password} 
                   placeholder='Enter password...'
                   onChange={onChange}
                />
            </div>

            <div className="form-group">
                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
            </div>
        </form>
      </section>
    </>
  )
}

export default Login

