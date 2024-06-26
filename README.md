# Environmental Bot

## Overview

This project provides an AI-driven air quality alert system leveraging Twilio and OpenAI technologies. By offering real-time air quality data and AI-based safety advice via WhatsApp, it addresses significant environmental and health concerns. This tool empowers individuals and communities to stay informed about air quality, promoting healthier and safer living conditions.

## Features

* Receive real-time air quality index (AQI) data based on location.
    
* Get AI-generated safety advice based on AQI levels.
    
* Interact with the bot via WhatsApp using Twilio.
    

## Technologies Used

* Node.js
    
* Express.js
    
* Twilio API
    
* OpenWeatherMap API
    
* Google Generative AI (Gemini)
    

## Prerequisites

* Node.js installed
    
* Twilio account and API key
    
* OpenWeatherMap API key
    
* Google Generative AI API key
    

## Installation

1. Clone the repository:
    

```javascript
git clone https://github.com/skarthikeyan96/envrionmental-bot.git
cd environmental-bot
```

2. Install dependencies:
    

```javascript
npm install
```

3. Create a `.env` file and add your API keys:
    

```javascript
PORT=3000
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
OPENWEATHERMAPAPI=your_openweathermap_api_key
GEMINIAPIKEY=your_google_generative_ai_api_key
```

## Usage

1. Start the server:
    

```javascript
 npm start
```

2. Join the Twilio sandbox for WhatsApp using the provided QR code or link.
    
3. Send your location to the bot via WhatsApp.
    
4. Receive real-time AQI data and AI-generated safety advice.
