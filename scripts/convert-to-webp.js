import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = '/Users/booker/code/PiPi/ldy/hxldy/src/assets/img/';

async function convertPNGToWebP() {
  const files = fs.readdirSync(imgDir);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

  console.log(`找到 ${pngFiles.length} 个 PNG 文件，正在转换为 WebP...`);

  for (const file of pngFiles) {
    const input = path.join(imgDir, file);
    const output = path.join(imgDir, file.replace(/\.png$/i, '.webp'));
    
    try {
      await sharp(input)
        .webp({ quality: 85 })
        .toFile(output);
      
      const inputSize = fs.statSync(input).size;
      const outputSize = fs.statSync(output).size;
      const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(2);
      
      console.log(`转换: ${file} => .webp (大小: ${(inputSize/1024).toFixed(1)}k -> ${(outputSize/1024).toFixed(1)}k, 减少: ${reduction}%)`);
    } catch (err) {
      console.error(`无法转换 ${file}:`, err);
    }
  }
  console.log('转换完成！');
}

convertPNGToWebP();
