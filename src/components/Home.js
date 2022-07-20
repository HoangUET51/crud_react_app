import React from "react";
import cat from "../assets/img/meo.jpg";
import { Container } from "react-bootstrap";
const Home = () => {
  return (
    <>
      <Container>
        <img src={cat} width="100%" height="100%"></img>
      </Container>
    </>
  );
};

export default Home;
