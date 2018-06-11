# 3GPP ASN.1 Extractor

It extracts ASN.1 from a text file

## Usage

Make sure that a text file is encoded in UTF-8

### Package

```js
var extract = require('./3gpp-asn1-extractor');
var asn1Text = extract(<file_name>);
// ex: extract('36331-f10.txt');
```

### Module

```js
var extract = require('./extractor');
var asn1Text = extract(<file_name>);
// ex: extract('36331-f10.txt');
```

### Command Line

```sh
node extractor <file_name>
# ex: node extractor 36331-f10.txt
```
