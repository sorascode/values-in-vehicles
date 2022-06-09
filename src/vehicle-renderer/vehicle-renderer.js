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
    navigator.clipboard.writeText(renderVehicle(this.chooseCar(), this.props.text));
  };

  render() {
    return (
      <pre onClick={this.copyToClipboard}>{renderVehicle(this.chooseCar(), this.props.text)}</pre>
    );
  }
}
