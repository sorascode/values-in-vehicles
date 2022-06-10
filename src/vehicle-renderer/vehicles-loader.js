import rawVehicles from './vehicles/vehicles.txt';
import { getAreaSize } from '../utils/vehicle-utils';

export function getSortedVehicles() {
  return fetch(rawVehicles)
    .then((r) => r.text())
    .then((text) => {
      const seperatedVehicle = text.split(/\r?\n\r?\n\r?\n/);
      return seperatedVehicle
        .map((vehicle) => vehicle.replaceAll('#', '█'))
        .map((vehicle) => ({ text: vehicle, length: getAreaSize(vehicle) }))
        .sort((vehicle1, vehicle2) => vehicle1.length - vehicle2.length);
    });
}
