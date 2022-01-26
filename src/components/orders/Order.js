import React from "react";
import { Card, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import i1 from "../../assets/images/1642594831254-768274791i1.PNG";
import i2 from "../../assets/images/1642672514514-555806003i7.PNG";
import { Link } from "react-router-dom";
const Order = () => {
    return (<>
                <div className="row">
                  <div className="col-12">
                   
                    <Card style={{padding:"1rem"}}>
                        <Row>
                            <Col md="5">
                                <Card.Title>
                                    Order Status :  Delivered on 10 Jan
                                </Card.Title>
                            </Col>
                            <Col md="5">
                                <Card.Title>
                                    Order Total :  1500$
                                </Card.Title>
                            </Col>
                           
                        </Row>
                    
                    <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col >
                                    <Image style={{ height: "100px" }} rounded={true} fluid={true} src={i1}></Image>
                                </Col>
                                <Col >
                                    <h4>Product Name</h4>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <Image style={{ height: "100px" }} rounded={true} fluid={true} src={i2}></Image>
                                </Col>
                                <Col>
                                    <h4>Product Name</h4>
                                </Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-center">
                                +2 Items
                            </ListGroup.Item>     
                            <ListGroup.Item className="text-center">
                                <Button>
                                <Link style={{color:"white"}} to="/Orderdetail/id">
                                        View Details
                                </Link>
                                </Button>
                            </ListGroup.Item>
                    </ListGroup>
                    </Card.Body>    
                    </Card>
                   
                  </div>
                </div>
    </>)
}

export default Order;