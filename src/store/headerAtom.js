import { atom } from "recoil";

export const isModalState = atom({
    key: "isModalState",
    default: false
})

export const speakerIndexState = atom({
    key: "speakerIndexState",
    default: 0
})