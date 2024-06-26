import { Card, Row, Col } from 'react-bootstrap';

const ProjCard = ({img, name, desc, objs}) => {
  return (
    <Row>
      <Col className="mt-3">
        <Card className="h-100">
          <Row noGutters className="flex-row h-100">
            <Col md={4}>
              <Card.Img
                variant="top"
                src={img}
                alt="Card image cap"
              />
            </Col>
            <Col md={8} className="d-flex flex-column">
              <Card.Body className="flex-grow-1">
                <Card.Title>
                  <h1>{name}</h1>
                </Card.Title>
                <Card.Text>
                  {desc}
                </Card.Text>
                {/* <p>
                  Objectives:
                  {objs.map((obj, index) => (
                    <p key={index}>{obj}</p>
                  ))}
                </p> */}
              </Card.Body>
              <Card.Footer className="mt-auto">
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
} 
export default ProjCard;