"use strict";
// Type: Component
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
class Device {
    constructor(initializer = {}) {
        this.id = initializer.id;
        this.location = initializer.location;
        this.type = initializer.type;
        this.device_health = initializer.device_health;
        this.last_used = initializer.last_used;
        this.price = initializer.price;
        this.color = initializer.color;
    }
}
exports.Device = Device;
