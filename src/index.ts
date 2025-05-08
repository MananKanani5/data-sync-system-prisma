import express from 'express'
import dotenv from 'dotenv';
import { fetchCinemaData, fetchMoviesData } from './api';
import { syncCinemaTables, upsertCinemaData } from './contorllers/cinemas';
import { syncMoviesTables, upsertMoviesData } from './contorllers/movies';
import cron from 'node-cron';

dotenv.config()
const app = express()

app.use(express.json())

const syncCinemaData = async () => {
  const cinemaData = await fetchCinemaData();
  console.log("Cinema data fetched successfully.");
  await upsertCinemaData(cinemaData.value);
  await syncCinemaTables();
}

const syncMoviesData = async () => {
  const moviesData = await fetchMoviesData();
  console.log("Movies data fetched successfully.");
  await upsertMoviesData(moviesData.value);
  await syncMoviesTables();
}

cron.schedule('*/5 * * * *', async () => {
  await syncCinemaData();
  await syncMoviesData();
});

app.listen(process.env.PORT, () =>
  console.log("Server ready at: http://localhost:3000"),
)
