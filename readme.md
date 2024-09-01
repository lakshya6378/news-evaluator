# AI News Evaluator

AI News Evaluator is a React-based application that leverages the power of ChatGPT to create enhanced text for readers. By allowing users to upload PDFs or images, the application extracts text using OCR (Optical Character Recognition) and enriches it with meanings, pronunciations, phonetics, examples, and synonyms. Additionally, users can generate summaries from the extracted text and retrieve relevant news articles based on the content of images. This project integrates various APIs to provide a comprehensive and user-friendly experience.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Usage](#usage)
- [Applications](#applications)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- **Text Enhancement**: Upload PDFs or images to extract and enrich text with definitions, pronunciations, phonetics, examples, and synonyms.
- **Summarization**: Generate concise summaries from the extracted text.
- **News Retrieval**: Capture images and find relevant news articles based on the words detected in the image.
- **User Authentication**: Login functionality to store history and manage file details.
- **History Management**: (Available upon login) Store and access previously processed files and their details.

## Demo

*(Add a link to a live demo or screenshots of the application if available)*

## Installation

The AI News Evaluator project consists of both backend and frontend components built with Node.js and React.js respectively. Follow the steps below to set up and run the application locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).
- **npm**: Node Package Manager comes bundled with Node.js.
- **Git**: To clone the repository. Download from [Git Official Website](https://git-scm.com/).

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ai-news-evaluator.git
   cd ai-news-evaluator/backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory and add the following variables:

   ```env
   CHATGPT_API_KEY=your_chatgpt_api_key
   NEWSAPI_KEY=your_newsapi_key
   OCR_APPSCRIPT_URL=your_deployed_appscript_url
   DICTIONARY_API_KEY=your_dictionary_api_key
   PORT=5000
   ```

   - **CHATGPT_API_KEY**: Your OpenAI ChatGPT API key.
   - **NEWSAPI_KEY**: Your NewsAPI key for fetching news articles.
   - **OCR_APPSCRIPT_URL**: URL of your deployed AppScript for OCR processing.
   - **DICTIONARY_API_KEY**: API key for the dictionary service to fetch word details.
   - **PORT**: Port number for the backend server (default is 5000).

4. **Start the Backend Server**

   ```bash
   npm start
   ```

   The backend server should now be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `frontend` directory and add the following variable:

   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

   - **REACT_APP_BACKEND_URL**: The URL where the backend server is running.

4. **Start the Frontend Development Server**

   ```bash
   npm start
   ```

   The frontend application should now be accessible at `http://localhost:3000`.

### Running the Application

After completing the backend and frontend setups, ensure both servers are running. Open your browser and navigate to `http://localhost:3000` to access the AI News Evaluator application.

## Configuration

The application requires several API keys and services to function correctly. Ensure you have the following:

- **ChatGPT API Key**: Obtain from [OpenAI](https://openai.com/).
- **NewsAPI Key**: Obtain from [NewsAPI](https://newsapi.org/).
- **OCR AppScript URL**: Deploy a Google Apps Script or another OCR service and obtain its URL.
- **Dictionary API Key**: Obtain from a dictionary service provider (e.g., [DictionaryAPI](https://dictionaryapi.dev/)).

Add these keys to the `.env` files in both the backend and frontend directories as specified in the [Installation](#installation) section.

## Usage

Users can utilize the AI News Evaluator application either directly after deployment or by running it on a local server. The application offers the following functionalities:

### Without Login

- **Upload PDF or Image**: Extract text using OCR.
- **View Enhanced Text**: Access meanings, pronunciations, phonetics, examples, and synonyms for extracted words.
- **Generate Summary**: Create summaries from the extracted text.
- **Find Relevant News**: Upload images to retrieve news articles related to the words detected in the image.

### With Login

To store history and manage file details, users must log in to the application. Upon logging in, users can:

- **Store History**: Keep a record of previously processed files.
- **Manage Files**: Access and manage details of past uploads and their enhancements.

## Applications

AI News Evaluator is versatile and can be applied in various real-world scenarios, including but not limited to:

- **Educational Tools**: Assisting students and educators in understanding and summarizing academic materials.
- **Content Creation**: Helping writers and content creators enhance their work with detailed word information and summaries.
- **News Aggregation**: Providing users with relevant news based on visual inputs or specific topics.
- **Research Assistance**: Enabling researchers to quickly extract and summarize information from documents and images.
- **Accessibility Enhancement**: Aiding visually impaired users by converting text from images or PDFs into enriched, accessible formats.

## Contributing

Contributions are welcome! If you'd like to contribute to the AI News Evaluator project, please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add YourFeatureName"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request**

Please ensure that your contributions adhere to the project's coding standards and include relevant tests where applicable.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as per the terms of the license.

## Acknowledgements

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [OpenAI ChatGPT](https://openai.com/) - For providing the powerful language model.
- [NewsAPI](https://newsapi.org/) - For accessing up-to-date news articles.
- [Google Apps Script](https://developers.google.com/apps-script) - For deploying OCR services.
- [DictionaryAPI](https://dictionaryapi.dev/) - For fetching word definitions and related details.

---
