import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    useQueryClient,
    useMutation
} from '@tanstack/react-query'
import { deleteEmployee } from '../config/api';
import toast from 'react-hot-toast';
import { IEmployee } from '../types/types';

interface IProps {
    show: boolean;
    handleClose: () => void;
    employee: IEmployee | null
}

export const ModalDeleteEmployee: FC<IProps> = ({show, handleClose, employee}) => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            // reseting query (refetch) + toasting success + closing modal
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            toast.success('Employee Deleted')
            handleClose()
        },
        onError: () => {
            // on error indicates that there was an error
            toast.error("There was an error while deleting Employee.")
        },
    })

    if(employee === null) {
        return (
            <></>
        )
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete employee {employee?.name} {employee?.surname}?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" className='delete-button' onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" className='delete-button' onClick={() => {mutation.mutate(employee.id)}}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalDeleteEmployee;