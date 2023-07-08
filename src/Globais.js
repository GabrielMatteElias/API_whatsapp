const { Client, LocalAuth } = require('whatsapp-web.js');

var conectadoCheck = false

var whatsQrcode

const client1 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-um" })
});

module.exports = { client1, conectadoCheck, whatsQrcode}