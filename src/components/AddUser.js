import React, { useState, useEffect } from "react";
import { CreateUser } from "../services/useService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
const AddUser = (props) => {
  const { show, handleClose, handleUpdate } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await CreateUser(name, job);
    console.log(res);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Add new success!");
      handleUpdate({ first_name: name, id: res.id });
    } else {
      toast.error("Add new error!");
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <span className="form-label">Name</span>
              <input
                type="text"
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                placeholder="Add name..."
              />
            </div>
            <div className="mb-3">
              <span className="form-label">Job</span>
              <input
                type="text"
                value={job}
                className="form-control"
                onChange={(e) => setJob(e.target.value)}
                placeholder="Add job..."
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUser;
