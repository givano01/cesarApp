const alphabet = 'abcdefghijklmnopqrstuvwxyzæøå 0123456789.,:;-+?ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ'.split('');

function encrypt(message, offset) {
    const cipher = createCipher(alphabet, offset);
    const cipherText = message.split("").reduce((c, key) => {
        c += cipher[alphabet.indexOf(key)]
        return c;
    })
    return cipherText;
}

function decrypt(cipherText, offset) {
    const cipher = createCipher(alphabet, offset);
    const message = cipherText.split("").reduce((c, key) => {
        c += alphabet[cipher.indexOf(key)]
        return c;
    })
    return message;
}

function createCipher(alphabet, count) {
    let cipher = [...alphabet];
    count -= cipher.length * Math.floor(count / cipher.length);
    cipher.push.apply(cipher, cipher.splice(0, count));
    return cipher;
}

module.exports = {
    encrypt,
    decrypt
}