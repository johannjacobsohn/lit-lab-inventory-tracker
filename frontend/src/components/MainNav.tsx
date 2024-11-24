import { Nav } from 'react-bootstrap';
import { FaHome as House, FaLaptopMedical as Laptop } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

export default function MainNav() {
  const location = useLocation();
  return (
    <ul className="nav nav-pills d-flex flex-row flex-md-column">
      <li className="nav-item">
        <LinkContainer to="/" className="nav-link text-white">
          <Nav.Link><House size={16} /> Home</Nav.Link>
        </LinkContainer>
      </li>
      <li className='nav-item'>
        <LinkContainer to="/devices" className="nav-link text-white" isActive={location.pathname.startsWith('/devices')}>
          <Nav.Link><Laptop size={16} /> Devices</Nav.Link>
        </LinkContainer>
      </li>
    </ul>
  )
}