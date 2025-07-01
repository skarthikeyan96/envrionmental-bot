// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const geminiAPIKey = process.env.GEMINIAPIKEY as string;
const genAI = new GoogleGenerativeAI(geminiAPIKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getAirQuality(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHERMAPAPI;
  const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await axios.get(url);
  const airQualityIndex = response.data.list[0].main.aqi;

  return airQualityIndex;
}

const predictHazard = async (airQualityIndex: number) => {
  const prompt = `The air quality index is ${airQualityIndex}. The AQI scale is from 1 to 5, where 1 is good and 5 is very poor. Predict the potential hazard level and provide safety advice.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
};

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/incoming", async (req, res) => {
  // const { Latitude, Longitude, Body } = req.body;

  // console.log(Latitude, Longitude);
  // const airQuality = await getAirQuality(Latitude, Longitude);

  // console.log("airQuality", airQuality);
  // console.log(`Received message from ${Body}`);

  // const alert = await predictHazard(airQuality);

  // const twiml = new MessagingResponse();
  // twiml.message(alert);
  // res.writeHead(200, { 'Content-Type': 'text/xml' });
  // res.end(twiml.toString());

  const { Body } = req.body;
  console.log(`Received message: ${Body}`);

  const twiml = new MessagingResponse();

  if (Body.trim().toLowerCase() === "hi") {
    twiml.message(
      `🌸 Welcome to Sahaja Yoga! 🌸\n\nWe're happy to have you here.\n\n🧘 Join our daily guided meditation:\n👉 https://zoom.us/j/1234567890?pwd=abcDEF123456\n\n🕖 Every day at [Time]. See you there!`
    );
  } else {
    twiml.message(
      `🙏 Thank you for reaching out.\nType "Hi" to receive today's meditation link and get started.`
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
