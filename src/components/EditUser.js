import React, { useState, useEffect } from "react";
import { FetchEditUser } from "../services/useService";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";

const EditUser = (props) => {
  const { show, handleClose, isDataEdit, handleEditModal } = props;

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleConfimUser = async () => {
    let res = await FetchEditUser(name, job);
    if (res && res.updatedAt) {
      handleEditModal({
        first_name: name,
        id: isDataEdit.id,
      });
      handleClose();
      toast.success("Edit success!!!!");
    } else {
      toast.error("Edit error!!!!!!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(isDataEdit.first_name);
    }
  }, [isDataEdit]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
          <Button variant="primary" onClick={() => handleConfimUser()}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUser;
