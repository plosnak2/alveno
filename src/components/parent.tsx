import { FC, useState } from "react";
import { ITeam, IEmployee } from "../types/types";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import ModalAddEmployee from "./modalAddEmployee";
import { AiFillDelete } from 'react-icons/ai';
import ModalDeleteEmployee from "./modalDeleteEmployee";

interface IProps {
    teams: ITeam[];
    employees: IEmployee[];
    parent: string | null
}

export const Parent: FC<IProps> = ({teams, employees, parent}) => {
    // show state for showing and closing modal window for adding new employee
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
    // teamId state for passing it into modal window
    const [teamId, setTeamId] = useState<string>('')
    // show state for showing and closing modal window for deleting employees
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    // employee state for passing it into modal window
    const [employee, setEmployee] = useState<IEmployee | null>(null)

    // functions that handle both modal windows
    const handleCloseModalAdd = () => setShowModalAdd(false);
    const handleShowModalAdd = () => setShowModalAdd(true);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    // function that sets team id and opens modal for adding employee
    const addEmployee = (teamId: string) : void => {
        setTeamId(teamId)
        handleShowModalAdd();
    }

    // function that sets employee state and opens modal for deleting employee
    const deleteEmployee = (employee: IEmployee) => {
        setEmployee(employee)
        handleShowModalDelete()
    }

    return (
        <>
        <ModalAddEmployee show={showModalAdd} handleClose={handleCloseModalAdd} teamId={teamId}/>
        <ModalDeleteEmployee show={showModalDelete} handleClose={handleCloseModalDelete} employee={employee}/>
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
                                                    <div>{employee.name} {employee.surname} - {employee.position} <AiFillDelete size={30} color="red" className="icon" onClick={() => deleteEmployee(employee)}/></div> : 
                                                    <div style={{color:"grey"}}>{employee.name} {employee.surname} - {employee.position} <AiFillDelete size={30} color="red" className="icon" onClick={() => deleteEmployee(employee)}/></div>
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