import { AnchorButton, Button, Navbar } from '@blueprintjs/core';
import React from 'react';
import styles from './TopNavMenu.module.css';

const TopNavMenu = () => (
  <Navbar>
  <Navbar.Group>
      <Navbar.Heading>Blueprint</Navbar.Heading>
      <Navbar.Divider />
      <AnchorButton className="bp3-minimal" icon="home" text="Home" href="/" />
      <Button className="bp3-minimal" icon="document" text="Files" />
  </Navbar.Group>
</Navbar>
);

export default TopNavMenu;
