import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const EmployeeCard = ({ id, name, image_url, position, tasks, handleUpdateData, handleDeleteData, presetFormData }) => {


    const handleTaskComplete = (taskId) => {
        const patchDescription = tasks[tasks.findIndex(task => task.id === taskId)].description
        console.log(patchDescription);
        fetch(`http://localhost:9292/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({complete: true, description: patchDescription}),
        })
            .then(res => res.json())
            .then(data => {
                handleUpdateData(data)
            })

    }


    const handleOnClick = () => {
        presetFormData(id, name, image_url, position, tasks)
    }


    const handleTaskDelete = (task) => {
        console.log(task.id);

        fetch(`http://localhost:9292/tasks/${task.id}`, {
            method: 'DELETE',
        })
            .then(handleDeleteData(task))


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
                            <ListGroup.Item >
                                <Col>
                                    <Col>
                                        <p>
                                            {pendingTask.description}
                                        </p>
                                    </Col>
                                    <Col>
                                        <Button variant='success' className="ml-auto" style={{ width: '70px', fontSize: '10px', marginRight: '5px' }} onClick={() => handleTaskComplete(pendingTask.id)}>Finished</Button>
                                        <Button  as={Link} to={`/employees/${id}/edit_task/${pendingTask.id}`} variant='warning' className="ml-auto" style={{ width: '70px', fontSize: '10px', marginRight: '5px' }} onClick={handleOnClick}>Edit Task</Button>
                                        <Button variant='danger' className="ml-auto" style={{ width: '70px', fontSize: '10px' }} onClick={() => handleTaskDelete(pendingTask)}>Delete</Button>
                                    </Col>
                                </Col>

                            </ListGroup.Item>

                        </Row>

                    )
                })}
            </ListGroup>
            <Card.Header>Completed Tasks</Card.Header>
            <ListGroup variant="flush">
                {CompletedTasks.map((CompletedTask) => {
                    return (
                        <Row key={CompletedTask.id}>
                            <ListGroup.Item>
                                <Col>
                                    <Col>
                                        <p>{CompletedTask.description}</p>
                                    </Col>
                                    <Col>
                                        <Button variant='danger' className="ml-auto" style={{ width: '70px', fontSize: '10px' }} onClick={() => handleTaskDelete(CompletedTask)}>Delete</Button>
                                    </Col>
                                </Col>
                            </ListGroup.Item>
                        </Row>

                    )
                })}
            </ListGroup>
            <Card.Body>
                {/* Create link to take to create new tasks form */}
                <Button as={Link} to={`/employees/${id}/new_tasks`} onClick={handleOnClick}>Create Task</Button>
            


            </Card.Body>
        </Card>
    );
}

export default EmployeeCard;