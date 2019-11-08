# Install

```sh
npm install @gfxpulse/timeout-set
```


# Example

```js
const TimeoutSet = require('@gfxpulse/timeout-set');

let set = new TimeoutSet(['value1'], {
    autodelete: true,
    timeout: 5000,
    margin: 100,
    additional_arguments: ['some argument'],
    handler: function (value, set, additional_argument1) {
        console.log(`${value} - ${additional_argument1}`);
        console.log(`${value} in set - ${set.has(value)}`);
    }
});

set.add('value2', {
    autodelete: false,
});
```
Output:
```
value1 - some argument
value1 in set - false
value2 - some argument
value2 in set - true
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autodelete` | `bool` | `true` | Value automatically deleted from set before handler is called |
| `timeout` | `int` | `null` | How long until handler is called (null = never) |
| `margin` | `int` | `0` | Minimum time interval between set of handler calls |
| `additional_arguments` | `array` | `[]` | Additional arguments passed to handler |
| `handler` | `Function` | `(value, set) => {}` | Function called after timeout. Value, set and additional arguments are passed as parameters |
