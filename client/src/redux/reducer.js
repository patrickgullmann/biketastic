import { combineReducers } from "redux";
import markersReducer from "./markers/slice.js";
import popupNewMarkerReducer from "./popup-new-marker/slice.js";
import locationNewMarkerReducer from "./location-new-marker/slice.js";
import popupMarkerInfoReducer from "./popup-marker-info/slice.js";

const rootReducer = combineReducers({
    markers: markersReducer,
    popupNewMarker: popupNewMarkerReducer,
    locationNewMarker: locationNewMarkerReducer,
    popupMarkerInfo: popupMarkerInfoReducer,
});

export default rootReducer;
