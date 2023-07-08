const formulario = document.getElementById('form-data')

formulario.addEventListener('submit', async e => {
    e.preventDefault();

    const mensagemElement = document.getElementById('mensagem-cliente');
    const campoMensagem = document.getElementById('text-area');

    if (campoMensagem.value.trim() === '') {
        exibirPrencherCampoMensagem('Favor preencher o campo Mensagem!')
    } else {
        mensagemElement.innerText = 'Checando sistema...';

        if (mensagemElement.classList.contains('alert')) {
            removerClassesdeAlerta('Checando sistema...')
        }

        // var nomeArquivo = 'minha-imagem.jpg';


        const formData = new FormData(formulario);
        const data = Object.fromEntries(formData);

        console.log(data);

        setTimeout(() => {


            fetch('http://127.0.0.1:8000/envia-whats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(resposta => resposta.json())
                .then(data => {
                    exibirMensagemCliente(data)
                    console.log('FRONT', data)
                })
        }, "2000");
    }



})

function exibirPrencherCampoMensagem(data) {
    const mensagemElement = document.getElementById('mensagem-cliente');
    mensagemElement.classList.add('alert')
    mensagemElement.classList.add('alert-danger')
    mensagemElement.classList.add('alert-dismissable')
    mensagemElement.innerText = data;
}

function exibirMensagemCliente(data) {
    const mensagemElement = document.getElementById('mensagem-cliente');
    mensagemElement.classList.add('alert')
    mensagemElement.innerText = data;

    if (data === 'Mensagens enviadas com sucesso!'){
        mensagemElement.classList.add('alert-success')

    } else if (data === 'Whatsapp inválido') {
        mensagemElement.classList.add('alert-danger')

    } else{
        mensagemElement.classList.add('alert-warning')
    }
}

function removerClassesdeAlerta(data) {
    const mensagemElement = document.getElementById('mensagem-cliente');
    mensagemElement.classList.remove('alert')
    mensagemElement.classList.remove('alert-warning')
    mensagemElement.classList.remove('alert-danger')
    mensagemElement.classList.remove('alert-dismissable')
    mensagemElement.innerText = data;
}

function conectarWhatsapp() {
    fetch('http://127.0.0.1:8000/conecta-whats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}