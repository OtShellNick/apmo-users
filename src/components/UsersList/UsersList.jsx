import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Paper, Pagination, Button, ButtonGroup } from '@mui/material';

import { getUsers, deleteUser } from "@actions/users";
import { updateUsersList } from "@store/usersStore";

import UsersFilter from "@components/UsersList/UsersFilter/UsersFilter";
import UserModal from "@components/UsersList/UserModal/UserModal";

import './UsersList.scss';

const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(({ users }) => users);
    const [page, setPage] = useState(1);
    const [usersOnPage, setUsersOnPage] = useState([]);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateUserData, setUpdateUserData] = useState({});

    const pagination = () => {
        setUsersOnPage(users.slice(10 * (page - 1), 10 * page));
    };

    const updateUsersTable = async () => {
        const usersAll = await getUsers();
        dispatch(updateUsersList(usersAll));
    }

    useEffect(() => {
        console.log(users)
        pagination();
    }, [users, page]);

    return <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '15px 0' }}>
        <UserModal
            updateData={updateUserData}
            updateUsersTable={updateUsersTable}
            open={openUserModal}
            isUpdate={isUpdate}
            handleClose={() => {
                setOpenUserModal(false);
                setIsUpdate(false);
            }} />
        <Button
            onClick={() => {
                setOpenUserModal(true);
            }}
            variant="contained">Add User</Button>
        <UsersFilter />
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ marginBottom: 5 }}>
            {usersOnPage.map(({ id, name, lastName, email, birthDate, access }, index) => {
                return <Grid item xs={2} sm={6} md={12} key={index + id}>
                    <Paper sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 3px' }}>
                        <div>{`${name} ${lastName}`}</div>
                        <div>{email}</div>
                        <div>{birthDate}</div>
                        <div>
                            <ButtonGroup>
                                <Button onClick={() => {
                                    setIsUpdate(true);
                                    setUpdateUserData({ id, name, lastName, email, birthDate, access });
                                    setOpenUserModal(true);
                                }}>Update</Button>
                                <Button color='error' onClick={async () => {
                                    try {
                                        await deleteUser(id);
                                        await updateUsersTable();
                                    } catch (e) {
                                        console.log('delete user error', e);
                                    }
                                }}>Delete</Button>
                            </ButtonGroup>
                        </div>
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