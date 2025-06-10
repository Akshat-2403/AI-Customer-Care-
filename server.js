const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chatbot endpoint
app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;
  
  // Simple response logic based on keywords
  const response = getChatbotResponse(message);
  
  // Store the conversation in Supabase
  try {
    const { error } = await supabase
      .from('chat_history')
      .insert([
        { 
          message: message,
          response: response,
          timestamp: new Date()
        }
      ]);
    
    if (error) throw error;
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getChatbotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('refund')) {
    return "To process your refund, please provide your order number. Our team will review your request within 24-48 hours.";
  }
  if (lowerMessage.includes('return')) {
    return "For returns, please ensure the item is in original condition with all tags. You can initiate a return from your order history.";
  }
  if (lowerMessage.includes('exchange')) {
    return "We can help you with an exchange. Please provide your order number and the item you'd like to exchange it for.";
  }
  if (lowerMessage.includes('track') || lowerMessage.includes('tracking') || lowerMessage.includes('status')) {
    return `Here's your order status:
    
Order #: ORD-2024-1234
Status: In Transit
Current Location: Distribution Center, New York
Estimated Delivery: March 15, 2024
Tracking Number: TRK-789456123

Your package is on its way! You can track it in real-time using the tracking number above.`;
  }
  
  return "I'm here to help with refunds, returns, exchanges, and order tracking. How can I assist you today?";
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
