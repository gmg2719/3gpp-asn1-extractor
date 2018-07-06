# 3GPP ASN.1 Extractor

It extracts ASN.1 from a UTf-8 encoded text

## Dependencies and Build

```sh
npm install typescript @types/node
tsc
```

## Usage

### Command Line

```sh
node extractor FILE_IN > FILE_OUT
# ex: node extractor resources/36331-f10.txt > 36331-f10.asn1
```

### Package

```js
let extract = require('3gpp-asn1-extractor').extract;
let asn1Text = extract(stringContainingAsn1Text);
```
