const domain = "localhost";
// const domain = "192.168.1.95";
const hostUrl = "http://" + domain + ":3001";

export const API_REGISTER = hostUrl + "/user/register";
export const API_LOGIN = hostUrl + "/user/login";
export const API_GET_PATIENT_LIST = hostUrl + "/user/patient";

export const API_GET_DRUG_FORMULARY = hostUrl + "/drug";
export const API_GET_AVAILABLE_DRUG_FORMULARY = hostUrl + "/drug/available";
export const API_ADD_DRUG = hostUrl + "/drug";
export const API_UPDATE_DRUG = hostUrl + "/drug";

export const API_GET_HOSPITAL = hostUrl + "/hospital";
export const API_HOSPITAL_ADD_DOCTOR = hostUrl + "/hospital/doctor";
export const API_HOSPITAL_REMOVE_DOCTOR = hostUrl + "/hospital/doctor";
export const API_HOSPITAL_ADD_PHARMACIST = hostUrl + "/hospital/pharmacist";
export const API_HOSPITAL_REMOVE_PHARMACIST = hostUrl + "/hospital/pharmacist";

export const API_GET_DELIVERY_RECORD = hostUrl + "/deliveryRecord";
export const API_GET_USER_DELIVERY_RECORD = hostUrl + "/deliveryRecord";
export const API_GET_DOCTOR_DELIVERY_RECORD =
	hostUrl + "/deliveryRecord/doctor";
export const API_GET_PHARMACIST_DELIVERY_RECORD =
	hostUrl + "/deliveryRecord/pharmacist";
export const API_GET_PHARMACIST_PROCESSING_DELIVERY_RECORD =
	hostUrl + "/deliveryRecord/pharmacist";

export const API_CREATE_DELIVERY_RECORD = hostUrl + "/deliveryRecord";
export const API_UPDATE_DELIVERY_RECORD = hostUrl + "/deliveryRecord";
export const API_PROCESS_DELIVERY_RECORD = hostUrl + "/deliveryRecord/process";
export const API_REJECT_DELIVERY_RECORD = hostUrl + "/deliveryRecord";
export const API_COMPLETE_DELIVERY_RECORD =
	hostUrl + "/deliveryRecord/complete";
