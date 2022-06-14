const replaceInvalidChars = (message) => {
    // Replace the invalid characters in the message
    message = message.replace(/ě/g, "ì");
    message = message.replace(/č/g, "è");
    message = message.replace(/ř/g, "ø");
    message = message.replace(/ů/g, "ù");
    message = message.replace(/ň/g, "ò");
    message = message.replace(/ť/g, String.fromCharCode(0x9d));
    message = message.replace(/š/g, String.fromCharCode(0x9a));
    message = message.replace(/ž/g, String.fromCharCode(0x9e));
    message = message.replace(/ď/g, String.fromCharCode(0xef));

    return message;
}

module.exports = { replaceInvalidChars };