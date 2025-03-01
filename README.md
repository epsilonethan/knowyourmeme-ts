# KnowYourMeme-TS
An unofficial typescript library to perform image searches on the KnowYourMeme website

## Get Started
`npm install knowyourmeme-ts`

## How to Use
```javascript
import {KnowYourMemeClient} from `knowyourmeme-ts`;

const client = new KnowYourMemeClient();

const imageLinks = client.search('hotdogs');
```