import { ngrokInstance } from "../util/instance"

export const postRecord = async(audio, fileName)=>{
    const response = await ngrokInstance.post(`/audio`, {audioData: audio, filename: fileName})
    return response;
}

export const getRecord = async()=>{
    const response = await ngrokInstance.get(`/audio/도연`);
    return response;
}