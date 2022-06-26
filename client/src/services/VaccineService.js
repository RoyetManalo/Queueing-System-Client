import axios from "axios";

const url = "api/vaccine/";

class VaccineService {
  // Get Latest Posts
  static getAllVaccine(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        resolve(
          data.map((vaccine) => ({
            vaccineBrand: vaccine.vaccineBrand,
            vials: vaccine.vials,
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default VaccineService;
