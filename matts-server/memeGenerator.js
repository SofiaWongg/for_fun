// create memes from canvas
// calls llm to paint canvas of meme
// return pixel grid

const { createCanvas, loadImage } = require('canvas');
const dotenv = require('dotenv');
dotenv.config();

// resolution enum either 1K or 2K
const resolutionEnum = {
    '512': '512',
    '768': '768',
    '1K': '1K',
    '1.5K': '1.5K',
    '2K': '2K',
    '4K': '4K',
}
const aspectRatioEnum = {
    '1:1': '1:1',
    '1:2': '1:2',
    '2:1': '2:1',
    '2:3': '2:3',
    '3:2': '3:2',
    '3:4': '3:4',
    '4:3': '4:3',
    '4:5': '4:5',
    '5:4': '5:4',
    '9:16': '9:16',
    '16:9': '16:9',
    '9:19.5': '9:19.5',
    '19.5:9': '19.5:9',
    '9:20': '9:20',
    '20:9': '20:9',
    '9:21': '9:21',
    '21:9': '21:9',
    'auto': 'auto',
}

const model = 'bytedance-seed/seedream-5-0-flash';
const callLLM = async (prompt, resolution = '1K', aspectRatio = '1:1') => {
    const response = await fetch("https://openrouter.ai/api/v1/images", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          prompt: prompt,
          resolution: resolutionEnum[resolution],
          aspect_ratio: aspectRatioEnum[aspectRatio],
        }),
      });
      
      const result = await response.json();
      return result;
}

// resolution is the number of pixels in the x and y directions
const generateMeme = async (prompt, resolution = '1K', aspectRatio = '1:1') => {
    // call llm to paint canvas of meme
    // return pixel grid
    const result = await callLLM(prompt, resolution, aspectRatio);
    console.log(result);
    const image = result.data[0].b64_json;
    // node-canvas has no browser Image global; decode the jpeg bytes instead
    const img = await loadImage(Buffer.from(image, 'base64'));
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // return the pixel grid
    return canvas.toDataURL();
}

module.exports = { generateMeme };