# svg-quad

> Draw a simple svg shape with a quadratic path

## Install

```bash
npm i svg-quad
```

## API

#### constructor([options])

| Option | Action |
| :------ | :------- |
| **w** | svg width |
| **h** | svg height |
| **d** | direction of the drawing &mdash; top, right, bottom, left |
| **p1** | first point |
| **p2** | anchor |

```js
const Quad = require('svg-quad')

var quad = new Quad({p1:10, p2:50, w:100, h:200})

// also allowed
var quad = Quad({p1:10, p2:50, w:100, h:200})

// all options are also accessible via getter/setter
quad.d = 'top'
quad.p1 = 100
```

#### svg()

Return svg node

```js
var quad = Quad({p1:10, p2:50, w:100, h:200})

/*
<svg viewBox="0 0 100 200" preserveAspectRatio="none">
  <path d="M0 0 V10 Q50 50 100 10 V0 z"></path>
</svg>
*/
var svg = quad.svg()
```

#### path()

Return path value

```js
var quad = Quad({p1:10, p2:50, w:100, h:200})

quad.p1 = 20
// M0 0 V20 Q50 50 100 20 V0 z
var path = quad.path()
```

## Demo

```bash
npm i && npm start
```

## Related

- <a href="https://github.com/jeromedecoster/svg-cubic" target="_blank">svg-cubic</a>
- <a href="https://github.com/jeromedecoster/svg-line" target="_blank">svg-line</a>
- <a href="https://github.com/jeromedecoster/svg-peak" target="_blank">svg-peak</a>

## Thanks

Mainly forked / inspired on <a href="http://tympanus.net/codrops/2014/01/07/shape-hover-effect-with-svg" target="_blank">Codrops</a> and <a href="http://cargocollective.com/isaac317" target="_blank">Isaac Montemayor</a>

## License

MIT
