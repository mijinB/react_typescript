import { atom } from "recoil";

const savedThemeMode = localStorage.getItem("isdarkmode");

export const isDarkAtom = atom({
    key: "isDark",
    default: savedThemeMode ?? false,
});
