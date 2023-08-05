import { useContext } from "react";
import { AppContext } from "./Context";

export default function useGlobalContext() {
    return useContext(AppContext);
}