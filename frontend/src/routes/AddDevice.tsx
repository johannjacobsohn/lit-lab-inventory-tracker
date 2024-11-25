import { Device } from '../components/devices/Device';
import DeviceForm from '../components/DeviceForm';
import { mutate } from 'swr';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export default function DevicePage() {

  const handleSubmit = async (device: Device) => {
    const response = await fetch(`${apiBaseUrl}/devices`, {
      method: 'POST',
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
      <h2 className="fs-4">Add new Device</h2>
      <DeviceForm onSubmit={handleSubmit} />
    </div>
  );
};

