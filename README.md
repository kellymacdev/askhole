# Am I the AskHole?



|<img src="https://github.com/user-attachments/assets/c83779bc-5935-4423-a1c0-3afa6d74c386" alt="Me" width="400" style="border-radius:15px;"/> | Am I the AskHole? is a playful, minimalist web and Android app that serves up random conversation-starting questions — some tame, some spicy. Users can toggle whether to include spicy questions, flip through prompts, and even submit their own via an embedded Google Form. |
|----------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

## Features!

- Randomized question generator

- Optional “spicy” mode toggle

- Fully responsive design and Android app (built with Capacitor)

- Embedded Google Form for user-submitted questions

- Dynamic data loaded directly from a published Google Sheet

## Built With

React – for the interactive UI

Vite – for fast development and builds

Capacitor – to wrap the web app as a native Android app

Papaparse – for parsing CSV data from Google Sheets

Google Sheets & Forms – for easy data management

## Setup Instructions

Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/askhole.git
cd askhole
```


Install dependencies
```bash
npm install
```

Run locally
```bash
npm run dev
```

Build for production
```bash
npm run build
```

Sync with Capacitor (for Android builds)
```bash
npx cap sync
npx cap open android
```

## Deployment

The Android version is built and packaged using Codemagic for CI/CD integration.


### Credits

Some of the questions used in this app were adapted from the free question pack provided by [AskHole](https://askhole.io/).  
They offer excellent curated prompts and conversation starters — check them out!

### Author
Kelly MacDevette

## License
This project is licensed under the [MIT License](./LICENSE). 

