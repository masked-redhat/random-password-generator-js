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

class Password {
    constructor(len) {
        this.length = len;
        this.password = '';
    }

    contain(wordFrom, howMany = 1) {
        for (let i = 0; i < howMany; i++) {
            let randomWord = wordFrom[randomNumFrom0To(wordFrom.length)];
            this.password += randomWord;
        }
    }

    setPassword(passwordElement) {
        passwordElement.innerText = this.password;
    }

    get pass() {
        return this.password.slice(0, this.length);
    }
    get leng() {
        return this.pass.length;
    }
}

const alphabetsL = 'abcdefghijklmnopqrstuvwxyz';
const alphabetsU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialC = "&*}],=-).+;'/{[(\\@#%^";
const numericC = '1234567890';

const passWords = { 'lowercase': alphabetsL, 'uppercase': alphabetsU, 'special': specialC, 'numeric': numericC };

const password = document.getElementById('password');

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
    let length = Number(passLength.value);
    let p = new Password(length);
    let options = passOptions.options;
    let optionLength = passOptions.length;

    const passCount = Array.from(Array(passOptions.length), () => 0);

    for (let i = 0; i < length - optionLength; i++) {
        let random = randomNumFrom0To(optionLength);
        passCount[random] += 1;
        p.contain(passWords[options[random]]);
    }
    for (let i = 0; i < optionLength; i++) {
        if (passCount[i] == 0) {
            p.contain(passWords[options[i]]);
        }
    }
    for (let i = (p.pass).length; i < length; i++) {
        let random = randomNumFrom0To(optionLength);
        p.contain(passWords[options[random]]);
    }

    p.setPassword(password)
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

document.body.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateBtn.click();
    }
})