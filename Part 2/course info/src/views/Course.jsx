import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'
import Total from '../components/Total'

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => (
                <div key={course.id}>
                    <Header name={course.name}></Header>
                    <Content parts={course.parts}></Content>
                    <Total parts={course.parts}></Total>
                </div>
            ))}
        </div>
    )
}

export default Course