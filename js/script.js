$(document).ready(() => {
    $('#cpf').inputmask('999.999.999-99');
});

const validaCPF = () => {
    const cpf = document.getElementById('cpf').value;
    const cpfLimpo = limpaFormatacao(cpf);

    if (cpfLimpo.length != 11) {
        mostraResultado('CPF deve conter 11 dígitos.', 'red');
        return;
    }

    if (verificaDigitosRepetidos(cpfLimpo)) {
        mostraResultado('CPF não pode conter repetição do mesmo dígito.', 'red');
        return;
    }

    const digito1 = calculaDigitoVerificador(cpfLimpo, 1);

    if (!digito1) {
        mostraResultado('CPF inválido.', 'red');
        return;
    }

    const digito2 = calculaDigitoVerificador(cpfLimpo, 2);

    if (!digito2) {
        mostraResultado('CPF inválido.', 'red');
        return;
    }

    mostraResultado(`CPF válido!`, 'green');
}

const calculaDigitoVerificador = (cpf, posicao) => {
    const sequencia = cpf.slice(0, 8 + posicao).split('');
    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia) {
        soma += multiplicador * Number(numero);
        multiplicador--;
    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;
}

const limpaFormatacao = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf;
}

const mostraResultado = (texto, cor) => {
    const span = document.querySelector("#resultado");
    span.innerHTML = texto;
    span.style.color = cor;
}

const verificaDigitosRepetidos = (cpf) => {
    return cpf.split('').every((d) => d === cpf[0]);
}