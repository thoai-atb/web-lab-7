import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Login.css'

export default function Login() {

    const [usernameRef, passwordRef] = [useRef(), useRef()]
    const formRef = useRef()
    const [errMessage, setErrMessage] = useState()
    const { signin, currentStudent } = useAuth()
    const history = useHistory()

    useEffect(() => {
        if(currentStudent) {
            setErrMessage()
            formRef.current.reset()
            history.push('/')
        }
    }, [currentStudent, history])

    const onSubmit = async (e) => {
        e.preventDefault()
        const resObj = await signin(usernameRef.current.value, passwordRef.current.value)
        if(resObj.err)
            setErrMessage(resObj.err)
    }

    return (
        <div className='login'>
            <form onSubmit={onSubmit} ref={formRef}>
                <h1>Login</h1>
                {
                    errMessage && (
                        <div className='err-msg'>Error: {errMessage}</div>
                    )
                }
                <h2>Username</h2>
                <input type='text' required ref={usernameRef}></input>
                <h2>Password</h2>
                <input type='password' required ref={passwordRef}></input>
                <br></br>
                <div className='footer'>
                    <input type='submit' value='Log In'></input>
                </div>
            </form>
        </div>
    )
}
