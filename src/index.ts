import express from 'express'
import dotenv from 'dotenv';
import { fetchCinemaData, fetchMoviesData, fetchSessionData } from './api';
import { syncCinemaTables, upsertCinemaData } from './contorllers/cinemas';
import { syncMoviesTables, upsertMoviesData } from './contorllers/movies';
import cron from 'node-cron';
import { syncSessionTables, upsertSessionsData } from './contorllers/sessions';

dotenv.config()
const app = express()

app.use(express.json())

const syncCinemaData = async () => {
  console.time("Syncing cinema data Time");
  const cinemaData = await fetchCinemaData();
  console.log("Fetched Data Length: ", cinemaData.value.length);
  const upsertedDataLength = await upsertCinemaData(cinemaData.value);
  console.log("Upserted Data Length: ", upsertedDataLength);
  await syncCinemaTables();
  console.timeEnd("Syncing cinema data Time");
  console.log("--------------------------------------------------")
}

const syncMoviesData = async () => {
  console.time("Syncing movies data Time");
  const moviesData = await fetchMoviesData();
  console.log("Fetched Data Length: ", moviesData.length);
  const upsertedDataLength = await upsertMoviesData(moviesData);
  console.log("Upserted Data Length: ", upsertedDataLength);
  await syncMoviesTables();
  console.timeEnd("Syncing movies data Time");
  console.log("--------------------------------------------------")

}

const syncSessionData = async () => {
  console.time("Syncing sessions data Time");
  const sessionsData = await fetchSessionData();
  console.log("Fetched Data Length: ", sessionsData.length);
  const upsertedDataLength = await upsertSessionsData(sessionsData);
  console.log("Upserted Data Length: ", upsertedDataLength);
  await syncSessionTables();
  console.timeEnd("Syncing sessions data Time");
  console.log("--------------------------------------------------")

}

cron.schedule('*/5 * * * *', async () => {
  await syncCinemaData();
  await syncMoviesData();
  await syncSessionData();
});

app.listen(process.env.PORT, () =>
  console.log("Server ready at: http://localhost:3000"),
)
