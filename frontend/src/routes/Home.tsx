import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  return (<Container className='p-4'>
    <h2>Welcome to the Lab Inventory Tracker</h2>
    <p>This is a sample application to track laboratory instruments and devices.</p>

    <ul>
      <li><Link to="/devices">View Devices</Link></li>
    </ul>
  </Container>);
}

