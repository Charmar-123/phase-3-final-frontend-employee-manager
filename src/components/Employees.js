import React from 'react'
import EmployeeCard from './EmployeeCard'
import { Row } from 'react-bootstrap';


const Employees = ({ employeeData }) => {
    console.log(employeeData);

    const employees = employeeData.map(({ id, name, image_url, position, tasks }) => {
        return (
            <EmployeeCard
                key={id}
                name={name}
                image_url={image_url}
                position={position}
                tasks={tasks}
            />
        )
    })

    return (
        <Row xs={1} md={2} className="g-4 justify-content-center" >

            {employees}
        </Row>



    )
}

export default Employees