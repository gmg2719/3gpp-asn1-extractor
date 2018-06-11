var fs = require('fs');

module.exports = exports = extract;

var token = {
    ran2: {
        start: {
            string: '-- ASN1START',
            re: /^-- ASN1START/gm,
        },
        stop: {
            string: '-- ASN1STOP',
            re: /^-- ASN1STOP/gm,
        },
    },
    ran3: {
        start: {
            string: '-- ***',
            re: /^-- \*\*\*/gm,
        },
        stop: {
            string: 'END',
            re: /^END$/gm,
        },
    },
}

function extract(filename) {
    var raw = fs.readFileSync(filename, 'utf8');
    if (raw.indexOf(token.ran2.start.string) != -1) {
        var tk = token.ran2;
    } else if (raw.indexOf(token.ran3.start.string) != -1) {
        var tk = token.ran3;
    } else {
        throw 'Couldn\'t find known tokens';
    }

    var text = '';
    while (true) {
        let indexStart = raw.search(tk.start.re);
        if (indexStart == -1) {
            break;
        }
        let indexStop = raw.substring(indexStart).search(tk.stop.re);
        text += `${raw.substring(indexStart,
                                 indexStart + indexStop + tk.stop.string.length)
                        .replace(/\uFFFD/g, '')}\n`;
        raw = raw.substring(indexStart + indexStop + tk.stop.string.length);
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
