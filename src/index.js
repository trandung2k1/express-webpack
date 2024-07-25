const express = require('express');
const port = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
}).on('error', (err) => console.error(err));
