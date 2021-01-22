# JS-Router

JS-Router ist ein einfacher Router.

## Prolog

Wenn sie VSCode nutzen, empfehle ich die Installation der Extension es6-string-html.
## Erstellen einer Router-Instanz

```javascript
const router = new Router();
```

### Parameter
|Name|Typ|Default|Beschreibung|
|---|---|---|---|
|selector|String|null|Gibt das Root-Element an|
|history|Boolean|false|Nutzer kann mit zurück-Tasten navigieren|
|debug|Boolean|false|debug-Nachrichten werden in der Konsole ausgegeben|



## Hinzufügen von Seiten

```javascript
import home from 'relative/path/to/component.js';
router.get('/home', home);
```

'home' beschreibt hier die Komponente, die angezeigt werden soll, wenn der Link '/home' gedrückt wurde.

## Komponenten

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

Ein Link wird durch ein HTML-Element dargestellt. Dieses Element muss das Attribute data-link haben, der Wert muss der Pfad sein, der aufgerufen werden soll.