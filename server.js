const Express = require('express');
const ServeStatic = require("serve-static")
const path = require('path');
const port = process.env.PORT || 5000;

app = Express();
app.use(ServeStatic(path.join(__dirname, 'client/dist')));
console.log(`Listening on port http://localhost:${port}`);
app.listen(port);
