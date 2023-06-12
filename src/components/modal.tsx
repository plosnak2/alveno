import { FC } from 'react';
import Modal from 'react-bootstrap/Modal';
import FormAddEmployee from './form';

interface IProps {
    show: boolean;
    handleClose: () => void;
    teamId: string
}

export const ModalAddEmployee: FC<IProps> = ({show, handleClose, teamId}) => {
  // modal window component
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
          <FormAddEmployee teamId={teamId} handleClose={handleClose}/>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ModalAddEmployee;