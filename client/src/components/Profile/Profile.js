import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Profile.css'

export default function Profile() {

    const { logout, currentStudent } = useAuth()
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await fetch(`/courses/registered/${currentStudent.StudentID}`)
            const data = await res.json()
            setCourses(data)
        }
        fetchCourses()
    }, [currentStudent])

    return (
        <div>
            <h1>Profile</h1>
            <div className='subtitle'>
                <p>🖐Hi, <em>{currentStudent.StudentName}</em> (<span className='logout' onClick={() => logout()}>Log Out</span>). This is your profile:</p>
                <div className='profile-info'>
                    <div className='profile-info-row'>
                        <div className='profile-info-data'><p><strong>Name:</strong></p></div>
                        <div className='profile-info-data'><p>{currentStudent.StudentName}</p></div>
                    </div>
                    <div className='profile-info-row'>
                        <div className='profile-info-data'><p><strong>ID:</strong></p></div>
                        <div className='profile-info-data'><p>{currentStudent.StudentID}</p></div>
                    </div>
                </div>
                <p>Courses you have registered ({courses.length})</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Course ID</td>
                        <td>Course Name</td>
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
                            </tr>
                        )
                    })
                }
                {
                    courses.length === 0 && (
                        <tr key={-1}>
                            <td colSpan={3}>No Courses Registered</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
            <div className='footer'>
                <div>
                    <Link to='/courses'>Register Courses</Link>
                </div>
            </div>
        </div>
    )
}
