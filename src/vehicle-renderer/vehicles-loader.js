import rawVehicles from './vehicles/vehicles.txt';
import { getAreaSize } from '../utils/vehicle-utils';

export function getSortedVehicles() {
  return fetch(rawVehicles)
    .then((r) => r.text())
    .then((text) => {
      const seperatedVehicle = text.split(/(\r?\n){3}/);
      return seperatedVehicle
        .map((vehicle) => vehicle.replaceAll('#', '█'))
        .map((vehicle) => ({ text: vehicle, length: getAreaSize(vehicle) }))
        .sort((vehicle) => vehicle.length);
    });
}
