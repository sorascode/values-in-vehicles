import './vehicle-renderer.scss';
import { Component } from 'react';
import { renderVehicle } from '../utils/vehicle-utils';
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
    const minCar = this.state.vehicles.find((vehicle) => vehicle.length >= this.props.text.length);
    if (minCar === undefined) {
      return undefined;
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
