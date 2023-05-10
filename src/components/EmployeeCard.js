import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const EmployeeCard = ({ id, name, image_url, position, tasks, handlePostData, handleUpdateData, handleDeleteData }) => {

    const [formData, setFormData] = useState("")
    const [showForm, setShowForm] = useState(false);

    const handleTaskComplete = (taskId) => {
        // console.log(taskId);
        fetch(`http://localhost:9292/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ complete: true }),
        })
            .then(res => res.json())
            .then(data => {
                handleUpdateData(data)
            })

    }

    const handleOnClick = () => {
        setShowForm(true)
    }

    const handleChange = (e) => {
        setFormData(e.target.value)
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setShowForm(false)
        const addedTask = { description: formData, complete: false, employee_id: id };

        fetch("http://localhost:9292/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addedTask),
        })
            .then(res => res.json())
            .then(data => {
                handlePostData(data)
                setFormData("")
            })
    }


    const handleTaskDelete = (taskId) => {

            fetch(`http://localhost:9292/tasks/${taskId}`, {
                method: 'DELETE',
            })
            .then(handleDeleteData(taskId))
            
  
    }


    const pendingTasks = tasks.filter(({ complete }) => complete === false);
    const CompletedTasks = tasks.filter(({ complete }) => complete === true);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image_url} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {position}
                </Card.Text>
            </Card.Body>
            <Card.Header>Pending Tasks</Card.Header>
            <ListGroup variant="flush">
                {pendingTasks.map((pendingTask) => {
                    return (
                        <Row key={pendingTask.id}>
                            <ListGroup.Item>{pendingTask.description}</ListGroup.Item>
                            <Button onClick={() => handleTaskComplete(pendingTask.id)}>Finished</Button>
                            <Button onClick={() => handleTaskDelete(pendingTask.id)}>Delete</Button>
                        </Row>

                    )
                })}
            </ListGroup>
            <Card.Header>Completed Tasks</Card.Header>
            <ListGroup variant="flush">
                {CompletedTasks.map((CompletedTask) => {
                    return (
                        <Row key={CompletedTask.id}>
                            <ListGroup.Item key={CompletedTask.id}>{CompletedTask.description}</ListGroup.Item>
                            <Button onClick={() => handleTaskDelete(CompletedTask.id)}>Delete</Button>
                        </Row>

                    )
                })}
            </ListGroup>
            <Card.Body>
                {showForm ? <Col>

                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control value={formData} onChange={handleChange} placeholder="Enter email" />
                        </Form.Group>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Col>

                    : <Button onClick={handleOnClick}>Create Task</Button>}

            </Card.Body>
        </Card>
    );
}

export default EmployeeCard;