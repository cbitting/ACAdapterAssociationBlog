import { Menu, MenuItem, MenuDivider, Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import React from 'react';
import styles from './AdminMenu.module.css';
import {useHistory} from 'react-router-dom';

const AdminMenu = () => {

  const history = useHistory();

  const handleOnClick = () => history.push('/sample');

  const exampleMenu = (
    <Menu>
        <MenuItem icon="add" onClick={handleOnClick} text="New Blog Post" />
       
    </Menu>
);
return (
   
        <Popover2 content={exampleMenu} placement="right-end">
            <Button icon="edit" text="Blog Admin..." />
        </Popover2>

);
}

export default AdminMenu;
