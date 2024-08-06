require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { generateImage } = require('./utils/generateOg');

const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/generate-og-image', upload.single('image'), async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const file=req.file;

  try {
    const imageData = await generateImage(title, content, file);
    res.json({ imageUrl: imageData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image generation failed' });
  }
});
app.get('/',(req,res)=>{
    res.send('hello world');
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});