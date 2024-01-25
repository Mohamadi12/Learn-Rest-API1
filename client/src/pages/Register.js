import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// "react-toastify" est utilisée pour afficher des notifications à l'utilisateur
import { toast } from 'react-toastify'
// redux et thunk
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


const Register = () => {
    const[formData, setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    const{ name,email,password,password2 }=formData

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
            [e.target.name]:e.target.value,
        }))
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        // Verification ou confirmation avant validation
        if(password !==password2){
            toast.error('Passwords do not match')
        }else{
            const userData={ 
                name, 
                email, 
                password
            }

            // register vient de register de authSlice de thunk
            dispatch(register(userData))
        }
    }

       //    Mise en attente
       if(isLoading){
        return <Spinner/>
    }
    
  return (
    <>
      <section className="heading">
        <h1>
            <FaUser/>Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                   type="text" 
                   className="form-control" 
                   id='name' 
                   name='name' 
                   value={name} 
                   placeholder='Enter your name...'
                   onChange={onChange}
                />
            </div>
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
                <input 
                   type="password" 
                   className="form-control" 
                   id='password2' 
                   name='password2' 
                   value={password2} 
                   placeholder='Confirm password...'
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

export default Register
