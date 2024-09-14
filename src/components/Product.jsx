import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add, addProduct } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import { Alert } from "react-bootstrap";
import statusCode from "../utils/statusCode";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const addToCart = (product) => {
    dispatch(addProduct(product));
  };

  if (status === statusCode.LOADING) {
    return <p>Loading...</p>;
  }

  if (status === statusCode.ERROR) {
    return (
      <Alert key="danger" variant="danger">
        Something went wrong! try again later
      </Alert>
    );
  }

  const cards = products.map((product) => (
    <div className="col-md-3 mb-2" key={product.id}>
      <Card className="h-100">
        <Card.Img variant="top" src={product.thumbnail} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>$ {product.price}</Card.Text>
        </Card.Body>
        <Card.Footer style={{ background: "#fff" }}>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));

  return (
    <>
      <h1>Product Dashboard</h1>
      <div className="row">{cards}</div>
    </>
  );
};

export default Product;
