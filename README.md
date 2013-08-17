# Express-ErrorStrap

HTML, JSON & Text Error Response Handling Machine.

```javascript
var es = require('express-errorstrap');

app.configure(function() {
  app.use(app.router);
  app.use(es.notFound);
  app.use(es.error);
});
```

For an example, take a look at `test.js`.

## Licence

MIT