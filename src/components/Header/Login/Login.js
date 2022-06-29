import React from "react";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

function Login(props) {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div>
      <button
        className="btn btn-success"
        type="button"
        onClick={toggleModal}
      >
        Login
      </button>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalBody>
          <LoginForm
            updateUser={props.updateUser}
            updateSessionId={props.updateSessionId}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Login
