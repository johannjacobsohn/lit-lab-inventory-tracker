import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Device } from '../components/devices/Device';
import DeviceForm from '../components/DeviceForm';
import { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export default function DevicePage() {
  const params = useParams();
  const deviceId = params.id;
  const { data: device, isLoading: isLoadingDevice, error: errorDevice } = useSWR<Device, Error>(`${apiBaseUrl}/devices/${deviceId}`, fetcher);

  if (errorDevice) return <div>failed to load</div>
  if (isLoadingDevice) return <div>loading...</div>
  if (!device) return <div>no data</div>

  const handleSubmit = async (device: Device) => {

    const response = await fetch(`${apiBaseUrl}/devices/${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(device),
    });

    if (response.ok) {
      mutate(`${apiBaseUrl}/devices`);
    }
  }

  return (
    <div>
      <h2 className="fs-4">Edit device {device.type} @ {device.location}</h2>
      <DeviceForm device={device} onSubmit={(device) => handleSubmit(device)} />
    </div>
  );
};

