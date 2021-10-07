import { AnchorButton, Icon, Navbar } from '@blueprintjs/core';
import styles from "./TopNavMenu.module.css";
const TopNavMenu = () => (
  <Navbar>
  <Navbar.Group>
      <Navbar.Heading><Icon className={styles.logoicon} icon="power" />AC Adapter Association | Collectors Chat</Navbar.Heading>
      <Navbar.Divider />
      <AnchorButton className="bp3-minimal" icon="home" text="Home" href="/" />
      
  </Navbar.Group>
</Navbar>
);

export default TopNavMenu;
