import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
const Private = (props) => {
  const auth = useSelector((state) => state.user.auth);
  if (!auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You don't have permisson to access this route</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default Private;
