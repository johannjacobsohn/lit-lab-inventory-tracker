import React from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Device } from './devices/Device';
import { Button } from 'react-bootstrap';

interface ListViewProps {
  data: Device[];
  compare: (sortProperty: string, a: Device, b: Device) => number;
  selection: Device[];
  toggleSelection: (item: Device) => void;
  deleteItem: (item: Device) => void;
  linkItem: (item: Device) => string;
  sortProperty: string;
  id: string | undefined;
}

const ListView: React.FC<ListViewProps> = ({ data, compare, selection, toggleSelection, deleteItem, sortProperty, id, linkItem }) => {
  return (
    <ul className="list-group">
      {data?.sort((a, b) => compare(sortProperty, a, b)).map((device) => {
        return (<li key={device.id} className='d-flex'>
          <Form.Check type="checkbox" checked={selection.includes(device)} onChange={() => toggleSelection(device)} />
          <Link to={linkItem(device)} className={`list-group-item list-group-item-action mb-1 mx-1 lh-sm ${id === device.id && 'active'}`} aria-current={id === device.id}>
            {device.type} @ {device.location} ({device.device_health})
          </Link>
          <Button variant='' className='ms-auto' onClick={() => deleteItem(device)} title="Delete">x</Button>
        </li>
        )
      })}
    </ul>
  );
};

export default ListView;