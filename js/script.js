$(document).ready(() => {
    $('#cpf').inputmask('999.999.999-99');
});

const validateCpf = () => {
    const ERROR_CLASS = 'p--error';
    const SUCCESS_CLASS = 'p--success';

    const cpf = document.querySelector('#cpf').value;
    const cleanedCpf = cleanCpf(cpf);

    if (cleanedCpf.length != 11) {
        showResult('CPF deve conter 11 dígitos.', ERROR_CLASS);
        return;
    }

    if (checkRepeatedDigits(cleanedCpf)) {
        showResult('CPF não pode conter repetição do mesmo dígito.', ERROR_CLASS);
        return;
    }

    const firstDigit = calculateVerifierDigit(cleanedCpf, 1);

    if (!firstDigit) {
        showResult('CPF inválido.', ERROR_CLASS);
        return;
    }

    const secondDigit = calculateVerifierDigit(cleanedCpf, 2);

    if (!secondDigit) {
        showResult('CPF inválido.', ERROR_CLASS);
        return;
    }

    showResult(`CPF válido!`, SUCCESS_CLASS);
}

const calculateVerifierDigit = (cpf, position) => {
    const sequence = cpf.slice(0, 8 + position).split('');
    let sum = 0;
    let multiplier = 9 + position;

    for (const number of sequence) {
        sum += multiplier * Number(number);
        multiplier--;
    }

    const remainder = (sum * 10) % 11;
    const digit = cpf.slice(8 + position, 9 + position);

    return remainder == digit;
}

const cleanCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
    return cpf;
}

const showResult = (text, className) => {
    const paragraph = document.querySelector("#result");
    paragraph.innerHTML = text;
    paragraph.classList.remove("p--success", "p--error")
    paragraph.classList.toggle(className);
}

const checkRepeatedDigits = (cpf) => {
    return cpf.split('').every((d) => d === cpf[0]);
}
