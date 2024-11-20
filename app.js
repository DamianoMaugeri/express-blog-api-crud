const express = require('express');

const app = express();

const port = 3000;

const postsRouter = require('./routers/posts.js');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('home del server');
});



//rotte
app.use('/posts', postsRouter);



app.listen(port, () => {
    console.log('hello nel listen');
})

process.on('SIGINT', () => {
    app.close();
    process.exit(0);
});
