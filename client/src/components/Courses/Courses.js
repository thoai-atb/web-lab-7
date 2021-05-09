import React, { useState, useEffect } from 'react'
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
        <div className='courses'>
            <h1>Course Registration</h1>
            <div className='courses-subtitle'>
                <p>🖐Hi, <em>{currentStudent.StudentName}</em> (<span className='logout' onClick={() => logout()}>Log Out</span>), register your courses here:</p>
            </div>
            <table className='course-table'>
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
            <div className='courses-footer'>
                {
                    loading && <p className='msg'>saving registration ...</p>
                }
            </div>
        </div>
    )
}
