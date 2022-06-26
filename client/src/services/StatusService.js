import axios from "axios";

const url = "api/status/";

class StatusService {
  static getStatus() {
    return axios.get(url);
  }
}

export default StatusService;
