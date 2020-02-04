export const SET_TOKEN = "SET_TOKEN";
export const onSetToken = token => {
	return {
		type: SET_TOKEN,
		token
	};
};

export const SET_USER = "SET_USER";
export const onSetUser = user => {
	return {
		type: SET_USER,
		user
	};
};

export const SET_DRUG_FORMULARY = "SET_DRUG_FORMULARY";
export const onSetDrugFormulary = drugFormulary => {
	return {
		type: SET_DRUG_FORMULARY,
		drugFormulary
	};
};

export const SET_HOSPITAL = "SET_HOSPITAL";
export const onSetHospital = hospital => {
	return {
		type: SET_HOSPITAL,
		hospital
	};
};

export const SET_PATIENT_LIST = "SET_PATIENT_LIST";
export const onSetPatientList = patientList => {
	return {
		type: SET_PATIENT_LIST,
		patientList
	};
};

export const SET_SELF_RECORD = "SET_SELF_RECORD";
export const onSetSelfRecord = deliveryRecord => {
	return {
		type: SET_SELF_RECORD,
		deliveryRecord
	};
};

export const SET_DOCTOR_DELIVERY_RECORD_LIST =
	"SET_DOCTOR_DELIVERY_RECORD_LIST";
export const onSetDoctorDeliveryRecordList = deliveryRecordList => {
	return {
		type: SET_DOCTOR_DELIVERY_RECORD_LIST,
		deliveryRecordList
	};
};

export const SET_PHARMACIST_DELIVERY_RECORD_LIST =
	"SET_PHARMACIST_DELIVERY_RECORD_LIST";
export const onSetPharmacistDeliveryRecordList = deliveryRecordList => {
	return {
		type: SET_PHARMACIST_DELIVERY_RECORD_LIST,
		deliveryRecordList
	};
};

export const SET_PHARMACIST_PROCESSING_RECORD =
	"SET_PHARMACIST_PROCESSING_RECORD";
export const onSetPharmacistProcessingRecord = deliveryRecord => {
	return {
		type: SET_PHARMACIST_PROCESSING_RECORD,
		deliveryRecord
	};
};

export const SET_PAGE_TITLE = "SET_PAGE_TITLE";
export const onSetPageTitle = pageTitle => {
	return {
		type: SET_PAGE_TITLE,
		pageTitle
	};
};

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const onAddNotification = (title, content, isPermanent = false) => {
	console.log("Action isPermanent:", isPermanent);
	return {
		type: ADD_NOTIFICATION,
		title,
		content,
		isPermanent
	};
};

export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export const onRemoveNotification = time => {
	return {
		type: REMOVE_NOTIFICATION,
		time
	};
};
