import React from 'react';
import Device from 'components/Device/Device';
import _map from 'lodash/map';
import './Devices.css';

export default class Devices extends React.Component {
    render () {
        return (
            <section className="devices">
                <h2 className="devices-header">Devices</h2>
                <div className="devices-flex">
                    {_map(this.props.devices, device =>
                        <Device
                            key={device.sys.id}
                            id={device.sys.id}
                            name={device.deviceName}
                            type={device.type}
                            shouldHaveVolumeSlider={device.shouldHaveVolumeSlider}
                            dispatch={this.props.dispatch}
                            shouldHaveBrightnessSlider={device.shouldHaveBrightnessSlider}
                            shouldHaveSelector={device.shouldHaveSelector}
                            shouldHavePowerButton={device.shouldHavePowerButton}
                            volumeSliderName={device.volumeSliderName}
                            brightnessSliderName={device.brightnessSliderName}
                            selectorName={device.selectorName}
                            powerButtonName={device.powerButtonName}
                            volume={device.volume}
                            brightness={device.brightness}
                            power={device.power}
                            selectOptions={device.selectOptions}
                            selectedValue={device.selectedValue}
                        />
                    )}
                </div>
            </section>
        );
    }
}
