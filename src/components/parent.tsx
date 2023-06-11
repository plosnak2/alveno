import { FC } from "react";
import { ITeam, IEmployee } from "../types/types";
import Accordion from 'react-bootstrap/Accordion';
import { stringify } from "querystring";

interface IProps {
    teams: ITeam[];
    employees: IEmployee[];
    parent: string | null
}

export const Parent: FC<IProps> = ({teams, employees, parent}) => {
    return (
        <>
        {
            teams.map((team,index) => (
                team.parentTeam === parent 
                ? 
                <Accordion.Item eventKey={team.id} style={{marginTop:"10px"}}>
                    <Accordion.Header>{team.name}</Accordion.Header>
                    <Accordion.Body >
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey={index.toString()}>
                                <Accordion.Header className="header">Členovia tímu</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        employees.map((employee) => (
                                            employee.team === team.id ?
                                            <div>
                                                {
                                                    (employee.endDate == null || new Date(Date.parse(employee.endDate as string)) > new Date()) ? 
                                                    <div>{employee.name} {employee.surname} - {employee.position}</div> : 
                                                    <div style={{color:"grey"}}>{employee.name} {employee.surname} - {employee.position}</div>
                                                }
                                            </div> :
                                            null
                                        ))
                                    }
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