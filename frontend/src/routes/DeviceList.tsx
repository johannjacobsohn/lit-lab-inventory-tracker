import CollectionView from '../components/CollectionView';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export default function DeviceList() {
  return (
    <CollectionView
      title="Devices"
      apiUrl={apiBaseUrl + '/devices'}
      linkItem={(device) => `/devices/${device.id}`
      }
    />
  )
}