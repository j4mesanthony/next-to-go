import { apiHandler } from "../../../utils/apiHandler";

const apiBase = import.meta.env.VITE_API_BASE;

export const nextToGo = {

    getNextNRaces(count = 10){
        return apiHandler.get(`${apiBase}/?method=nextraces&count=${count}`);
    }

}