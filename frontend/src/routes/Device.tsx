import useSWR from 'swr';
import { useParams, Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { Device } from '../components/devices/Device';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export default function DevicePage() {
  const params = useParams();
  const deviceId = params.id;

  const { data: device, isLoading: isLoadingDevice, error: errorDevice } = useSWR<Device, Error>(`${apiBaseUrl}/devices/${deviceId}`, fetcher, { fallbackData: new Device() });

  if (errorDevice) return <div>failed to load</div>
  if (isLoadingDevice) return <div>loading...</div>
  console.log(device, 'device', new Device())
  if (!device) return <div>no data</div>

  return (
    <div>
      <Link to={`/devices`} aria-label='Close' className='btn' style={{position: "absolute", right: "0"}}>X</Link>
      <h2 className="fs-4">{device.type} @ {device.location} <Link to={`/devices/${device.id}/edit`} title="Edit this Device"><FaRegEdit /></Link></h2>
      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <tbody>
            <tr>
              <th>Id</th>
              <td>{device.id}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{device.location}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{device.type}</td>
            </tr>
            <tr>
              <th>Device Health</th>
              <td>{device.device_health}</td>
            </tr>
            <tr>
              <th>Last Used</th>
              <td>{device.last_used}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>{device.price}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{device.color}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

