import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Device } from './devices/Device';
import * as yup from 'yup';



const schema = yup
  .object({
    location: yup.string().required("Location is required"),
    type: yup.string().required("Type is required"),
    device_health: yup.string().required("Device Health is required"),
    last_used: yup.string().required("Last Used is required"),
    price: yup.string().required("Price is required"),
    color: yup.string().required("Color is required"),
  })

type FormValues = {
  location: string;
  type: string;
  device_health: string;
  last_used: string;
  price: string;
  color: string;
}

interface DeviceFormProps {
  device?: Device;
  onSubmit: SubmitHandler<Device>
}

const DeviceForm: React.FC<DeviceFormProps> = ({device = new Device, onSubmit}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: {...device} });

  const navigate = useNavigate();

  function submitHandler (data: FormValues) {
    const device = new Device();
    device.location = data.location;
    device.type = data.type;
    device.device_health = data.device_health;
    device.last_used = data.last_used;
    device.price = data.price;
    device.color = data.color;

    onSubmit(device);
  }


  return (<div>
    <Form onSubmit={handleSubmit(submitHandler)}>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="deviceform-location" >
          <Form.Label>Location</Form.Label>
          <Form.Control
            isInvalid={!!errors.location}
            {...register("location", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.location?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="deviceform-type" >
          <Form.Label>Type</Form.Label>
          <Form.Control
            isInvalid={!!errors.type}
            {...register("type", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.type?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="deviceform-device_health" >
          { /* FIXME: Select */}
          <Form.Label>Device Health</Form.Label>
          <Form.Control
            isInvalid={!!errors.device_health}
            {...register("device_health", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.device_health?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="deviceform-last_used" >
          { /* FIXME: Date picker */ }
          <Form.Label>Last Used</Form.Label>
          <Form.Control
            isInvalid={!!errors.last_used}
            {...register("last_used", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.last_used?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="deviceform-price" >
          <Form.Label>Price</Form.Label>
          <Form.Control
            isInvalid={!!errors.price}
            {...register("price", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="deviceform-color" >
          { /*FIXME: Color picker */ }
          <Form.Label>Color</Form.Label>
          <Form.Control
            isInvalid={!!errors.color}
            {...register("color", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.color?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">Submit</Button>
      <Button variant="secondary" onClick={() => navigate(-1)} className='m-3'>Cancel</Button>
    </Form>
  </div>)

}


export default DeviceForm;