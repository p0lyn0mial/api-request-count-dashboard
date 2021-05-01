import { createStore } from "redux"

const initialState = {
    store: {
        // the currently displayed dataset
        dataSetView: [],

        // for the details component
        selectedRowID: "",

        // selected options for the multi select component on the main page
        selectedOptions: []
    }
}

function rootReducer(state = initialState, action) {
    if (action.type === "setDataSetView") {state.dataSetView = action.payload}
    if (action.type == "setSelectedRowID") {state.selectedRowID = action.payload}
    if (action.type == "setSelectedOptions") {state.selectedOptions = action.payload}
    return state;
}

// store is a global state for sharing state between the index page and the details page
const store = createStore(rootReducer)

function setDataSetView(payload) {return { type: "setDataSetView", payload }}
function setSelectedRowID(payload) {return {type: "setSelectedRowID", payload}}
function setSelectedOptions(payload) {return {type: "setSelectedOptions", payload}}

export {store, rootReducer, setDataSetView, setSelectedRowID, setSelectedOptions}
