$(document).ready(() => {
    $('#cpf').inputmask('999.999.999-99');
});

const validateCpf = () => {
    const cpf = document.querySelector('#cpf').value;
    const cleanedCpf = cleanCpf(cpf);

    if (cleanedCpf.length != 11) {
        showResult('CPF deve conter 11 dígitos.', 'p--error');
        return;
    }

    if (checkRepeatedDigits(cleanedCpf)) {
        showResult('CPF não pode conter repetição do mesmo dígito.', 'p--error');
        return;
    }

    const firstDigit = calculateVerifierDigit(cleanedCpf, 1);

    if (!firstDigit) {
        showResult('CPF inválido.', 'p--error');
        return;
    }

    const secondDigit = calculateVerifierDigit(cleanedCpf, 2);

    if (!secondDigit) {
        showResult('CPF inválido.', 'p--error');
        return;
    }

    showResult(`CPF válido!`, 'p--success');
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