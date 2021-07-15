import { config } from "../../../../config";
const fetchData = async (endPoint = null) => {
  const response = await fetch(config.api.baseUrl + endPoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + config.api.accessToken,
    },
  });
  const data = await response.json();
  return data;
};
export default fetchData;
