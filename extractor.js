var fs = require('fs');

module.exports = exports = extract;

var tokenStart = '-- ASN1START';
var tokenStop = '-- ASN1STOP';

function extract(filename) {
    var raw = fs.readFileSync(filename, 'utf8');
    var text = '';
    while (true) {
        let indexStart = raw.indexOf(tokenStart);
        if (indexStart == -1) {
            break;
        }
        let indexStop = raw.substring(indexStart).indexOf(tokenStop);
        text += `${raw.substring(indexStart,
                                 indexStart + indexStop + tokenStop.length)
                        .replace(/\uFFFD/g, '')}\n`;
        raw = raw.substring(indexStart + indexStop + tokenStop.length);
    }
    return text;
}

if (require.main == module) {
    if (process.argv.length >= 3) {
        console.log(extract(process.argv[2]));
    } else {
        console.log('Usage: node extractor <file_name>');
        console.log('  ex : node extractor 36331-f10.txt');
    }
}
