import { handleHttpError, reportSuccess, baseUrl, getToken } from "../utils";

import axios from "axios";
async function fetchAllLines() {
  const accessToken = await getToken();

  try {
    const response = await axios.get(
      `${baseUrl}/maps/all-lines/?page=1&page_size=20`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    const error = `Error fetching All lines: ${err.response.data.error}`;
    return handleHttpError(error);
  }
}

export { fetchAllLines };
