import axios from "axios";
import { Configuration, ReminderApi } from "./codegen";

const API_BASE_URL = process.env.API_BASE_URL;

const config = new Configuration({
  basePath: API_BASE_URL,
});

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

class ReminderRepository extends ReminderApi {
  constructor() {
    super(config, undefined, axiosInstance);
  }
}
export const reminderRepository = new ReminderRepository();
