import React from 'react';
import * as contentful from 'contentful-management'
import fetch from 'isomorphic-fetch';
import _map from 'lodash/map';
import Index from 'pages/index';
import { config } from 'config';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const contentfulCmaToken = 'CFPAT-b344e4c210ab7ef654e5cf0a2b3144d8464e8c0c5af3a7a3ce8d684b5dfa6749'

const client = contentful.createClient({
  accessToken: contentfulCmaToken
});
// Builds redux store
function configureStore(preloadedState) {
    return createStore(
        appReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware
            )
        )
    )
}
const store = configureStore();

export function fetchContentful() {
    return dispatch => {
        dispatch(requestContentful())
        return client.getSpace(config.citrusSpaceId)
            .then(space => {space.getEntries()
                .then(entries => {dispatch(receiveContentful(entries))})
            })
    }
}

export function sendUpdateToContentful(entryId, state) {
    const newFields = state.devices[entryId].fields;
    return client.getSpace(config.citrusSpaceId)
        .then(space => space.getEntry(entryId))
        .then(entry => {entry.fields = newFields;
            return entry.update()
        })
        .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
        .catch(console.error)
}

// Action Types
const RECEIVE_CONTENTFUL = 'RECEIVE_CONTENTFUL';
const REQUEST_CONTENTFUL = 'REQUEST_CONTENTFUL';
const POWER_BUTTON_CHANGE = 'POWER_BUTTON_CHANGE';
const SELECTED_VALUE_CHANGE = 'SELECTED_VALUE_CHANGE';
const VOLUME_CHANGE = 'VOLUME_CHANGE';
const BRIGHTNESS_CHANGE = 'BRIGHTNESS_CHANGE';

// Action Creators
function requestContentful() {
    return {
        type: REQUEST_CONTENTFUL
    }
}

function receiveContentful(json) {
    return {
        type: RECEIVE_CONTENTFUL,
        receivedAt: Date.now(),
        contentful: json
    }
}

export function powerButtonChange(power, id, fields) {
    return {
        type: POWER_BUTTON_CHANGE,
        power,
        id,
        fields
    }
}

export function volumeChange(volume, id, fields) {
    return {
        type: VOLUME_CHANGE,
        volume,
        id,
        fields
    }
}

export function brightnessChange(brightness, id, fields) {
    return {
        type: BRIGHTNESS_CHANGE,
        brightness,
        id,
        fields
    }
}

export function selectedValueChange(selectedValue, id, fields) {
    return {
        type: SELECTED_VALUE_CHANGE,
        selectedValue,
        id,
        fields
    }
}

// Reducer
function appReducer(state = {}, action = {}){
    const id = action.id;
    switch (action.type){
        case REQUEST_CONTENTFUL:
            return {
                ...state
            }

        case RECEIVE_CONTENTFUL:
            const contentfulItems = action.contentful.items;
            const itemsWithFields = contentfulItems.map(
                (item) => {
                    let selectOptions = [];
                    if(item.fields.selectorValues) {
                        const itemOptions = item.fields.selectorValues["en-US"];
                        selectOptions = itemOptions.map(
                            (option) => {
                                return { value: option, label: option}
                            }
                        )
                    }

                    return {
                        ...item,
                        selectOptions,
                        fields: {
                            ...item.fields
                        }
                    }
                }
            );

            const itemsById = itemsWithFields.reduce(
                (accum, item) => {
                    const itemId = item.sys.id;
                    accum[itemId] = item;

                    return accum;
                }, {}
            );

            return {
                ...state,
                devices: itemsById,
                contentful: action.contentful,
                lastUpdated: action.receivedAt
            }

        case SELECTED_VALUE_CHANGE:

            const selectedValue = action.selectedValue.value;

            const selectedValueNewState = {
                ...state,
                devices: {
                    ...state.devices,
                    [id]:{
                        ...state.devices[id],
                        fields: {
                            ...state.devices[id].fields,
                            selectedValue:{"en-US": selectedValue}
                        }
                    }
                }

            }

            sendUpdateToContentful(action.id, selectedValueNewState)

            return selectedValueNewState;

        case POWER_BUTTON_CHANGE:
            const power = action.power;

            const powerNewState = {
                ...state,
                devices: {
                    ...state.devices,
                    [id]:{
                        ...state.devices[id],
                        fields: {
                            ...state.devices[id].fields,
                            power:{"en-US": power}
                        }
                    }
                }
            }

            sendUpdateToContentful(action.id, powerNewState)

            return powerNewState;

        case VOLUME_CHANGE:
            const volume = action.volume;

            const volumeNewState = {
                ...state,
                devices: {
                    ...state.devices,
                    [id]:{
                        ...state.devices[id],
                        fields: {
                            ...state.devices[id].fields,
                            sliderValue:{"en-US": volume}
                        }
                    }
                }

            }

            sendUpdateToContentful(action.id, volumeNewState)

            return volumeNewState;

        case BRIGHTNESS_CHANGE:
            const brightness = action.brightness;

            const brightnessNewState = {
                ...state,
                devices: {
                    ...state.devices,
                    [id]:{
                        ...state.devices[id],
                        fields: {
                            ...state.devices[id].fields,
                            brightnessSliderValue:{"en-US": brightness}
                        }
                    }
                }

            }

            sendUpdateToContentful(action.id, brightnessNewState)

            return brightnessNewState;

        default:
            return state
    }
}

// Component
export default class App extends React.Component {
    render () {
        return (
            <Provider store={store} >
                <Index />
            </Provider>
        )
    }
}
