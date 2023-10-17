const qrcode = require('qrcode-terminal');

//const { Client } = require('whatsapp-web.js');
//const client = new Client();

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    if (message.body.includes('Hola') || message.body.includes('buenas')) {
        client.sendMessage(message.from, 'Hola como estas, estas comunicado con AEL, que deseas?');
    }
});

client.on('message', message => {
    //if (message.body === 'necesito') {
    if (message.body.includes('necesito') || message.body.includes('ayuda')) {
        client.sendMessage(message.from, 'Con mucho gusto, ingrese a este link');
        client.sendMessage(message.from, 'https://www.eltiempo.com');
    }
});


client.initialize();