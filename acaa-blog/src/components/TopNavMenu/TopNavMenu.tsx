import { AnchorButton, Navbar } from '@blueprintjs/core';

const TopNavMenu = () => (
  <Navbar>
  <Navbar.Group>
      <Navbar.Heading>AC Adapter Association | Collectors Chat</Navbar.Heading>
      <Navbar.Divider />
      <AnchorButton className="bp3-minimal" icon="home" text="Home" href="/" />
      
  </Navbar.Group>
</Navbar>
);

export default TopNavMenu;
