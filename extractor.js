var fs = require('fs');
var JSZip = require('jszip');
var DocxTemplater = require('docxtemplater');

module.exports = exports = extract;

var tokenStart = '-- ASN1START';
var tokenStop = '-- ASN1STOP';

function extract(filename) {
    var content = fs.readFileSync(filename, 'binary');
    var zip = new JSZip(content);
    var doc = new DocxTemplater().loadZip(zip);
    var textPath = doc.fileTypeConfig.textPath(doc.zip);
    var xml = doc.createTemplateClass(textPath).content
                .replace(/<w:tab\/>/g, '<w:t>\t</w:t>')
                .replace(/<w:noBreakHyphen\/>/g, '<w:t>-</w:t>')
                .replace(/<\/w:p>/g, '<w:r><w:t>\n</w:t></w:r></w:p>');
    var raw = doc.createTemplateClassFromContent(xml, textPath).getFullText();
    var text = '';
    while (true) {
        let indexStart = raw.indexOf(tokenStart);
        if (indexStart == -1) {
            break;
        }
        let indexStop = raw.substring(indexStart).indexOf(tokenStop);
        text += `${raw.substring(indexStart,
                                 indexStart + indexStop + tokenStop.length)}\n`;
        raw = raw.substring(indexStart + indexStop + tokenStop.length);
    }
    return text;
}

if (require.main == module) {
    if (process.argv.length >= 3) {
        console.log(extract(process.argv[2]));
    } else {
        console.log('Usage: node extractor <file_name>');
        console.log('  ex : node extractor 36331-f10.docx');
    }
}
