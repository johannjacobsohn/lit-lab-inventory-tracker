import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RegisterForm from './SignUpForm';

function RegisterModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='link' className='text-white ms-auto' onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up to Lab Inventory Tracker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm onDone={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterModal;