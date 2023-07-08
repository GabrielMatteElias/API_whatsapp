const { MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const globais = require("./Globais");

// ================ // Classe para acessar funções do Whatsapp  \\ ================ \\
class WhatsApp {

    constructor(numero) {
        this.clientUsuario = numero;
    }

    async checarClass() {
        console.log(this.clientUsuario)
    }

    async iniciarClient() {

        await globais.client1.initialize()

    }

    async setInfo(telefone, mensagem) {
        this.telefones = telefone
        this.mensagem = mensagem
    }

    // ================ // Cria conexão com whatsapp e gera QRcode caso não haja sessão ainda \\ ================ \\ 
    iniciaWhats() {

        console.log('Acessou iniciaWhats')

        return new Promise((resolve) => {
            console.log(this.clientUsuario)
            globais.client1.on('qr', (qr) => {
                globais.whatsQrcode = qr
                qrcode.generate(qr, { small: true });
                console.log('Client ready')
                resolve(qr)
            });
        })
    }

    // ================ // Realiza o envio do boleto \\ ================ \\ 
    async enviaBoletoConectado() {

        if (globais.client1.info === undefined) {

            return new Promise((resolve) => {
                resolve('O sistema está iniciando. Por favor aguarde!')
            })

        } else {


            this.telefones = this.telefones.split(",")

            for (let telefone of this.telefones) {

                setTimeout(() => {
                    return new Promise(async (resolve) => {

                        await globais.client1.getNumberId(`55${telefone}`).then(async (result) => {
                            console.log(result)

                            if (result === null) {
                                console.log('---')
                                console.log('Whatsapp inválido')
                                resolve('Whatsapp inválido')

                            } else {
                                telefone = result.user

                                try {
                                    console.log('- - - - - - - - - - - - - - - - - - - - - - -')
                                    console.log("Iniciando envio...")
                                    console.log("Telefone: " + telefone)
                                    console.log("Mensagem: " + this.mensagem)
                                    console.log('- - - - - - - - - - - - - - - - - - - - - - -')

                                    const midia = MessageMedia.fromFilePath(`C:/Users/gabri/Desktop/zLugar/Projetos/API_Whats/imagem-whatsapp/1.png`);

                                    try {
                                        await globais.client1.sendMessage(`${telefone}@c.us`, `${this.mensagem}`);
                                        await globais.client1.sendMessage(`${telefone}@c.us`, midia)

                                    } catch (error) {
                                        console.log(error)
                                    }

                                    console.log('---')
                                    console.log('Envio finalizado!')
                                    resolve('Mensagens enviadas com sucesso!')

                                } catch {
                                    console.log('---')
                                    e => (console.log(e))
                                    resolve('false')
                                }
                            }
                        })
                    })
                }, "100");

            }

        }
    }
}

/*
    async verificaCheck(res) {
        if (res === "CONNECTED")
            return 'Conectado'
        else
            return 'Desconectado'
    }

    // ================ // Checa se o client se econtra conectado com algum whatsapp \\ ================ \\ 
    checaState() {

        console.log('Acessou checaState')

        globais.client.getState().then(async (result) => {
            if (!result.match("CONNECTED"))
                globais.conectadoCheck = await this.verificaCheck(result)
            else
                console.log("Whatsapp Client State =", result)

            globais.conectadoCheck = await this.verificaCheck(result)

        });

        return globais.conectadoCheck

    }
*/

module.exports = { WhatsApp };