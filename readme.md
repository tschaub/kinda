# kinda

Determines if one string matches another.  Returns a value that can be used to sort results.

    npm install kinda

Usage:

```js
const kinda = require('kinda');

const haystack = 'A Long String';

kinda('str', haystack);
// 1

kinda('ans', haystack);
// 0.5

kinda('xyz', haystack);
// 0
```
