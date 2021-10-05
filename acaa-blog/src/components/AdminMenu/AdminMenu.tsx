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
        <MenuItem icon="graph" onClick={handleOnClick} text="New Blog Post" />
        <MenuItem icon="map" text="Map" />
        <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
        <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
        <MenuDivider />
        <MenuItem icon="cog" text="Settings...">
            <MenuItem icon="add" text="Add new application" disabled={true} />
            <MenuItem icon="remove" text="Remove application" />
        </MenuItem>
    </Menu>
);
return (
   
        <Popover2 content={exampleMenu} placement="right-end">
            <Button icon="share" text="Blog Admin..." />
        </Popover2>

);
}

export default AdminMenu;
