const fs = require('fs');
const os = require('os');


console.log('\n\nЗадание Б.\n\nДомашняя директория: ', os.homedir());
console.log('Версия операционной платформы: ', os.platform(), os.type(), os.arch(), os.release());


console.log('\nЗадание А. Синхронно.\nЧитаем файл...');
let input = fs.readFileSync(__dirname + '/input.txt', 'utf8');
console.log('Инвертируем и записываем в новый файл...');
fs.writeFileSync(__dirname + '/output.txt', input.split('').reverse().join(''));
console.log('Готово!');

console.log('\nЗадание А. Теперь Аинхронно.\nЧитаем файл...');
fs.readFile(__dirname + '/input.txt', 'utf8', (err, res) => {
    console.log('Инвертируем и записываем в новый файл...');
    fs.writeFile(__dirname + '/output.txt', res.split('').reverse().join(''), () => {
        console.log('Запись завершена!');
    });
});
console.log('Готово! Обратите внимание, что это сообщение появилось раньше завершения операций. Асинхронность!');
