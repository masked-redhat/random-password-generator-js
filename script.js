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

const randomNumFrom0To = (number, from = 0) => from + Math.floor(Math.random() * (number - from));

class Password {
    constructor(len) {
        this.length = len;
        this.password = '';
    }

    contain(wordFrom, howMany = 1) {
        for (let i = 0; i < howMany; i++) {
            let l = wordFrom.length == 1 ? 0 : randomNumFrom0To(wordFrom.length);
            console.log(wordFrom[l]);
            let randomNum = randomNumFrom0To(wordFrom[l][1], wordFrom[l][0]);
            this.password += String.fromCharCode(randomNum);
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

const passWords = { 'lowercase': [[97, 122]], 'uppercase': [[65, 90]], 'special': [[32, 47], [58, 64], [91, 96], [123, 126]], 'numeric': [[48, 57]] };

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