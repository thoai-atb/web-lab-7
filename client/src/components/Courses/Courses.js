import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Courses.css'

export default function Courses() {
    const {currentStudent, logout} = useAuth()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    
    const checkboxChanged = (e, courseID) => {
        setLoading(true)
        const data = {
            StudentID: currentStudent.StudentID,
            CourseID: courseID,
            Value: e.target.checked
        }
        const fetchUpdate = async () => {
            await fetch(`/registration/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const fetchData = async () => {
                const res = await fetch(`/courses/${currentStudent.StudentID}`)
                const data = await res.json()
                setCourses(data)
            }
            fetchData()
        }
        fetchUpdate()
    }

    useEffect(() => {
        setLoading(false)
    }, [courses])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/courses/${currentStudent.StudentID}`)
            const data = await res.json()
            setCourses(data)
        }
        fetchData()
    }, [currentStudent])

    return (
        <div className='page'>
            <h1>Course Registration</h1>
            <div className='subtitle'>
                <p>🖐Hi, <em>{currentStudent.StudentName}</em> (<span className='logout' onClick={() => logout()}>Log Out</span>), register your courses here:</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Course ID</td>
                        <td>Course Name</td>
                        <td>Selected</td>
                    </tr>
                </thead>
                <tbody>
                {
                    courses.map((course, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{course.CourseID}</td>
                                <td className='name'>{course.CourseName}</td>
                                <td><input type='checkbox' checked={course.Selected === 1} onChange={(e) => checkboxChanged(e, course.CourseID)}></input></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className='footer'>
                {
                    loading ? <p className='msg-suc'>saving registration ...</p> : <p className='msg'>Courses will automatically saved after ticking the checkboxes</p>
                }
                <div>
                    <Link to='/profile'>Back to Profile</Link>
                </div>
            </div>
        </div>
    )
}
