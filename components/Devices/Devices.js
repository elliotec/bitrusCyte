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
                            fields={device.fields}
                            name={device.fields.deviceName["en-US"]}
                            type={device.fields.type["en-US"]}
                            shouldHaveVolumeSlider={device.fields.shouldHaveVolumeSlider["en-US"]}
                            dispatch={this.props.dispatch["en-US"]}
                            shouldHaveBrightnessSlider={device.fields.shouldHaveBrightnessSlider["en-US"]}
                            shouldHaveSelector={device.fields.shouldHaveSelector["en-US"]}
                            shouldHavePowerButton={device.fields.shouldHavePowerButton["en-US"]}
                            volumeSliderName={device.fields.volumeSliderName ? device.fields.volumeSliderName["en-US"] : ''}
                            brightnessSliderName={device.fields.brightnessSliderName ? device.fields.brightnessSliderName["en-US"] : ''}
                            selectorName={device.fields.selectorName ? device.fields.selectorName["en-US"] : ''}
                            powerButtonName={device.fields.powerButtonName ? device.fields.powerButtonName["en-US"] : ''}
                            volume={device.fields.sliderValue ? device.fields.sliderValue["en-US"] : '' }
                            brightness={device.fields.brightnessSliderValue ? device.fields.brightnessSliderValue["en-US"]: ''}
                            power={device.fields.power ? device.fields.power["en-US"] : ''}
                            selectOptions={device.selectOptions ? device.selectOptions : []}
                            selectedValue={device.fields.selectedValue ? device.fields.selectedValue["en-US"] : ''}
                        />

                    )}
                </div>
            </section>
        );
    }
}
