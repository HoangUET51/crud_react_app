import React from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { FetchDeleteUser } from "../services/useService";
const DeleteUser = (props) => {
  const { show, handleClose, isDataDelete, handleUpdateDelete } = props;

  const handleDeleteUser = async () => {
    let res = await FetchDeleteUser(isDataDelete.id);
    if (res && +res.status === 204) {
      handleUpdateDelete(isDataDelete.id);
      handleClose();
      toast.success("Delete success!");
    } else {
      toast.error("Delete error!");
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
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <span className="form-label">
                Delete Email <b>{isDataDelete.email}</b>
              </span>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteUser;
