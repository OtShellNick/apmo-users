import React from "react";
import { Formik, Field } from "formik";
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const UserForm = ({ initialValues, onSubmit, style, buttons }) => {

    return <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setValues
        }) => {
            return <form
                onSubmit={handleSubmit}
                style={style}>
                <TextField
                    id='name'
                    size='small'
                    label='Name'
                    onChange={handleChange}
                />
                <TextField
                    id='lastName'
                    size='small'
                    label='Last Name'
                    onChange={handleChange}
                />
                <TextField
                    id='email'
                    size='small'
                    label='Email'
                    onChange={handleChange}
                />
                <TextField
                    id='birthDate'
                    size='small'
                    label='Birth Date'
                    onChange={handleChange}
                />
                <FormControl sx={{ width: '10%' }}>
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