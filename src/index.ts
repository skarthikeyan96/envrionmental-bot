// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = process.env.PORT;
const accountSid = process.env.ACCOUNTID;
const authToken = process.env.AUTHTOKEN;
// const client = new twilio(accountSid, authToken);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const MessagingResponse = twilio.twiml.MessagingResponse;

app.post('/incoming', (req, res) => {
  const message = req.body;
  console.log(`Received message from ${message.From}: ${message.Body}`);
  const twiml = new MessagingResponse();
  twiml.message(`You said: ${message.Body}`);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});