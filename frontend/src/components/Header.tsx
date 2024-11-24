import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Logo from './Logo';
import SignUpModal from './SignUpModal';

function Header() {
  return (
    <Navbar expand="lg" className="text-bg-dark">
      <LinkContainer to="/">
        <Navbar.Brand className='d-flex text-white'>
          <span style={{ 'display': 'inline-block', 'margin': '0 12px' }}>
            <Logo />
          </span>
          Lab Inventory Tracker
        </Navbar.Brand>
      </LinkContainer>
      <SignUpModal />
    </Navbar >
  );
}

export default Header;