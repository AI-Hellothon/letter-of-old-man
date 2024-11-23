import { ngrokInstance } from "../util/instance"

export const postRecord = async(audio)=>{
    const response = await ngrokInstance.post(``, {audio: audio})
    return response;
}

export const getRecord = async()=>{
    const response = await ngrokInstance.get();
    return response;
}