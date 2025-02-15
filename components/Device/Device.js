import React from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Toggle from 'react-toggle';
import './toggle.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './Device.css';
import {
    selectedValueChange,
    powerButtonChange,
    volumeChange,
    brightnessChange
} from '../../pages/_template.jsx';

export class Device extends React.Component {
    render () {
        return (
            <div className="device-container">
                <h4>{this.props.name}</h4>
                <h5><em>{this.props.type}</em></h5>
                {this.props.shouldHavePowerButton &&
                    <div>
                        <h6>{this.props.powerButtonName}</h6>
                        <Toggle
                            defaultChecked={this.props.power}
                            onChange={(e) => {this.props.dispatch(powerButtonChange(e.target.checked, this.props.id, this.props.fields))}}
                        />
                    </div>
                }
                {this.props.shouldHaveVolumeSlider &&
                    <div>
                        <h6>{this.props.volumeSliderName}</h6>
                        <Slider
                            value={parseInt(this.props.volume)}
                            onChange={(value) => {this.props.dispatch(volumeChange(value, this.props.id,this.props.fields))}}
                        />
                    </div>
                }
                {this.props.shouldHaveBrightnessSlider &&
                    <div>
                        <h6>{this.props.brightnessSliderName}</h6>
                        <Slider
                            value={parseInt(this.props.brightness)}
                            onChange={(value) => {this.props.dispatch(brightnessChange(value, this.props.id, this.props.fields))}}
                        />
                    </div>
                }
                {this.props.shouldHaveSelector &&
                    <div>
                        <h6>{this.props.selectorName}</h6>
                        <Select
                            options={this.props.selectOptions}
                            onChange={(value) => {this.props.dispatch(selectedValueChange(value, this.props.id, this.props.fields))}}
                            name={this.props.selectorName}
                            searchable={false}
                            value={this.props.selectedValue}
                        />
                        <br />
                    </div>
                }
            </div>
        );
    }
}

// Connected Component
export default connect()(Device)
