export const splitChar = '#';

export function renderVehicle(vehicle, text) {
  if (vehicle === undefined) {
    return text;
  }

  const startArea = vehicle.indexOf(splitChar);
  if (startArea === -1) {
    return text;
  }

  const endArea = vehicle.indexOf(splitChar, startArea + 1);
  const middle = startArea + (endArea - startArea) / 2 + 1;

  const cleanedVehicle = vehicle.replaceAll(splitChar, ' ');

  const textSpan = text.length / 2;

  const startSplit = middle - textSpan;
  const endSplit = middle + textSpan;

  const startString = cleanedVehicle.substring(0, startSplit);
  const endString = cleanedVehicle.substring(endSplit);

  return startString + text + endString;
}

export function getAreaSize(vehicle) {
  const startArea = vehicle.indexOf(splitChar);
  const endArea = vehicle.indexOf(splitChar, startArea + 1);
  return endArea - startArea + 1;
}
