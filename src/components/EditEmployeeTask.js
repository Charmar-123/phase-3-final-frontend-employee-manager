
import { Button, Form, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';


const EditEmployeeTask = ({ newTaskEmployeeData, handleUpdateData }) => {

    const navigate = useNavigate();

    const { task_id } = useParams();
    const { position, name, image_url, tasks } = newTaskEmployeeData;


    // find task index from id

    const taskToEdit = tasks.find(t => t.id === parseInt(task_id))
    const taskToEditDescription = taskToEdit.description;
    const taskToEditComplete = taskToEdit.complete;


    const [editedTask, setEditedTask] = useState("");


    useEffect(() => {
        setEditedTask(taskToEditDescription)
    }, [taskToEditDescription])
    // console.log(editedTask);

    const formStyle = {
        border: '1px solid #ddd',
        padding: '20px',
        width: '25rem'
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:9292/tasks/${task_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ complete: taskToEditComplete, description: editedTask }),
        })
            .then(res => res.json())
            .then(data => {
                handleUpdateData(data)
                navigate('/employees')
            })

    }


    return (
        <div className="d-flex justify-content-center" >
            <Form style={formStyle} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        disabled
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type="text"
                        value={position}
                        disabled
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Image src={image_url} style={{ width: '18rem' }} />
                </Form.Group>

                <Form.Label>Edit task</Form.Label>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        value={editedTask}
                        style={{ resize: 'none', height: 'auto' }}
                        onChange={(event) => setEditedTask(event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>

    )
}

export default EditEmployeeTask