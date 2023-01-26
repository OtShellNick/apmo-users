import React, { useEffect } from "react";
import { Box } from "@mui/material";

import { updateUsersList } from "@store/usersStore";

import UserForm from "@containers/UserForm/UserForm";

import './UsersFilter.scss';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../actions/users";

const UsersFilter = () => {
    const dispatch = useDispatch();
    const users = useSelector(({ users }) => users);

    useEffect(() => { }, [users])

    const filter = async ({ name, lastName, email, birthDate, access }) => {

        try {
            const usersAll = await getUsers();

            const tempUsers = [...usersAll];
            let filteredUsers;

            if (name) {
                filteredUsers = tempUsers.filter(user => user.name.includes(name));
            } else if (lastName) {
                filteredUsers = tempUsers.filter(user => user.lastName.includes(lastName));
            } else if (email) {
                filteredUsers = tempUsers.filter(user => user.email.includes(email));
            } else if (birthDate) {
                filteredUsers = tempUsers.filter(user => user.birthDate.includes(birthDate));
            } else if (typeof access === 'boolean') {
                filteredUsers = tempUsers.filter(user => user.access === access);
            } else {
                filteredUsers = tempUsers;
            }

            console.log(access, tempUsers, filteredUsers)
            dispatch(updateUsersList(filteredUsers));
        } catch (e) {
            console.log(e)
        }
    }

    return <Box
        sx={{
            maxWidth: 1200,
            margin: '15px auto',
            display: 'flex',
            alignItems: 'center',
        }}>
        <span style={{ marginRight: 10 }}>Filter:</span>
        <UserForm
            initialValues={{
                name: '',
                lastName: '',
                email: '',
                birthDate: '',
                access: false
            }}
            onSubmit={(data) => filter(data)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
            buttons={[
                {
                    name: 'Filter',
                    type: 'submit',
                }
            ]}
        />
    </Box>
};

export default UsersFilter;