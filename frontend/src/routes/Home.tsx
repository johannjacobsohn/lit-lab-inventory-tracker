import React from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export default function Home() {

  const [response, setResponse] = React.useState('');

  return (<Container className='p-4'>
    <h2>Welcome to <span className='rainbow-text'>LIT</span> - the Lab Inventory Tracker</h2>
    <p>This is a sample application to track laboratory instruments and devices.</p>

    {response && <Alert variant="primary">{ response }</Alert>}

    <Button variant="primary" style={{marginRight: ".25rem"}} onClick={() => {
      fetch(apiBaseUrl + '/create-dummy-data', { method: 'GET' })
        .then(response => {
          if (response.ok) {
            setResponse('Test data created');
          } else {
            setResponse('Failed to create test data');
          }
        });
    }
    }>
      Create test data
    </Button>

    <Button variant="primary" onClick={() => {
      fetch(apiBaseUrl + '/delete-all-devices', { method: 'GET' })
        .then(response => {
          if (response.ok) {
            setResponse('All devices deleted');
          } else {
            setResponse('Failed to delete all devices');
          }
        });
    }
    }>
      Delete all devices
    </Button>
    


  </Container>);
}

