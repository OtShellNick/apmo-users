import React from "react";
import { Formik } from "formik";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const UserForm = ({ initialValues, onSubmit, style, buttons, isFilter = false }) => {

    return <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
    >
        {({
            values,
            handleChange,
            handleSubmit,
        }) => {
            return <form
                onSubmit={handleSubmit}
                style={style}>
                <TextField
                    id='name'
                    size='small'
                    label='Name'
                    value={values.name}
                    onChange={handleChange}
                />
                <TextField
                    id='lastName'
                    size='small'
                    label='Last Name'
                    value={values.lastName}
                    onChange={handleChange}
                />
                <TextField
                    id='email'
                    size='small'
                    label='Email'
                    value={values.email}
                    onChange={handleChange}
                />
                <TextField
                    id='birthDate'
                    size='small'
                    label='Birth Date'
                    value={values.birthDate}
                    onChange={handleChange}
                />
                <FormControl sx={isFilter ? { width: '10%' } : {}}>
                    <InputLabel size="small" id="access">Access</InputLabel>
                    <Select
                        labelId="access"
                        name="access"
                        id="access"
                        size="small"
                        label="Access"
                        value={values.access}
                        onChange={handleChange}
                    >
                        <MenuItem value={''}>None</MenuItem>
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                    </Select>
                </FormControl>
                {
                    buttons.map(({ name, type }, index) => {
                        return <Button
                            key={name + index}
                            type={type}
                            variant="contained">
                            {name}
                        </Button>
                    })
                }
            </form>
        }}
    </Formik >
};

export default UserForm;