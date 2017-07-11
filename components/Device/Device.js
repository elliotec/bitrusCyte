import React from 'react';
import './Device.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Toggle from 'react-toggle';
import './toggle.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

let options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

function logChange(val) {
  console.log("Selected: " + JSON.stringify(val));
}
export default class Device extends React.Component {
    render () {
        return (
            <div className="device-container">
                <h4>{this.props.name}</h4>
                <p>{this.props.type}</p>
                {this.props.shouldHavePowerButton ? <Toggle
                    defaultChecked={true}
                /> : null}
                {this.props.shouldHaveVolumeSlider ? <Slider /> : null}
                <br/>
                {this.props.shouldHaveBrightnessSlider ? <Slider /> : null}
                <br />
                {this.props.shouldHaveSelector ? <Select
                    name="form-field-name"
                    value="one"
                    options={options}
                    onChange={logChange}/> : null}

            </div>
        );
    }
}
