import { FC, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { getTeams, createTeam } from "../config/api";
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'
import { ITeam } from '../types/types';
import toast from 'react-hot-toast';

interface IProps {
    show: boolean;
    handleClose: () => void;
}

export const ModalAddTeam: FC<IProps> = ({show, handleClose}) => {
    const queryClient = useQueryClient()
    const [name, setName] = useState<string>('')
    const [team, setTeam] = useState<string>('0')
  
    const getTeamsQuery = useQuery({
        queryKey: ['teams'],
        queryFn: getTeams
    })

    // mutation function for post request (creating new team)
    const mutation = useMutation({
        mutationFn: createTeam,
        onSuccess: () => {
            // on success closing modal + reseting query (refetch) + toasting success
            queryClient.invalidateQueries({ queryKey: ['teams'] });
            handleClose();
            toast.success('Team created.')
            setName('')
            setTeam('0')
        },
        onError: () => {
            // on error indicates that there was an error
            toast.error("There was an error while creating team.")
        },
    })

    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();
        let parentTeam : string | null = team
        if (team === '0'){
            parentTeam = null
        }
        mutation.mutate({parentTeam, name})
    }

    return (
        <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Form onSubmit={submitForm}>
                <Modal.Header closeButton>
                <Modal.Title>Create new team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name of the team</Form.Label>
                        <Form.Control type="text" placeholder="Write name of a team" required value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="team">
                        <Form.Label>Select superior team</Form.Label>
                        <Form.Select aria-label="Default select example" value={team} onChange={(e) => setTeam(e.target.value)}>
                            <option value="0">none</option>
                            {
                                getTeamsQuery.data.map((team : ITeam) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" className='delete-button' onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" className='delete-button' type='submit'>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}

export default ModalAddTeam;