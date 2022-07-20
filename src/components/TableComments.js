import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FetchAllComments } from "../services/useService";
import Table from "react-bootstrap/Table";
const TableComments = () => {
  const [listComments, setListComments] = useState("");

  useEffect(() => {
    getComments(1);
  }, []);

  const getComments = async (page) => {
    let res = await FetchAllComments(page);
    if (res && res.data) {
      setListComments(res.data);
    }
  };
  return (
    <>
      <Container>
        <div className="my-3">List Comments</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Color</th>
              <th>Pantone_value</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {listComments &&
              listComments.length > 0 &&
              listComments.map((user, index) => {
                return (
                  <>
                    <tr key={`use-${index}`}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.color}</td>
                      <td>{user.pantone_value}</td>
                      <td>{user.year}</td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableComments;
