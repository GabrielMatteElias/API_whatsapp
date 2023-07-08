// ================ // importando variaveis dos outros arquivos \\=========== 
const whats = require('./whatsClass')
const globais = require('./Globais')

// ================ // importando libs \\=========== 
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express()


// ================ // Configuração do CORS \\=========== 
app.use(cors())
app.use(bodyParser.json())
app.options('*', cors());

// ================ // Configuração do armazenamento dos arquivos \\=========== 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/gabri/Desktop/zLugar/Projetos/API_Whats/imagem-whatsapp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const usuWhatsApp1 = new whats.WhatsApp(1)

globais.client1.on('ready', () => {
    console.log('Client is ready!');
});


usuWhatsApp1.iniciarClient()

app.post('/teste', (req, res) => {
    res.send('deu')

    let telefonesRecebidos = req.body.telefones

    let listaTelefones = []

    listaTelefones = telefonesRecebidos

    let telefonesUnicos = listaTelefones.split(',')

    console.log(telefonesUnicos)


})

// ================ // Endpoint para conectar o whatsapp \\=========== 
app.post("/conecta-whats", cors(), async (req, res) => {

    console.log("===============================")
    console.log("Endpoint conecta whats acessado!!")

    const qrcorde1 = await usuWhatsApp1.iniciaWhats()
    res.send(qrcorde1)

})

// ================ // Endpoint para realizar envio do boleto \\=========== 

app.post("/envia-whats", upload.single('imagem'), async (req, res) => {
    console.log("=============================================")
    console.log("Endpoint envia whats acessado!!")
    let telefonesRecebidos = req.body.telefones
    let mensagemTexto = req.body.mensagem
    console.log('---')
    usuWhatsApp1.setInfo(telefonesRecebidos, mensagemTexto)
    let respostaEnviaBoleto = await usuWhatsApp1.enviaBoletoConectado()
    console.log('aqui', respostaEnviaBoleto)

    res.json(respostaEnviaBoleto)

})


app.listen(8000, function () {
    console.log('Rodando...')
})

// rodar API(estar na pasta "trunk" para rodar o seguinte comando): npm run dev
// CPF teste: 00794978452

