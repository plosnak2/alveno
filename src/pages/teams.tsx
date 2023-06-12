import { FC, useEffect, useState } from "react";
import CustomNavbar from "../components/navbar";
import { Parent } from "../components/parent";
import Spinner from 'react-bootstrap/Spinner';
import { getTeams, getEmployeess } from "../config/api";
import Accordion from 'react-bootstrap/Accordion';
import {
    useQuery,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

export const TeamsPage: FC = ({}) => {
    // query for teams api
    const getTeamsQuery = useQuery({
        queryKey: ['teams'],
        queryFn: getTeams
    })

    // query for employees api
    const getEmployeesQuery = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployeess
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