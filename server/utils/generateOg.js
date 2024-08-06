const canvas = require('canvas');
const fs = require('fs').promises;
const path = require('path');

const loadCanvasImage = async (src) => {
  return new Promise((resolve, reject) => {
    const image = new canvas.Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = src;
  });
};

const generateImage = async (title, content, file) => {
  try {

    const canvasWidth = 1200;
    const canvasHeight = 630;
    const ogCanvas = canvas.createCanvas(canvasWidth, canvasHeight);
    const ctx = ogCanvas.getContext('2d');

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(title, 100, 80);

    ctx.font = '24px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(content.substring(0, 200), 100, 120);

    const avatar = await loadCanvasImage(path.join(__dirname, '../public/profile.jpg'));
    ctx.drawImage(avatar, 100, 20, 50, 50);

    const brandIcon = await loadCanvasImage(path.join(__dirname, '../public/logo.jpeg'));
    ctx.drawImage(brandIcon, 800, 20, 60, 60);

    let ycor = 200;
    if (file) {
      ycor = 600;
    }

    const likeIcon = await loadCanvasImage(path.join(__dirname, '../public/like-icon.svg'));
    ctx.drawImage(likeIcon, 100, ycor, 25, 25);

    const commentIcon = await loadCanvasImage(path.join(__dirname, '../public/comment-icon.svg'));
    ctx.drawImage(commentIcon, 150, ycor, 25, 25);

    const shareIcon = await loadCanvasImage(path.join(__dirname, '../public/share-icon.svg'));
    ctx.drawImage(shareIcon, 200, ycor, 25, 25);

    const bluetick = await loadCanvasImage(path.join(__dirname, '../public/blue-tick.svg'));
    ctx.drawImage(bluetick, 220, 30, 25, 25);

    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Nikhil', 160, 30);

    if (file) {
      const filePath = file.path;
      const buffer = await fs.readFile(filePath);
      const base64Image = buffer.toString('base64');
      const image = await loadCanvasImage(`data:image/png;base64,${base64Image}`);

      const imageAspectRatio = image.width / image.height;
      const maxWidth = 800;
      const maxHeight = 400;
      let imageWidth;
      let imageHeight;

      if (imageAspectRatio > 1) {
        imageWidth = maxWidth;
        imageHeight = imageWidth / imageAspectRatio;
      } else {
        imageHeight = maxHeight;
        imageWidth = imageHeight * imageAspectRatio;
      }

      const imageX = 100;
      const imageY = 180;
      ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

      ctx.strokeStyle = '#000';
      ctx.lineWidth = 10;
      ctx.strokeRect(imageX - 5, imageY - 5, imageWidth + 10, imageHeight + 10);

      const imageBuffer = await ogCanvas.toBuffer('image/png');
      const imageData = `data:image/png;base64,${imageBuffer.toString('base64')}`;
      await fs.unlink(filePath);

      return imageData;
    } else {
      const imageBuffer = await ogCanvas.toBuffer('image/png');
      const imageData = `data:image/png;base64,${imageBuffer.toString('base64')}`;
      return imageData;
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

module.exports = { generateImage };
