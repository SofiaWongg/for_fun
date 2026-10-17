const express = require('express');
const cors = require('cors');

const memeGenerator = require('./memeGenerator.js');

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('Hello World'));
app.get('/meme', async (req, res) => {
    defaultPrompt = "Generate a 2-bit pixel art meme of Giannis Antetokounmpo.";
    defaultResolution = '1K';
    defaultAspectRatio = '1:1';
    const prompt = req.query.prompt || defaultPrompt;
    const resolution = req.query.resolution || defaultResolution;
    const aspectRatio = req.query.aspectRatio || defaultAspectRatio;
    const meme = await memeGenerator.generateMeme(prompt, resolution, aspectRatio);
    res.type('image/png');
    res.send(meme);
});

app.listen(3000, () => console.log('Server is running on port 3000'));