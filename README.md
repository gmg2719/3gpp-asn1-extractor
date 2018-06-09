# 3GPP ASN.1 Extractor

It extracts ASN.1 from a DOCX file

## Dependencies

```sh
npm install docxtemplater jszip@"<3.0.0"
```

## Usage

### Package

```js
var extract = require('./3gpp-asn1-extractor');
var asn1Text = extract(<file_name>);
// ex: extract('36331-f10.docx');
```

### Module

```js
var extract = require('./extractor');
var asn1Text = extract(<file_name>);
// ex: extract('36331-f10.docx');
```

### Command Line

```sh
node extractor <file_name>
# ex: node extractor 36331-f10.docx
```
