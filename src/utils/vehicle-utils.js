export const splitChar = '█';

export function renderVehicle(vehicle, text) {
  return renderVehicleRecursively(vehicle, text, undefined);
}

function renderVehicleRecursively(vehicle, text, link) {
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

  const usableText = escapeHtml(validText.substring(0, textLength));
  const remainingText = validText.substring(textLength);

  const linkSplitVehicle = usableText.split(' ');

  let textIncludingLinks = '';

  let endLink = undefined;

  for (let i = 0; i < linkSplitVehicle.length; i++) {
    if (i === 0 && link !== undefined) {
      textIncludingLinks += "<a href='" + link + "'>" + linkSplitVehicle[i] + '</a>';
      if (linkSplitVehicle.length === 1) {
        if (
          !usableText.endsWith(' ') &&
          remainingText.length !== 0 &&
          !remainingText.startsWith(' ')
        ) {
          endLink = link;
        }
      }
    } else if (
      (linkSplitVehicle[i].startsWith('https://') && linkSplitVehicle[i].length > 8) ||
      (linkSplitVehicle[i].startsWith('http://') && linkSplitVehicle[i].length > 7)
    ) {
      if (i < linkSplitVehicle.length - 1) {
        textIncludingLinks +=
          "<a href='" + linkSplitVehicle[i] + "'>" + linkSplitVehicle[i] + '</a>';
      } else {
        if (
          usableText.endsWith(' ') ||
          remainingText.length === 0 ||
          remainingText.startsWith(' ')
        ) {
          textIncludingLinks +=
            "<a href='" + linkSplitVehicle[i] + "'>" + linkSplitVehicle[i] + '</a>';
        } else {
          endLink = linkSplitVehicle[i] + remainingText.split(' ')[0];
          textIncludingLinks += "<a href='" + endLink + "'>" + linkSplitVehicle[i] + '</a>';
        }
      }
    } else {
      textIncludingLinks += linkSplitVehicle[i];
    }
    if (i < linkSplitVehicle.length - 1 || usableText.endsWith(' ')) {
      textIncludingLinks += ' ';
    }
  }

  const interpolatedVehicle = startString + textIncludingLinks + endString;

  return renderVehicleRecursively(interpolatedVehicle, remainingText, endLink);
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

function escapeHtml(htmlStr) {
  return htmlStr
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
