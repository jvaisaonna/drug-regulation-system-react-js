import storage from "./storage";
import * as types from "./actions";

let tempUser = JSON.stringify(storage.get("user"));
if (tempUser === "null" || tempUser === "") {
	storage.set("user", JSON.stringify({}));
}

const initialState = {
	isLoggedIn: JSON.stringify(storage.get("user")).replace(/"/g, "") !== "{}",
	user: JSON.parse(storage.get("user")) || {},
	pageTitle: "",
	notifications: [],
	patientList: JSON.parse(storage.get("patientList")) || [], // For Doctor
	hospital: JSON.parse(storage.get("hospital")) || {}, // For Hospital
	drugFormulary: JSON.parse(storage.get("drugFormulary")) || [], // For HA
	selfRecord: JSON.parse(storage.get("selfRecord")) || [], // For patient
	doctorDeliveryRecordList:
		JSON.parse(storage.get("doctorDeliveryRecordList")) || [],
	pharmacistDeliveryRecordList:
		JSON.parse(storage.get("pharmacistDeliveryRecordList")) || [],
	pharmacistProcessingRecord:
		JSON.parse(storage.get("pharmacistProcessingRecord")) || []
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case types.SET_TOKEN:
			storage.set("token", action.token);
			return {
				...state
			};
		case types.SET_USER:
			storage.set("user", JSON.stringify(action.user));
			return {
				...state,
				isLoggedIn:
					JSON.stringify(storage.get("user")).replace(/"/g, "") !== "{}",
				user: action.user
			};
		case types.SET_PAGE_TITLE:
			return {
				...state,
				pageTitle: action.pageTitle
			};
		case types.ADD_NOTIFICATION:
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						time: Date.now(),
						title: action.title,
						content: action.content,
						isPermanent: action.isPermanent,
						isShow: true
					}
				]
			};
		case types.REMOVE_NOTIFICATION:
			return {
				...state,
				notifications: state.notifications.filter(n => {
					return action.time !== n.time;
				})
			};
		case types.SET_DRUG_FORMULARY:
			action.drugFormulary = action.drugFormulary.sort(function(a, b) {
				var nameA = a.name.toUpperCase();
				var nameB = b.name.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}

				return 0;
			});
			storage.set("drugFormulary", JSON.stringify(action.drugFormulary));
			return {
				...state,
				drugFormulary: [...action.drugFormulary]
			};
		case types.SET_HOSPITAL:
			storage.set("hospital", JSON.stringify(action.hospital));
			return {
				...state,
				hospital: action.hospital
			};
		case types.SET_PATIENT_LIST:
			storage.set("patientList", JSON.stringify(action.patientList));
			return {
				...state,
				patientList: action.patientList
			};
		case types.SET_SELF_RECORD:
			action.deliveredRecord = action.deliveryRecord.sort(
				(a, b) => b.actions[0].time - a.actions[0].time
			);
			storage.set("selfRecord", JSON.stringify(action.deliveryRecord));
			return {
				...state,
				selfRecord: [...action.deliveryRecord]
			};
		case types.SET_DOCTOR_DELIVERY_RECORD_LIST:
			action.deliveryRecordList = action.deliveryRecordList.sort(
				(a, b) => b.actions[0].time - a.actions[0].time
			);
			storage.set(
				"doctorDeliveryRecordList",
				JSON.stringify(action.deliveryRecordList)
			);
			return {
				...state,
				doctorDeliveryRecordList: [...action.deliveryRecordList]
			};
		case types.SET_PHARMACIST_DELIVERY_RECORD_LIST:
			action.deliveryRecordList = action.deliveryRecordList.sort(
				(a, b) => a.actions[0].time - b.actions[0].time
			);
			storage.set(
				"pharmacistDeliveryRecordList",
				JSON.stringify(action.deliveryRecordList)
			);
			return {
				...state,
				pharmacistDeliveryRecordList: [...action.deliveryRecordList]
			};
		case types.SET_PHARMACIST_PROCESSING_RECORD:
			storage.set(
				"pharmacistProcessingRecord",
				JSON.stringify(action.deliveryRecord)
			);
			return {
				...state,
				pharmacistProcessingRecord: action.deliveryRecord
			};
		default:
			return state;
	}
};

export default reducer;
