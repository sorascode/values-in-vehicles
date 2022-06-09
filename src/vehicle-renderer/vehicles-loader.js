import rawVehicles from './vehicles/vehicles.txt';
import { getAreaSize } from '../utils/vehicle-utils';

export function getSortedVehicles() {
  return fetch(rawVehicles)
    .then((r) => r.text())
    .then((text) => {
      const seperatedVehicle = text.split('\n\r\n\r\n');
      return seperatedVehicle
        .map((vehicle) => ({ text: vehicle, length: getAreaSize(vehicle) }))
        .sort((vehicle) => vehicle.length);
    });
}
