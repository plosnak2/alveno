import { useState, FC } from 'react';
import { Formik } from "formik";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IEmployee, ICreateEmployee } from '../types/types';
import axios from "axios";
import { insertEmployee, config } from '../config/config';
import {
    useQueryClient,
    useMutation
} from '@tanstack/react-query'
import toast from 'react-hot-toast';

interface IProps {
    teamId:string;
    handleClose: () => void
}

export const FormAddEmployee: FC<IProps> = ({teamId, handleClose}) => {
    const queryClient = useQueryClient()

    const initialValues = {
        name: "",
        surname: "",
        startDate: null,
        endDate: null,
        position: "",
        team:teamId
    };

    const mutation = useMutation({
        mutationFn: (employee) => {
          return axios.post(insertEmployee, employee, config)
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            handleClose();
            toast.success('Employee Added')
        },
        onError: () => {
            // Invalidate and refetch
            toast.error("There was an error while adding new Employee.")
        },
      })

     const submitForm = (data: ICreateEmployee) => {
        mutation.mutate(data as any);
     }

    return (
        <Formik onSubmit={submitForm} initialValues={initialValues}>
        {({ handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={(val) => {setFieldValue("name",val.target.value)}}
                    required
                />
                <Form.Label className='label'>Surname</Form.Label>
                <Form.Control
                    name="surname"
                    type="text"
                    placeholder="Surname"
                    onChange={(val) => {setFieldValue("surname",val.target.value)}}
                    required
                />
                <Form.Label className='label'>Position</Form.Label>
                <Form.Control
                    name="position"
                    type="text"
                    placeholder="Position"
                    onChange={(val) => {setFieldValue("position",val.target.value)}}
                />
                <div className="row">
                    <div className="column">
                        <div>Works from:</div>
                        <DatePicker
                            className="calendar"
                            selected={values.startDate as any}
                            onChange={(val) => {
                                setFieldValue("startDate", val);
                            }}
                            placeholderText={'Select a date'} 
                        />
                    </div>
                    <div className="column">
                        <div>Works until:</div>
                        <DatePicker
                            className="calendar"
                            selected={values.endDate as any}
                            onChange={(val) => {
                                setFieldValue("endDate", val);
                            }}
                            placeholderText={'Select a date'} 
                        />
                    </div>
                </div>
                
                <button type="submit" className='submit-button'>Add employee</button>
            </form>
        )}
    </Formik>
    );
}

export default FormAddEmployee;