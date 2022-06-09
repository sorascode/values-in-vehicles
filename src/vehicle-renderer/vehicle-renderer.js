import {Component} from "react";

export class VehicleRenderer extends Component {
    render() {
        return (
            <pre>{this.props.text}</pre>
        )
    }
}
