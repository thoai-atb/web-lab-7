import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PrivateRoute({ component: Component, ...rest}) {

    const { currentStudent } = useAuth()

    return (
        <Route
            {...rest}
            render = {
                props => {
                    return currentStudent ? <Component {...props} />: <Redirect to="/login" />
                }
            }
        />
    )
}
