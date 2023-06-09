import React from 'react'
import EmployeeCard from './EmployeeCard'
import { Row } from 'react-bootstrap';


const Employees = ({ employeesData, handlePostData, handleUpdateData, handleDeleteData, presetFormData }) => {

    const employees = employeesData.map(({ id, name, image_url, position, tasks }) => {
        return (
            <EmployeeCard
                key={id}
                id={id}
                name={name}
                image_url={image_url}
                position={position}
                tasks={tasks}
                handlePostData={handlePostData}
                handleUpdateData={handleUpdateData}
                handleDeleteData={handleDeleteData}
                presetFormData={presetFormData}
            />
        )
    })
// console.log(employees);
    return (
        <Row xs={1} md={2} className="g-4 justify-content-center" >
            {employees}
        </Row>



    )
}

export default Employees