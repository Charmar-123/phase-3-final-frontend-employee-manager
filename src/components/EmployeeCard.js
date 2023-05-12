import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Row} from 'react-bootstrap';


const EmployeeCard = ({ id, name, image_url, position, tasks, handleUpdateData, handleDeleteData, presetFormData }) => {


    const handleTaskComplete = (taskId) => {
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
                            <ListGroup.Item>{pendingTask.description}</ListGroup.Item>
                            <Button onClick={() => handleTaskComplete(pendingTask.id)}>Finished</Button>
                            <Button onClick={() => handleTaskDelete(pendingTask)}>Delete</Button>
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
                            <Button onClick={() => handleTaskDelete(CompletedTask)}>Delete</Button>
                        </Row>

                    )
                })}
            </ListGroup>
            <Card.Body>
                {/* Create link to take to create new tasks form */}
                <Button onClick={handleOnClick}>Create Task</Button>


            </Card.Body>
        </Card>
    );
}

export default EmployeeCard;