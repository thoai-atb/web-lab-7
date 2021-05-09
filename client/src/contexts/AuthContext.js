import React, { useContext, useState, useEffect, useRef } from 'react'
import { useCookies } from 'react-cookie'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(['studentid'])
    const [currentStudent, setCurrentStudent] = useState()
    const previous = useRef()

    const signin = async (username, password) => {
        const data = {
            username: username,
            password: password
        }

        const res = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const resObj = await res.json()

        if (!resObj.err) {
            setCookie('studentid', username, { path : '/'})
            setCurrentStudent(resObj.student)
        }
        return resObj
    }

    const logout = async () => {
        removeCookie('studentid')
        setCurrentStudent()
    }

    previous.current = {
        cookies: cookies,
        signin: signin
    } 

    useEffect(() => {
        if(!currentStudent && previous.current.cookies.studentid) {
            previous.current.signin(previous.current.cookies.studentid, previous.current.cookies.studentid)
        }
    }, [currentStudent])

    const value = {
        currentStudent,
        signin,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
