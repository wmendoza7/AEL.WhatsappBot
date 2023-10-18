const qrcode = require('qrcode-terminal');
const random_name = require('node-random-name');

const saludos = ['Hola', 'hola', 'Buenos', 'buenos', 'buenas', 'Buenas', '¿Cómo está?', 
'¿cómo está?', '¿Como esta?', '¿como esta?', 'como esta', 'Saludos', 'saludos', 'saluda', 'Saluda',
'¿Cómo estás?', '¿cómo estás?', '¿Como estas?', '¿como estas?', 'como estas'];

const liquidar = ['planilla', 'Planilla', 'Liquidación', 'liquidación', 'liquidar', 'Liquidar'];
const numeros = ['0','1','2','3','4','5','6','7','8','9'];
const noRegistrados = ['10101010','123456789','01020304'];

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
    if (saludos.some(s => message.body.includes(s))) {
        client.sendMessage(message.from, 'Hola, mi nombre es '+random_name({ first: true})+' de Aportes en linea, ¿Como puedo ayudarte?');
    }
});

client.on('message', message => {
    if (liquidar.some(l => message.body.includes(l))) {
        client.sendMessage(message.from, 'Con mucho gusto, ¿Podría regalarme su número de documento para validar?');
    }
});

client.on('message', message => {
    if (message.body.includes(numeros)) {
        if(message.body.includes(noRegistrados)){
            client.sendMessage(message.from, 'Lo siento, no te encuentras registrado en nuestra plataforma.');
            client.sendMessage(message.from, 'Puedes realizar el registro ingresando a este link: https://independientes.aportesenlinea.com/');
        }else{
            client.sendMessage(message.from, 'Listo, ¿Tabajaste el mes completo? ¿El salario sigue siendo de $3.000.000?');
        }
        
    }
});


client.initialize();