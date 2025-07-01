"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const MessagingResponse_1 = __importDefault(require("twilio/lib/twiml/MessagingResponse"));
const axios_1 = __importDefault(require("axios"));
const generative_ai_1 = require("@google/generative-ai");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const geminiAPIKey = process.env.GEMINIAPIKEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(geminiAPIKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function getAirQuality(lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env.OPENWEATHERMAPAPI;
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = yield axios_1.default.get(url);
        const airQualityIndex = response.data.list[0].main.aqi;
        return airQualityIndex;
    });
}
const predictHazard = (airQualityIndex) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = `The air quality index is ${airQualityIndex}. The AQI scale is from 1 to 5, where 1 is good and 5 is very poor. Predict the potential hazard level and provide safety advice.`;
    const result = yield model.generateContent(prompt);
    const response = yield result.response;
    const text = response.text();
    console.log(text);
    return text;
});
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.post("/incoming", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const twiml = new MessagingResponse_1.default();
    if (Body.trim().toLowerCase() === "hi") {
        twiml.message(`🌸 Welcome to Sahaja Yoga! 🌸\n\nWe're happy to have you here.\n\n🧘 Join our daily guided meditation:\n👉 https://zoom.us/j/1234567890?pwd=abcDEF123456\n\n🕖 Every day at [Time]. See you there!`);
    }
    else {
        twiml.message(`🙏 Thank you for reaching out.\nType "Hi" to receive today's meditation link and get started.`);
    }
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
