import './App.scss';
import { Component } from 'react';
import { VehicleRenderer } from './vehicle-renderer/vehicle-renderer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  textChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div>
        <h1>Values in Vehicles</h1>
        <p>
          Vehicles sourced from{' '}
          <a href="https://www.asciiart.eu/vehicles" target="_blank" rel="noopener noreferrer">
            https://www.asciiart.eu/vehicles
          </a>
        </p>
        <input type="text" placeholder="enter text here" onChange={this.textChange} />
        <VehicleRenderer text={this.state.text} />
      </div>
    );
  }
}

export default App;
