# E-Commerce Website with AI Chatbot

An e-commerce website with an AI-powered chatbot for handling customer queries about refunds, returns, and exchanges.

## Features

- Product listing and shopping cart
- AI-powered chatbot for customer support
- Handles common queries about refunds, returns, and exchanges
- Stores chat history in Supabase database

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

4. Set up Supabase:
   - Create a new project at https://supabase.com
   - Create two tables:
     - `products` (id, name, price, image)
     - `chat_history` (id, message, response, timestamp)

5. Start the development servers:
   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm start
   ```

6. Visit http://localhost:3000 to see the application

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express
- Database: Supabase (PostgreSQL)
- Styling: CSS

## Chatbot Features

The chatbot can handle the following types of queries:
- Refunds
- Returns
- Exchanges
- Order tracking

## Contributing

Feel free to submit issues and enhancement requests! # AI-Customer-Care-
