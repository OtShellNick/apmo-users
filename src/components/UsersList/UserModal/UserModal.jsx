import React from "react";
import { Dialog, DialogTitle } from '@mui/material';

import './UserModal.scss';

const UserModal = ({ handleClose, open }) => {

    return <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Test</DialogTitle>
    </Dialog>
};

export default UserModal;