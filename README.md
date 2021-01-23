# JS-Router

JS-Router is a very simple routing system.

## Languages
- [German](https://github.com/Palladium02/js-router/blob/main/docs/de-docs.md)

## Prologue

I highly recommend the installation of es6-string-html, when using VSCode.
## Creating a router instance

```javascript
const router = new Router();
```

### Parameter

|name|type|default|description|
|---|---|---|---|
|selector|String|null|selector for root element|
|history|Boolean|false|enables navigation with browser control elements|
|debug|Boolean|false|enables debug messages in the console|

## Adding pages

```javascript
import home from 'relative/path/to/component.js';
router.get('/home', home);
```

'home' represents the components that should be rendered when clicking the corresponding link.

## Components

```javascript
export default () => {
    /*html*/`
        <div>
        
        </div>
    `
}
```

## Links

```html
<div data-link="/home">Home</div>
```

Links can be represented through every HTML-element. The link element has to have the data-link attribute.