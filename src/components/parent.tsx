import { FC, useState } from "react";
import { ITeam, IEmployee } from "../types/types";
import Accordion from 'react-bootstrap/Accordion';
import { stringify } from "querystring";
import Button from 'react-bootstrap/Button';
import ModalAddEmployee from "./modal";
import { AiFillDelete } from 'react-icons/ai';
import axios from "axios";
import { config, deleteEmployee } from "../config/api";
import {
    useQueryClient,
    useMutation
} from '@tanstack/react-query'
import toast from 'react-hot-toast';

interface IProps {
    teams: ITeam[];
    employees: IEmployee[];
    parent: string | null
}

export const Parent: FC<IProps> = ({teams, employees, parent}) => {
    const queryClient = useQueryClient()
    // show state for showing and closing modal window for adding new employee
    const [show, setShow] = useState<boolean>(false);
    // teamId state for passing it into modal window
    const [teamId, setTeamId] = useState<string>('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // function that sets team id and opens modal
    const addEmployee = (teamId: string) : void => {
        setTeamId(teamId)
        handleShow();
    }

    const mutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            // reseting query (refetch) + toasting success
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            toast.success('Employee Deleted')
        },
        onError: () => {
            // on error indicates that there was an error
            toast.error("There was an error while deleting Employee.")
        },
    })

    return (
        <>
        <ModalAddEmployee show={show} handleClose={handleClose} teamId={teamId}/>
        {
            teams.map((team,index) => (
                team.parentTeam === parent 
                ? 
                <Accordion.Item eventKey={team.id} style={{marginTop:"10px"}} key={team.id}>
                    <Accordion.Header>{team.name}</Accordion.Header>
                    <Accordion.Body >
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey={index.toString()}>
                                <Accordion.Header className="header">Team members</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        employees.map((employee) => (
                                            employee.team === team.id ?
                                            <div key={employee.id}>
                                                {
                                                    (employee.endDate == null || new Date(Date.parse(employee.endDate as string)) > new Date()) ? 
                                                    <div>{employee.name} {employee.surname} - {employee.position} <AiFillDelete size={30} color="red" className="icon" onClick={() =>  mutation.mutate(employee.id)}/></div> : 
                                                    <div style={{color:"grey"}}>{employee.name} {employee.surname} - {employee.position} <AiFillDelete size={30} color="red" className="icon" onClick={() => mutation.mutate(employee.id)}/></div>
                                                }
                                            </div> :
                                            null
                                        ))
                                    }
                                    <Button className="add-employee" variant="primary" onClick={() => {addEmployee(team.id)}}>Add employee</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Parent teams={teams} employees={employees} parent={team.id}/>
                    </Accordion.Body>
                </Accordion.Item>
                : null
            ))
        }
        </>
    );
};