import { FC, useEffect, useState } from "react";
import CustomNavbar from "../components/navbar";
import { Parent } from "../components/parent";
import axios from "axios";
import { ITeam, IEmployee } from "../types/types";
import Spinner from 'react-bootstrap/Spinner';
import { getTeams, getEmployees, config } from "../config/config";
import Accordion from 'react-bootstrap/Accordion';
import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

export const TeamsPage: FC = ({}) => {
    // query for teams api
    const getTeamsQuery = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            const response = await axios.get(getTeams, config)
            const data = await response.data;
            return data;
        }
    })

    // query for employees api
    const getEmployeesQuery = useQuery({
        queryKey: ['employees'],
        queryFn: async () => {
            const response = await axios.get(getEmployees, config)
            const data = await response.data;
            return data;
        }
    })

    // if teams or employees is still loading (fetching) then loader spinner is shown as indicator
    if( getTeamsQuery.isLoading || getEmployeesQuery.isLoading ){
        return ( 
            <div>
                <CustomNavbar />
                <Spinner className="spinner" animation="border" />
            </div>
        )
    }

    // otherwise application is returned
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <CustomNavbar />
            <div className="container main-accordion">
                <Accordion alwaysOpen>
                    <Parent teams={getTeamsQuery.data} employees={getEmployeesQuery.data} parent={null}/>
                </Accordion>
            </div>
        </div>
    );
};