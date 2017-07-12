import React from 'react';
import fetch from 'isomorphic-fetch';
import Index from 'pages/index';
import { config } from 'config';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const citrusContentfulApiUrl = `https://cdn.contentful.com/spaces/${config.citrusSpaceId}/entries?access_token=${config.citrusContentfulAccessToken}`;

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

// Initial data fetch function (called in component did mount)
export function fetchContentful() {
    return dispatch => {
        dispatch(requestContentful())
        return fetch(citrusContentfulApiUrl)
            .then(
                response => response.json(),
                error => console.log('An error occured.', error)
            )
            .then(json => dispatch(receiveContentful(json)))
    }
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

export function powerButtonChange(power, id) {
    return {
        type: POWER_BUTTON_CHANGE,
        power,
        id
    }
}

export function volumeChange(volume, id) {
    return {
        type: VOLUME_CHANGE,
        volume,
        id
    }
}

export function brightnessChange(brightness, id) {
    return {
        type: BRIGHTNESS_CHANGE,
        brightness,
        id
    }
}

export function selectedValueChange(selectedValue, id) {
    return {
        type: SELECTED_VALUE_CHANGE,
        selectedValue,
        id
    }
}

// Reducer
function appReducer(state = {}, action = {}){
    const id = action.id;
    switch (action.type){
        case REQUEST_CONTENTFUL:
            return {
                ...state,
                isFetching: true
            }

        case RECEIVE_CONTENTFUL:
            const contentfulItems = action.contentful.items;
            const itemsWithFields = contentfulItems.map(
                (item) => {
                    const createdDateMilliseconds = Date.parse(item.sys.createdAt);
                    const itemOptions = item.fields.selectorValues;
                    let selectOptions = [];

                    if(item.fields.selectorValues) {
                        selectOptions = itemOptions.map(
                            (option) => {
                                return { value: option, label: option}
                            }
                        )
                    }

                    return {
                        ...item,
                        ...item.fields,
                        selectOptions,
                        createdDateMilliseconds
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
                isFetching: false,
                contentful: action.contentful,
                lastUpdated: action.receivedAt
            }

        case SELECTED_VALUE_CHANGE:
            const selectedValue = action.selectedValue.value;

            return {
                ...state,
                devices: {
                    ...state.devices,
                    [id]:{
                        ...state.devices[id],
                        selectedValue
                    }
                }
            }

        case POWER_BUTTON_CHANGE:
            const power = action.power;

            return {
                ...state,
                devices: {
                    ...state.devices,
                    [id]:{
                        ...state.devices[id],
                        power
                    }
                }
            }

        case VOLUME_CHANGE:
            const volume = action.volume;

            return {
                ...state,
                devices: {
                    ...state.devices,
                    [id]:{
                        ...state.devices[id],
                        volume
                    }
                }
            }

        default:
            return state
    }
}

// Component
export default class App extends React.Component {
    render () {
        return (
            <Provider store={store} >
                {this.props.children}
            </Provider>
        )
    }
}
