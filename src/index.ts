
// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import twilio from 'twilio';
import axios from 'axios'

dotenv.config();

const app = express();
const port = process.env.PORT;
const accountSid = process.env.ACCOUNTID;
const authToken = process.env.AUTHTOKEN;
// const client = new twilio(accountSid, authToken);


async function getAirQuality(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHERMAPAPI;
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await axios.get(url);
  const airQualityIndex = response.data.list[0].main.aqi;
  return airQualityIndex;
}

module.exports = { getAirQuality };

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const MessagingResponse = twilio.twiml.MessagingResponse;

app.post('/incoming', async (req, res) => {
  const message = req.body;
  const {Latitude, Longtitude, From, Body} = message;
  const airQualityIndex = await getAirQuality(Latitude, Longtitude);
  console.log(`Air quality index in your places is ${airQualityIndex}`);
  const twiml = new MessagingResponse();
  twiml.message(`You said: ${message.Body}`);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});