const fs = require('fs');
const os = require('os');

console.log('\nЗадание A.\n\nЧитаем файл...');
let input = fs.readFileSync('./input.txt', 'utf8');
console.log('Инвертируем и записываем в новый файл...');
fs.writeFileSync('./output.txt', input.split('').reverse().join(''));
console.log('Готово!');

console.log('\n\nЗадание B.\n\nДомашняя директория: ', os.homedir());
console.log('Версия операционной платформы: ', os.platform(), os.type(), os.arch(), os.release());
