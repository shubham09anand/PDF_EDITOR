const { createCanvas } = require('canvas');
const fs = require('fs');

// Set font properties
const fontSize = 12;

const fontFamily = 'Arial';
const text = 'Hello, world!';

// Measure the text size
const textMetrics = measureTextSize(text, fontSize, fontFamily);

// Create SVG markup with exact dimensions of the text
const svgMarkup = `
<svg xmlns="http://www.w3.org/2000/svg" width="${textMetrics.width}" height="${textMetrics.height}">
  <text x="0" y="${fontSize}" font-family="${fontFamily}" font-size="${fontSize}" fill="black">${text}</text>
</svg>
`;

// Write SVG markup to file
fs.writeFileSync('text_image.svg', svgMarkup);

// Function to measure text size
function measureTextSize(text, fontSize, fontFamily) {
    const canvas = createCanvas(200, 200); // Arbitrary initial size
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${fontFamily}`;
    const textMetrics = ctx.measureText(text);
    return {
        width: Math.ceil(textMetrics.width),
        height: fontSize // Assume height is equal to font size
    };
}
