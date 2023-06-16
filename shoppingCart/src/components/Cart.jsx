import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { CartState } from "../context/Context";
import { useEffect, useState } from "react";
import Rating from "./Rating";

const Cart = () => {
  console.log(CartState())
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);
  const [selectedoption, setSelectedoption] = useState(0);
  const handleSelectChange = (event) => {};
  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => {
            return (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>$ {prod.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={prod.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={prod.qty}
                      onChange={(event) => {
                        dispatch({
                          type: "CHANGE_CART_QUANTITY",
                          payload: { id: prod.id, qty: event.target.value },
                        });
                      }}
                    >
                      {/* {console.log([...Array(prod.inStock).keys()])} */}
                      {[...Array(prod.inStock).keys()].map((res) => {
                        return (
                          <option key={res + 1} value={res + 1}>
                            {res + 1}{" "}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total : $ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
