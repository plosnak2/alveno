import { useState, FC } from 'react';
import { Formik } from "formik";
import { object, string } from "yup";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface IProps {
}

export const FormAddEmployee: FC<IProps> = ({}) => {
    const initialValues = {
        name: "",
        surname: "",
        startDate: null,
        endDate: null,
        position: ""
    };

    const loginFormValidationSchema = object().shape({
        name: string().required("Toto pole je povinné"),
        surname: string().required("Toto pole je povinné"),
    });

    return (
        <Formik onSubmit={() => {}} validationSchema={loginFormValidationSchema} initialValues={initialValues}>
        {({ handleSubmit, handleChange, values, setFieldValue, errors, touched }) => (
            <form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name={"name"}
                    type={"text"}
                    placeholder={"Name"}
                    required
                />
                <Form.Label className='label'>Surname</Form.Label>
                <Form.Control
                    name={"surname"}
                    type={"text"}
                    placeholder={"Surname"}
                    required
                />
                <Form.Label className='label'>Position</Form.Label>
                <Form.Control
                    name={"position"}
                    type={"text"}
                    placeholder={"Position"}
                />
                <div className="row">
                    <div className="column">
                        <div>Works from:</div>
                        <DatePicker
                            className="calendar"
                            selected={values.startDate}
                            onChange={(val:any) => {
                                setFieldValue("startDate", val);
                            }}
                            placeholderText={'Select a date'} 
                        />
                    </div>
                    <div className="column">
                        <div>Works until:</div>
                        <DatePicker
                            className="calendar"
                            selected={values.endDate}
                            onChange={(val:any) => {
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