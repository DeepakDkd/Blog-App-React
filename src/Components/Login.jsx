import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../Store/authSlice'
import { useForm } from 'react-hook-form'
import { Input } from './index'
import authService from '../appwrite/auth'
import { Loader } from './'

function Login() {

    const navigate = useNavigate()
    const Dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            setLoading(true)
            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) Dispatch(authLogin({ userData }));
                navigate('/')
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setError(error.message)

        }
    }

    return loading ? (<Loader />) : (

        <div className="LoginForm">

            <h2>Login your account</h2>
            {error && <p className='errormsg'>{error}</p>}
            <form onSubmit={handleSubmit(login)}>
                <Input type="email"
                    // label="Email :"
                    placeholder='Email address'
                    {...register('email', {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || "Enter a valid email address"
                        }
                    })}
                />

                <Input type="password"
                    // label='Password :'
                    placeholder='Enter your password '
                    {...register('password', {
                        required: true
                    })}

                />
                <button className='LoginBtn' type='submit' >Login</button>

            </form>

            <div className="SignUpLink">
                <Link to='/signup'>
                    <p>Don&apos;t have any account?&nbsp;
                        Sign Up!
                    </p>
                </Link>
            </div>

        </div>

    )
}

export default Login