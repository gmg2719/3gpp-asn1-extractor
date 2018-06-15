# 3GPP ASN.1 Extractor

It extracts ASN.1 from a text

## Usage

Make sure that a text is encoded in UTF-8

### Package

```js
var extract = require('./3gpp-asn1-extractor');
var asn1Text = extract(<string_containing_ASN.1>);
```

### Module

```js
var extract = require('./extractor');
var asn1Text = extract(<string_containing_ASN.1>);
```

### Command Line

```sh
node extractor <file_name>
# ex: node extractor 36331-f10.txt
```
