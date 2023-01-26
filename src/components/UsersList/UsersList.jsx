import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Paper, Pagination, Button } from '@mui/material';

import UsersFilter from "@components/UsersList/UsersFilter/UsersFilter";
import UserModal from "@components/UsersList/UserModal/UserModal";

import './UsersList.scss';

const UsersList = () => {
    const users = useSelector(({ users }) => users);
    const [page, setPage] = useState(1);
    const [usersOnPage, setUsersOnPage] = useState([]);
    const [openUserModal, setOpenUserModal] = useState(false);

    const pagination = () => {
        setUsersOnPage(users.slice(10 * (page - 1), 10 * page));
    }

    useEffect(() => {
        console.log(users)
        pagination();
    }, [users, page]);

    return <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
        <UserModal
            open={openUserModal}
            handleClose={() => setOpenUserModal(false)} />
        <UsersFilter />
        <Button onClick={() => setOpenUserModal(true)}>Open</Button>
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ marginBottom: 5 }}>
            {usersOnPage.map(({ id, name, lastName, email, birthDate }, index) => {
                return <Grid item xs={2} sm={6} md={12} key={index + id}>
                    <Paper sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 3px' }}>
                        <div>{`${name} ${lastName}`}</div>
                        <div>{email}</div>
                        <div>{birthDate}</div>
                    </Paper>
                </Grid>
            })}
        </Grid>
        <Pagination
            count={Math.ceil(users.length / 10)}
            onChange={(_, page) => {
                setPage(page);
            }} />
    </Box>
};

export default UsersList;