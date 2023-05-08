import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const EmployeeCard = ({ id, name, image_url, position, tasks, handlePostData }) => {

    const [formData, setFormData] = useState("")
    const [showForm, setShowForm] = useState(false);

    const handleOnClick = () => {
        setShowForm(true)
    }

    const handleChange= (e) => {
        setFormData(e.target.value)
    };

    const handleOnSubmit = (e) => {
        setShowForm(false)
        e.preventDefault();
        const addedTask = {description: formData, employee_id: id};
        console.log(addedTask);
        
        // fetch("http://localhost:9292/employees", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       formData
        //     }),
        //   })
        //     .then((r) => r.json())
        //     .then((data) => {
                
        //         handlePostData(data)
        //     });
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
                            {/* <Button size='2rem'></Button> */}
                        </Row>

                    )
                })}
            </ListGroup>
            <Card.Header>Completed Tasks</Card.Header>
            <ListGroup variant="flush">
                {CompletedTasks.map((CompletedTask) => {
                    return (
                        <ListGroup.Item key={CompletedTask.id}>{CompletedTask.description}</ListGroup.Item>
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