// Simple script to generate basic icons from SVG
const fs = require('fs');
const path = require('path');

// Simple ValuerPro icon as SVG
const iconSVG = `
<svg width="144" height="144" viewBox="0 0 144 144" xmlns="http://www.w3.org/2000/svg">
  <rect width="144" height="144" rx="16" fill="#0ea5e9"/>
  <rect x="20" y="30" width="104" height="84" rx="8" fill="white"/>
  <rect x="30" y="45" width="84" height="4" rx="2" fill="#0ea5e9"/>
  <rect x="30" y="55" width="84" height="4" rx="2" fill="#0ea5e9"/>
  <rect x="30" y="65" width="84" height="4" rx="2" fill="#0ea5e9"/>
  <rect x="30" y="75" width="60" height="4" rx="2" fill="#0ea5e9"/>
  <rect x="30" y="85" width="70" height="4" rx="2" fill="#0ea5e9"/>
  <rect x="30" y="95" width="50" height="4" rx="2" fill="#0ea5e9"/>
  <text x="72" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#0ea5e9">VP</text>
</svg>
`;

// Create a simple base64 PNG for the icons
const createIconData = (size) => {
  // This is a simple placeholder - in production you'd use a proper image generation library
  const canvas = `<svg width="${size}" height="${size}" viewBox="0 0 144 144" xmlns="http://www.w3.org/2000/svg">
    <rect width="144" height="144" rx="16" fill="#0ea5e9"/>
    <rect x="20" y="30" width="104" height="84" rx="8" fill="white"/>
    <rect x="30" y="45" width="84" height="4" rx="2" fill="#0ea5e9"/>
    <rect x="30" y="55" width="84" height="4" rx="2" fill="#0ea5e9"/>
    <rect x="30" y="65" width="84" height="4" rx="2" fill="#0ea5e9"/>
    <rect x="30" y="75" width="60" height="4" rx="2" fill="#0ea5e9"/>
    <rect x="30" y="85" width="70" height="4" rx="2" fill="#0ea5e9"/>
    <rect x="30" y="95" width="50" height="4" rx="2" fill="#0ea5e9"/>
    <text x="72" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#0ea5e9">VP</text>
  </svg>`;
  
  return canvas;
};

// Save the SVG version for each size needed
const sizes = [144, 192, 512, 180, 32, 16];
sizes.forEach(size => {
  fs.writeFileSync(`icon-${size}x${size}.svg`, createIconData(size));
  console.log(`Created icon-${size}x${size}.svg`);
});

fs.writeFileSync('apple-touch-icon.svg', createIconData(180));
console.log('Created apple-touch-icon.svg');

console.log('Icon generation complete!');