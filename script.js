function getPassOptions(passChecks) {
    let passOptions = [];
    let selectedN = 0;
    passChecks.forEach((e) => {
        if (e.checked) {
            passOptions.push(e.id);
            selectedN += 1;
        }
    })
    return { options: passOptions, length: selectedN };
}

const randomNumFrom0To = (number) => Math.floor(Math.random() * number);

const alphabetsL = 'abcdefghijklmnopqrstuvwxyz';
const alphabetsU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialC = "&*}],=-).+;'/{[(\\@#%^";
const numericC = '1234567890';

const passWords = { 'lowercase': alphabetsL, 'uppercase': alphabetsU, 'special': specialC, 'numeric': numericC };

const passwordD = document.getElementById('password');

const passLength = document.getElementById('passLength');

const passChecks = document.getElementsByName('passChecks');

let passOptions = getPassOptions(passChecks);

passChecks.forEach(e => {
    e.onclick = () => {
        passOptions = getPassOptions(passChecks);
    }
})

let generateBtn = document.getElementById('generate');

generateBtn.onclick = () => {
    let password = '';
    const length = Number(passLength.value);
    const options = passOptions.options;
    let optionLength = passOptions.length;

    const passCount = Array.from(Array(passOptions.length), () => 0);

    for (let i = 0; i < length - optionLength; i++) {
        let random = randomNumFrom0To(optionLength);
        passCount[random] += 1;
        let wordFrom = passWords[options[random]];
        random = wordFrom[randomNumFrom0To(wordFrom.length)];
        password += random;
    }
    for (let i = 0; i < optionLength; i++) {
        if (passCount[i] == 0) {
            let wordFrom = passWords[options[i]];
            let random = wordFrom[randomNumFrom0To(wordFrom.length)];
            password += random;
        }
    }
    for (let i = password.length; i < length; i++) {
        let random = randomNumFrom0To(optionLength);
        let wordFrom = passWords[options[random]];
        random = wordFrom[randomNumFrom0To(wordFrom.length)];
        password += random;
    }
    passwordD.innerText = password;
}

let copyBtn = document.getElementById('copy');

let copyIcon = copyBtn.firstElementChild;

copyBtn.onclick = () => {
    navigator.clipboard.writeText(password.innerText);
    copyIcon.src = './icons/ok.svg';
    copyBtn.disabled = true;
    setTimeout(() => {
        copyIcon.src = './icons/copy.svg';
        copyBtn.disabled = false;
    }, 400);
}