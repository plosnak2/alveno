import axios from "axios";
import { ICreateEmployee } from "../types/types";

export const config = {
    headers:{
      apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rdGViZGhzcHp2cHdndXFja3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzODM3MzMsImV4cCI6MTk5NTk1OTczM30.t6mer5mCMjchDnd5BOi_pozsve9uSEeE3TtNry2SJ5Y",
    }
};

export const deleteEmployee = (id: string) => {
    return axios.delete(`https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees?id=eq.${id}`, config)
}

export const insertEmpl = (employee: ICreateEmployee) => {
    return axios.post("https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees", employee, config)
}

export const getEmployeess = async () => {
    const response = await axios.get("https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees?select=*", config)
    const data = await response.data;
    return data;
}

export const getTeams = async () => {
  const response = await axios.get("https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*", config)
  const data = await response.data;
  return data;
}