import React from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Device } from './devices/Device';

interface ListViewProps {
  data: Device[];
  compare: (sortProperty: string, a: Device, b: Device) => number;
  selection: Device[];
  toggleSelection: (item: Device) => void;
  linkItem: (item: Device) => string;
  id: string | undefined;
  sortProperty: string;
}

const ListView: React.FC<ListViewProps> = ({ data, compare, selection, toggleSelection, id, linkItem, sortProperty }) => {
  const navigate = useNavigate();
  return (
    <div>
      <table className="table table-hover table-responsive">
        <thead className="sticky-top">
          <tr>
            <th></th>
            <th>Location</th>
            <th>Type</th>
            <th>Device Health</th>
            <th>Last Used</th>
            <th>Price</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {data?.sort((a, b) => compare(sortProperty, a, b)).map((item) => {
            return (
              <tr key={item.id} onClick={() => navigate(linkItem(item))} className={id === item.id ? "active" : ""}>
                <td>
                  <Form.Check type="checkbox" checked={selection.includes(item)} onChange={() => toggleSelection(item)} onClick={event => event.stopPropagation()} />
                </td>
                <td>{item.location}</td>
                <td>{item.type}</td>
                <td>{item.device_health}</td>
                <td>{item.last_used}</td>
                <td>{item.price}</td>
                <td>{item.color}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;