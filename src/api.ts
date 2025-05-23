import axios from "axios";

export const fetchCinemaData = async () => {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/WSVistaWebClient/OData.svc/Cinemas`,
      {
        headers: {
          connectApiToken: process.env.CONNECT_API_TOKEN,
        },
      }
    );

    return res.data;
  } catch (err: any) {
    console.error("Cinema fetching Error", err.message);
  }
};

export const fetchMoviesData = async () => {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/WSVistaWebClient/OData.svc/Films`,
      {
        headers: {
          connectApiToken: process.env.CONNECT_API_TOKEN,
        },
      }
    );
    const allMovies = res.data?.value || [];

    const filterData = allMovies.map((movie: any) => {
      return {
        ...movie,
        OpeningDate: movie.OpeningDate ? `${movie.OpeningDate}.000Z` : null
      };
    });
    return filterData;
  } catch (err: any) {
    console.error("Movies fetching Error", err.message);
  }
};

export const fetchSessionData = async () => {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/WSVistaWebClient/OData.svc/Sessions`,
      {
        headers: {
          connectApiToken: process.env.CONNECT_API_TOKEN,
        },
      }
    );

    const allSessions = res.data?.value || [];

    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    const filteredData = allSessions
      .filter((session: any) => {
        const showtime = session.Showtime ? new Date(session.Showtime) : null;
        return showtime && showtime >= now && showtime <= oneWeekLater;
      })
      .map((session: any) => ({
        ...session,
        Showtime: new Date(session.Showtime),
        SessionBusinessDate: new Date(session.SessionBusinessDate),
      }));

    return filteredData;

  } catch (error: any) {
    console.error("Session fetching Error", error.message);
  }
}
