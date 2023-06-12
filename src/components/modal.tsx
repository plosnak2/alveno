import { useState, FC } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormAddEmployee from './form';
import { Form } from 'react-router-dom';

interface IProps {
    show: boolean;
    handleClose: () => void;
    teamId: string
}

export const ModalAddEmployee: FC<IProps> = ({show, handleClose, teamId}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddEmployee />
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ModalAddEmployee;