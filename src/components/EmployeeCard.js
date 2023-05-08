import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Row } from 'react-bootstrap';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const EmployeeCard = ({ id, name, image_url, position, tasks }) => {

    const [showForm, setShowForm] = useState(false);


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
                        <Row>
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
                        <ListGroup.Item>{CompletedTask.description}</ListGroup.Item>
                    )
                })}
            </ListGroup>
            <Card.Body>
                {showForm ? <Button>Submit</Button> : <Button>Create Task</Button>}
                <Form>

                </Form>
            </Card.Body>
        </Card>
    );
}

export default EmployeeCard;