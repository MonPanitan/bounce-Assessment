const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/quiz', async (req, res) => {
  try {
    const topic = req.query.topic || 'astronomy';

    const prompt = `
      Generate a multiple-choice quiz question about ${topic} in JSON format with:
      {
        "question": "Your question?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Correct Option"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful quiz generator.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
    });

    const messageContent = completion.choices[0].message.content;
    console.log('Quiz response:', messageContent);

    // Parse response if formatted as JSON
    let quiz;
    try {
      quiz = JSON.parse(messageContent);
    } catch (err) {
      return res.status(500).send('Failed to parse quiz data from ChatGPT.');
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error generating quiz:', error.response?.data || error.message);
    res.status(500).send('Error generating quiz.');
  }
});

module.exports = router;
