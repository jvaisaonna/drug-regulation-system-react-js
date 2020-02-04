import axios from "axios";
import * as API from "./Api";
import storage from "../storage";

export const Register = user => {
	return axios.post(API.API_REGISTER, { ...user }).then(res => res.data);
};

export const Login = loginInfo => {
	return axios.post(API.API_LOGIN, { ...loginInfo }).then(res => res.data);
};

export const GetDrugFormulary = () => {
	return axios
		.get(API.API_GET_DRUG_FORMULARY, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const GetAvailableDrugFormulary = () => {
	return axios
		.get(API.API_GET_AVAILABLE_DRUG_FORMULARY, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const AddDrug = drugInfo => {
	return axios
		.post(
			API.API_ADD_DRUG,
			{ ...drugInfo },
			{ headers: { authorization: "Bearer " + storage.get("token") } }
		)
		.then(res => res.data);
};

export const UpdateDrug = drugInfo => {
	return axios
		.patch(
			API.API_UPDATE_DRUG,
			{ ...drugInfo },
			{ headers: { authorization: "Bearer " + storage.get("token") } }
		)
		.then(res => res.data);
};

export const GetHospitalInfo = () => {
	return axios
		.get(API.API_GET_HOSPITAL, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const AddHospitalDoctor = hkid => {
	return axios
		.post(
			API.API_HOSPITAL_ADD_DOCTOR,
			{ hkid },
			{
				headers: { authorization: "Bearer " + storage.get("token") }
			}
		)
		.then(res => res.data);
};

export const AddHospitalPharmacist = hkid => {
	return axios
		.post(
			API.API_HOSPITAL_ADD_PHARMACIST,
			{ hkid },
			{
				headers: { authorization: "Bearer " + storage.get("token") }
			}
		)
		.then(res => res.data);
};

export const RemoveHospitalDoctor = uid => {
	return axios
		.delete(API.API_HOSPITAL_REMOVE_DOCTOR + "/" + uid, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const RemoveHospitalPharmacist = uid => {
	return axios
		.delete(API.API_HOSPITAL_ADD_PHARMACIST + "/" + uid, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const GetPatientList = () => {
	return axios
		.get(API.API_GET_PATIENT_LIST, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const GetDeliveryRecord = () => {
	return axios
		.get(API.API_GET_DELIVERY_RECORD, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const GetPatientDeliveryRecord = uid => {
	return axios
		.get(API.API_GET_USER_DELIVERY_RECORD + "/" + uid, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const GetDoctorDeliveryRecord = () => {
	return axios
		.get(API.API_GET_DOCTOR_DELIVERY_RECORD, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const GetPharmacistDeliveryRecord = () => {
	return axios
		.get(API.API_GET_PHARMACIST_DELIVERY_RECORD, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const GetPharmacistProcessingDeliveryRecord = uid => {
	return axios
		.get(API.API_GET_PHARMACIST_PROCESSING_DELIVERY_RECORD + "/" + uid, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};

export const CreateDeliveryRecord = (patient, drugDetail) => {
	return axios
		.post(
			API.API_CREATE_DELIVERY_RECORD,
			{ patient, drugDetail },
			{
				headers: { authorization: "Bearer " + storage.get("token") }
			}
		)
		.then(res => res.data);
};

export const ProcessDeliveryRecord = rid => {
	return axios
		.post(
			API.API_PROCESS_DELIVERY_RECORD + "/" + rid,
			{},
			{
				headers: { authorization: "Bearer " + storage.get("token") }
			}
		)
		.then(res => res.data);
};

export const CompleteDeliveryRecord = rid => {
	return axios
		.post(
			API.API_COMPLETE_DELIVERY_RECORD + "/" + rid,
			{},
			{
				headers: { authorization: "Bearer " + storage.get("token") }
			}
		)
		.then(res => res.data);
};

export const UpdateDeliveryRecord = (rid, drugDetail) => {
	return axios
		.patch(
			API.API_UPDATE_DELIVERY_RECORD + "/" + rid,
			{ drugDetail },
			{
				headers: { authorization: "Bearer " + storage.get("token") }
			}
		)
		.then(res => res.data);
};

export const RejectDeliveryRecord = rid => {
	return axios
		.delete(API.API_REJECT_DELIVERY_RECORD + "/" + rid, {
			headers: { authorization: "Bearer " + storage.get("token") }
		})
		.then(res => res.data);
};
