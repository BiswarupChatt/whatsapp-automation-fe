import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const sendNow = async (data) => axios.post(`${API_BASE}/send-now`, data);
export const scheduleSend = async (data) => axios.post(`${API_BASE}/schedule`, data);
