import React from "react";
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

import { addUser, updateUser } from "@actions/users";

import UserForm from "@containers/UserForm/UserForm";

import './UserModal.scss';

const UserModal = ({ handleClose, open, isUpdate, updateUsersTable, updateData }) => {

    return <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{isUpdate ? 'Update User' : 'Add User'}</DialogTitle>
        <DialogContent>
            <UserForm
                initialValues={isUpdate ? updateData : {
                    name: '',
                    lastName: '',
                    email: '',
                    birthDate: '',
                    access: ''
                }}
                onSubmit={async (data) => {
                    const action = isUpdate ? updateUser : addUser;

                    if (isUpdate) data = { updateData, ...data };

                    try {
                        await action(data);
                        handleClose();
                        updateUsersTable();
                    } catch (e) {
                        console.log('action error', e);
                    }
                }}
                style={{
                    width: '100%',
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                buttons={[
                    {
                        name: isUpdate ? 'Update User' : 'Add User',
                        type: 'submit',
                    }
                ]}
            />
        </DialogContent>
    </Dialog>
};

export default UserModal;