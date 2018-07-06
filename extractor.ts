import { readFileSync } from 'fs';

class Token {
    strLiteral: string;
    regExp: RegExp;

    constructor(string: string, regExp: RegExp) {
        this.strLiteral = string;
        this.regExp = regExp;
    }
}

class SpecTokens {
    start: Token;
    stop: Token;

    constructor(start: Token, stop: Token) {
        this.start = start;
        this.stop = stop;
    }
}

let tokens = {
    ran2: new SpecTokens(new Token('-- ASN1START', /^-- ASN1START/gm),
                        new Token('-- ASN1STOP',  /^-- ASN1STOP/gm)),
    ran3: new SpecTokens(new Token('-- ***',       /^-- \*\*\*/gm),
                        new Token('END',          /^END$/gm)),
}

export function extract(fullText: string): string {
    if (!fullText) {
        throw 'Spec text seems empty';
    }
    let token: SpecTokens = determineSpecTokens(fullText);
    let asn1Text: string = '';
    while (true) {
        let indexStart: number = fullText.search(token.start.regExp);
        if (indexStart == -1) {
            break;
        }
        let indexStop: number = fullText.substring(indexStart)
                                           .search(token.stop.regExp);
        asn1Text += `${fullText.substring(indexStart,
                                            indexStart
                                            + indexStop
                                            + token.stop.strLiteral.length)
                                .replace(/\uFFFD/g, '')}\n`;
        fullText = fullText.substring(indexStart
                                        + indexStop
                                        + token.stop.strLiteral.length);
    }
    return asn1Text;
}

function determineSpecTokens(asn1Text): SpecTokens {
    if (asn1Text.indexOf(tokens.ran2.start.strLiteral) != -1) {
        return tokens.ran2;
    } else if (asn1Text.indexOf(tokens.ran3.start.strLiteral) != -1) {
        return tokens.ran3;
    } else {
        throw 'Couldn\'t find known tokens';
    }
}

if (require.main == module) {
    if (process.argv.length >= 3) {
        let fullText: string = readFileSync(process.argv[2], 'utf8');
        console.log(extract(fullText));
    } else {
        console.log('Usage: node extractor FILE');
        console.log('  ex : node extractor 36331-f10.txt');
    }
}
