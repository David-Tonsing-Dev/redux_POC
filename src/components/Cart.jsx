import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { remove, removeProduct, getProduct } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: products } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const removeToCart = (id) => {
    dispatch(removeProduct(id));
  };

  const cards = products.map((product) => (
    <div className="col-md-6 mb-2" key={product.id}>
      <Card className="h-100">
        <Card.Img variant="top" src={product.thumbnail} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>$ {product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: "#fff" }}>
          <Button variant="danger" onClick={() => removeToCart(product.id)}>
            Remove
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return <>{cards}</>;
};

export default Cart;
