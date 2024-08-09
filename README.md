

# Koinx-Assignemnt

## Overview

The CSV Trade Data API allows you to upload a CSV file containing cryptocurrency trade data, parse the data, and store it in a MongoDB database. Additionally, the API provides endpoints to retrieve asset-wise balances of an account at a given timestamp.

## Features

- **Upload CSV Trade Data:** Accepts a CSV file, parses trade data, and stores it in MongoDB.
- **Get Asset-wise Balance:** Retrieves the balance of assets based on a specified timestamp.

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **MongoDB** (local or MongoDB Atlas)
- **npm** (Node Package Manager)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/csv-trade-data-api.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd csv-trade-data-api
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```



### Running the Application

Start the server with:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### 1. Upload CSV Trade Data

- **Endpoint:** `/api/trades`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Description:** Upload a CSV file containing trade data. The API will parse the file and store the data in MongoDB.

- **Request:**
  - **Form-data:** Include a file field named `file` with the CSV file.

- **Example Request using Postman:**

  - **URL:** `http://localhost:3000/api/trades`
  - **Method:** `POST`
  - **Body:** `form-data`
    - **Key:** `file` (Type: `File`)
    - **Value:** Select your CSV file

- **Response:**
  - **Success:** `{"message": "Trades saved successfully"}`
  - **Error:** `{"error": "Error message"}`

### 2. Get Asset-wise Balance

- **Endpoint:** `/api/balance`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Description:** Retrieve the asset-wise balance of the account at a given timestamp.

- **Request:**
  - **Body:** JSON object containing the timestamp.

    ```json
    {
      "timestamp": "2022-09-28 12:00:00"
    }
    ```

- **Example Request using Postman:**

  - **URL:** `http://localhost:3000/api/balance`
  - **Method:** `POST`
  - **Body:** `raw` (Type: `JSON`)
    ```json
    {
      "timestamp": "2022-09-28 12:00:00"
    }
    ```

- **Response:**
  - **Success:** 
    ```json
    {
      "BTC": 15,
      "MATIC": 100
    }
    ```
  - **Error:** 
    ```json
    {
      "error": "Error message"
    }
    ```

## Error Handling

- **400 Bad Request:** If the request is malformed or missing required data.
- **500 Internal Server Error:** For unexpected server errors.

## My Testing Outputs
![WhatsApp Image 2024-08-08 at 20 52 27_7c4fd8e3](https://github.com/user-attachments/assets/91d2ed5e-61a9-4014-bb73-fb2a42194677)
![WhatsApp Image 2024-08-08 at 20 53 17_7fa72766](https://github.com/user-attachments/assets/21e688d2-d37c-40e4-a153-73c1287619c8)
![WhatsApp Image 2024-08-08 at 20 53 38_7a097427](https://github.com/user-attachments/assets/4e4ad7b1-85a7-42cd-a7d7-6f94c1f00c97)






---

Feel free to customize the repository URL, environment variables, and contact information according to your project’s specifics.
