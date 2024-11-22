const express = require('express');

const app = express();

const port = 3000;

const postsRouter = require('./routers/posts.js');

const notFound = require('./middlewares/notFound.js');

const errorsmiddleware = require('./middlewares/errorMiddleware.js')






app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('home del server');
});



//rotte
app.use('/posts', postsRouter);


// middlewares finali

app.use(errorsmiddleware)
app.use(notFound);





app.listen(port, () => {
    console.log('hello nel listen');
})

process.on('SIGINT', () => {
    app.close();
    process.exit(0);
});
