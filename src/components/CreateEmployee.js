import React from 'react'
import { useState } from 'react';
import { Form, Button } from "react-bootstrap";

import { useNavigate } from 'react-router-dom'


const CreateEmployee = ({handlePostEmployeeData}) => {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tasks, setTasks] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9292/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: name, position: position, image_url: imageUrl, tasks: tasks}),
        })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              handlePostEmployeeData(data)
              navigate('/employees')
            })
  };

  const handleAddTask = () => {
    setTasks([...tasks, ""]);
  };

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Posistion</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter position"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Tasks</Form.Label>
        {tasks.map((task, index) => (
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
  );

}

export default CreateEmployee