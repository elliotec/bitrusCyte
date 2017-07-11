import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Toggle from 'react-toggle';
import './toggle.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './Device.css';

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
                <h5><em>{this.props.type}</em></h5>
                <h6>{this.props.powerButtonName}</h6>
                {this.props.shouldHavePowerButton && <Toggle
                    defaultChecked={true}
                /> }
                <br />
                <h6>{this.props.volumeSliderName}</h6>
                {this.props.shouldHaveVolumeSlider && <Slider /> }
                <h6>{this.props.brightnessSliderName}</h6>
                {this.props.shouldHaveBrightnessSlider && <Slider /> }
                {this.props.shouldHaveSelector &&
                    <div>
                        <h6>{this.props.selectorName}</h6>
                        <Select />
                    </div>
                }
            </div>
        );
    }
}
