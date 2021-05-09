import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Courses.css'

export default function Courses() {
    const { currentStudent, logout } = useAuth()
    const [courses, setCourses] = useState([])

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
                        <td>Name</td>
                        <td>Selected</td>
                    </tr>
                </thead>
                <tbody>
                {
                    courses.map((course, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td className='name'>{course.CourseName}</td>
                                <td><input type='checkbox'></input></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className='courses-footer'>
                <button>Save</button>
                <button>Refresh</button>
            </div>
        </div>
    )
}
