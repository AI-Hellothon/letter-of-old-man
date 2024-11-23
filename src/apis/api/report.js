import { ngrokInstance } from "../util/instance"

export const getReport = async(date)=>{
    // const response = ngrokInstance.get(`/report/2024-11-23`);
    const response = ngrokInstance.get(`/report/${date}`);
    return response;
}