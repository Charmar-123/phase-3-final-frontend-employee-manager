import React from 'react'
import { useState } from 'react';
import { Card, ListGroup, Row, Form, Button } from 'react-bootstrap'

const CreateNewTask = ({ newTaskEmployeeData, handlePostTaskData }) => {
    // console.log(newTaskEmployeeData);



    const id = newTaskEmployeeData.id;
    const position = newTaskEmployeeData.position;
    const name = newTaskEmployeeData.name;
    const image_url = newTaskEmployeeData.image_url;
    const tasks = newTaskEmployeeData.tasks;
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
        console.log(newTasks);
        e.preventDefault();

        fetch(`http://localhost:9292/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: id, newTasks: newTasks}),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                handlePostTaskData(data)
            })
    }
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
                        </Row>

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

    )
}

export default CreateNewTask