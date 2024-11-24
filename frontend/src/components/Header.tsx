import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Logo from './Logo';
import SignUpModal from './SignUpModal';

function Header() {
  return (
    <Navbar expand="lg" className="text-bg-dark">
      <LinkContainer to="/">
        <Navbar.Brand className='d-flex text-white gap-2 p-2'>
          <Logo />
          <span>
            <span className='rainbow-text'>LIT</span> — Lab Inventory Tracker
          </span>
        </Navbar.Brand>
      </LinkContainer>
      <SignUpModal />
    </Navbar >
  );
}

export default Header;