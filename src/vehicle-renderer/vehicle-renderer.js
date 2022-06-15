import './vehicle-renderer.scss';
import { Component } from 'react';
import { canFitText, renderVehicle } from '../utils/vehicle-utils';
import { getSortedVehicles } from './vehicles-loader';

export class VehicleRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = { vehicles: [] };
  }

  componentDidMount() {
    getSortedVehicles().then((vehicles) => {
      this.setState({ vehicles });
    });
  }

  chooseCar() {
    if (this.state.vehicles === undefined || this.state.vehicles.length === 0) {
      return undefined;
    }
    const minCar = this.state.vehicles.find((vehicle) => canFitText(vehicle.text, this.props.text));
    if (minCar === undefined) {
      return this.state.vehicles[this.state.vehicles.length - 1].text;
    }
    return minCar.text;
  }

  copyToClipboard = () => {
    const text = renderVehicle(this.chooseCar(), this.props.text);
    const type = 'text/html';
    const blob = new Blob(['<pre>' + text + '</pre>'], { type });
    const data = [new window.ClipboardItem({ [type]: blob })];
    navigator.clipboard.write(data);
  };

  render() {
    return (
      <pre onClick={this.copyToClipboard} title="Click to copy!">
        {renderVehicle(this.chooseCar(), this.props.text)}
      </pre>
    );
  }
}
