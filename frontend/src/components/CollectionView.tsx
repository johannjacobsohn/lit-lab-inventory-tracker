import useSWR from 'swr'
import { Outlet, useOutlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { FaLaptop as Laptop } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Device } from './devices/Device';
import ListView from './ListView';
import TableView from './TableView';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface ListProps {
  title: string;
  apiUrl: string;
  linkItem: (item: Device) => string;
}

function compare(sortProperty: string, a: Device, b: Device) {
  if (typeof a[sortProperty] == 'string' && typeof b[sortProperty] == 'string') {
    return a[sortProperty].localeCompare(b[sortProperty])
  } else if (typeof a[sortProperty] == 'number' && typeof b[sortProperty] == 'number') {
    return a[sortProperty] - b[sortProperty]
  }

  return 0
}

const List: React.FC<ListProps> = ({ title, apiUrl, linkItem }) => {

  const { data, error, isLoading } = useSWR<Device[], Error>(apiUrl, fetcher)
  const params = useParams();
  const id = params.id;

  const [sortProperty, setSortProperty] = useState('');
  const [view, setView] = useState('list');

  const outlet = useOutlet()

  // use localstorage to save the sorting property.
  // normally, this should be done in some sort of setting that gets saved in the backend, or by using a lib that provides useLocalStorage, but lets quickly hack it here.
  // also, use title as a key, so that we can have different sorting properties for different lists
  useEffect(() => {
    const savedSortProperty = localStorage.getItem(`${title}-sortProperty`)
    if (savedSortProperty) {
      setSortProperty(savedSortProperty)
    }
  }, [title])

  useEffect(() => {
    localStorage.setItem(`${title}-sortProperty`, sortProperty)
  }, [sortProperty, title])

  const [selection, setSelection] = useState<Device[]>([]);

  function toggleSelection(item: Device) {
    if (selection.includes(item)) {
      setSelection(selection.filter(i => i !== item))
    } else {
      setSelection([...selection, item])
    }
  }

  function selectAll() {
    setSelection(data || [])
  }

  function deselectAll() {
    setSelection([])
  }

  function row(item: Device) {
    return Object.values(item).join(';') // lets pray that there are no semicolons in the data
  }

  function header(item: Device) {
    return Object.keys(item).join(';')
  }

  function handleExport() {
    const blob = new Blob([header(new Device()), selection.map(item => row(item)).join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (error) console.error(apiUrl, error)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const ViewComponent = view === 'list' ? ListView : TableView

  return (
    <div className="d-flex flex-nowrap h-100">
      <div className={`col p-3 bg-body-tertiary d-md-flex flex-column ${outlet ? "col-md-4 col-12 d-none" : "col-12"} h-100`}>
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <Laptop size={24} className="me-2" />
          <h2 className="fs-4">{title}</h2>
        </div>
        <div className="d-flex" style={{ 'display': 'flex', 'justifyContent': "space-between" }}>
          <Form.Check aria-label="Select all" onChange={e => e.target.checked ? selectAll() : deselectAll()} />
          <ButtonGroup size='sm' className='ml-2'>
            <Button disabled={!selection.length} title="Export selected items to cvs" variant="primary" onClick={handleExport}>Export</Button>
            <Form.Select aria-label="View" size='sm' value={view} onChange={e => setView(e.target.value)}>
              <option key="list" value="list">List</option>
              <option key="table" value="table">Table</option>
            </Form.Select>
            <Form.Select aria-label="Sort by" size='sm' value={sortProperty} onChange={e => setSortProperty(e.target.value)}>
              <option>SortBy</option>
              {Object.keys(new Device()).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </Form.Select>
          </ButtonGroup>
        </div>
        <hr />
        <div className="h-100 overflow-scroll">
          {data && <ViewComponent data={data} selection={selection} toggleSelection={toggleSelection} linkItem={linkItem} sortProperty={sortProperty} compare={compare} id={id} />}
        </div>
      </div>
      {outlet && outlet && <div className="d-flex flex-column flex-grow-1 p-3 col-6">
        <Outlet />
      </div>}
    </div>
  )
}

export default List;