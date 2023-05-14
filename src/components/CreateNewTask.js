import React from 'react'
import { useState } from 'react';
import { Card, ListGroup, Row, Form, Button, Container } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

const CreateNewTask = ({ newTaskEmployeeData, handlePostTaskData }) => {
    // console.log(newTaskEmployeeData);

    const navigate = useNavigate();

    const { id, position, name, image_url, tasks } = newTaskEmployeeData
    const pendingTasks = tasks.filter(({ complete }) => complete === false);
    const CompletedTasks = tasks.filter(({ complete }) => complete === true);

    const [newTasks, setNewTasks] = useState([""]);

    const handleAddTask = () => {
        setNewTasks([...newTasks, ""]);
    };

    const handleTaskChange = (index, value) => {
        const updatedTasks = [...newTasks];
        updatedTasks[index] = value;
        setNewTasks(updatedTasks);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:9292/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, newTasks: newTasks }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                handlePostTaskData(data)
                setNewTasks([""])
                navigate("/employees")
            })
    }
    return (
        <div className="d-flex justify-content-center" >
            <Card className="mx-auto" style={{ width: '18rem' }}>
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
                            <Container style={{ width: '18rem' }}>
                                <Row key={pendingTask.id}>
                                    <ListGroup.Item>{pendingTask.description}</ListGroup.Item>
                                </Row>
                            </Container>


                        )
                    })}
                </ListGroup>
                <Card.Header>Completed Tasks</Card.Header>
                <ListGroup variant="flush">
                    {CompletedTasks.map((CompletedTask) => {
                        return (
                            <Container style={{ width: '18rem' }}>
                                <Row key={CompletedTask.id}>
                                    <ListGroup.Item key={CompletedTask.id}>{CompletedTask.description}</ListGroup.Item>
                                </Row>
                            </Container>


                        )
                    })}
                </ListGroup>
                <Card.Body>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group>
                            <Form.Label>Tasks</Form.Label>
                            {newTasks.map((task, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    placeholder={`Enter task ${index + 1}`}
                                    value={task}
                                    onChange={(event) => handleTaskChange(index, event.target.value)}
                                />
                            ))}
                            <Button variant="secondary" onClick={handleAddTask}>
                                Add Task
                            </Button>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>

                    </Form>

                </Card.Body>
            </Card>
        </div>


    )
}

export default CreateNewTask