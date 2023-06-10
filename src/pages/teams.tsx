import { FC, useEffect, useState } from "react";
import CustomNavbar from "../components/navbar";
import { Parent } from "../components/parent";
import axios from "axios";
import { ITeam, IEmployee } from "../types/types";
import Spinner from 'react-bootstrap/Spinner';
import { getTeams, getEmployees, config } from "../config/config";

export const TeamsPage: FC = ({}) => {
    const [teams, setTeams] = useState<ITeam[]>([])
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const [loadedTeams, setLoadedTeams] = useState<boolean>(false)
    const [loadedEmployees, setLoadedEmployees] = useState<boolean>(false)

    // fetching data from server -> fetching info about teams and employees and afterwards setting loaded flags 
    useEffect(() => {
        axios.get(getTeams, config)
        .then((response) => {
            setTeams(response.data);
            setLoadedTeams(true)
        })
        
        axios.get(getEmployees, config)
        .then((response) => {
            setEmployees(response.data);
            setLoadedEmployees(true)
        })
    }, [])

    // if both information is loaded then component is rendered otherwise loading spinner is rendered
    if(loadedEmployees && loadedTeams){
        return (
            <div>
                <CustomNavbar />
                <Parent />
            </div>
        );
    } else {
        return (
            <div>
                <CustomNavbar />
                <Spinner className="spinner" animation="border" />
            </div>
        )
    }  
};