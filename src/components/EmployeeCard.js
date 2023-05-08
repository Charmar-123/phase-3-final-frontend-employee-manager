import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const EmployeeCard = ({ id, name, image_url, position, tasks }) => {

   

    const pendingTasks = tasks.filter(({complete}) => complete === false);
    const CompletedTasks = tasks.filter(({complete}) => complete === true);

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
                        <ListGroup.Item>{pendingTask.description}</ListGroup.Item>
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
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default EmployeeCard;