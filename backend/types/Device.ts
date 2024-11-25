// Type: Component

export class Device {
  [key: string]: string | number | undefined;
  id: number | undefined;
  location: string | undefined;
  type: string | undefined;
  device_health: string | undefined;
  last_used: string | undefined;
  price: string | undefined;
  color: string | undefined;

  constructor(initializer: Partial<Device> = {}) {
    this.id = initializer.id;
    this.location = initializer.location;
    this.type = initializer.type;
    this.device_health = initializer.device_health;
    this.last_used = initializer.last_used;
    this.price = initializer.price;
    this.color = initializer.color;
  }
}
