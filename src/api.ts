import axios from "axios";

export const fetchCinemaData = async () => {
  try {
    const res = await axios.get(
      "https://uatvista.novocinemas.com/WSVistaWebClient/OData.svc/Cinemas",
      {
        headers: {
          connectApiToken: process.env.CONNECT_API_TOKEN,
        },
      }
    );
    return res.data;
  } catch (err: any) {
    console.error("Sync failed:", err.message);
  }
};

export const fetchMoviesData = async () => {
  try {
    const res = await axios.get(
      "https://uatvista.novocinemas.com/WSVistaWebClient/OData.svc/Films",
      {
        headers: {
          connectApiToken: process.env.CONNECT_API_TOKEN,
        },
      }
    );

    return res.data;
  } catch (err: any) {
    console.error("Sync failed:", err.message);
  }
};
