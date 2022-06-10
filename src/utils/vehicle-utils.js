export const splitChar = '█';

export function renderVehicle(vehicle, text) {
  if (vehicle === undefined) {
    return text;
  }

  const startArea = vehicle.indexOf(splitChar);
  if (startArea === -1) {
    return vehicle;
  }

  const endArea = vehicle.indexOf(splitChar, startArea + 1);
  const middle = (endArea + startArea) / 2 + 1;
  const textArea = endArea - startArea + 1;

  const validText = text.trim();

  let textLength = validText.length;
  if (validText.length > textArea) {
    textLength = validText.lastIndexOf(' ', textArea);
    if (textLength === -1) {
      textLength = textArea;
    }
  }
  const textSpan = textLength / 2;

  const startSplit = middle - textSpan;
  const endSplit = middle + textSpan;

  const cleanedVehicle = vehicle.replace(splitChar, ' ').replace(splitChar, ' ');

  const startString = cleanedVehicle.substring(0, startSplit);
  const endString = cleanedVehicle.substring(endSplit);

  const interpolatedVehicle = startString + validText.substring(0, textLength) + endString;

  return renderVehicle(interpolatedVehicle, validText.substring(textLength));
}

export function getAreaSize(vehicle) {
  const startArea = vehicle.indexOf(splitChar);
  if (startArea === -1) {
    return 0;
  }
  const endArea = vehicle.indexOf(splitChar, startArea + 1);
  if (endArea === -1) {
    return 0;
  }
  const cleanedVehicle = vehicle.replace(splitChar, ' ').replace(splitChar, ' ');
  return endArea - startArea + 1 + getAreaSize(cleanedVehicle);
}

export function canFitText(vehicle, text) {
  const startArea = vehicle.indexOf(splitChar);
  const validText = text.trim();
  if (startArea === -1) {
    return validText.length === 0;
  }
  const endArea = vehicle.indexOf(splitChar, startArea + 1);
  if (endArea === -1) {
    return validText.length === 0;
  }
  const textArea = endArea - startArea + 1;
  if (textArea >= validText.length) {
    return true;
  }
  let accommodatedLength = validText.lastIndexOf(' ', textArea);
  if (accommodatedLength === -1) {
    accommodatedLength = textArea;
  }
  const cleanedVehicle = vehicle.replace(splitChar, ' ').replace(splitChar, ' ');
  return canFitText(cleanedVehicle, validText.substring(accommodatedLength));
}
