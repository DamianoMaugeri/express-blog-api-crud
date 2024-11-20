const express = require('express');

const router = express.Router();

const posts = require('../data/posts');

// creo le crud su post

//index
router.get('/', (req, res) => {

    let filteredPosts = posts

    // filtro i miei post con le informzaioni della query string e accetto un filtro sui tag ed un limite di contenuti da mostrare 

    //filter
    if (req.query.tag) {
        filteredPosts = posts.filter((post) => post.tags.map((tag) => tag.toLowerCase()).includes(req.query.tag.toLowerCase()));

    };

    //order   ordino il mio array in ordine alfabetico del titolo
    filteredPosts.sort((a, b) => a.title.localeCompare(b.title));

    //limit
    const limit = parseInt(req.query.limit)
    if (limit && !isNaN(limit) && limit >= 0) {
        filteredPosts = filteredPosts.slice(0, limit)
    }


    res.json(filteredPosts);
})



//show
router.get('/:id([0-9]+)', (req, res) => {

    // se nel parametro ci sono solo numeri lo considero come id
    // faccio il parseint per trasfolmarlo in numero

    const id = parseInt(req.params.id);
    // cerco nel mio array l'oggetto che ha una chiave id = a quel numero
    // find mi ritorna il primo elemento che soddisfa la callback o undefined

    const post = posts.find((post) => post.id === id);

    let result = post;

    // se post è undefined

    if (!post) {
        res.status(404);
        result = {
            error: 'Post not found',
            message: `Non è presente nessun elemento con id: ${id}`

        }
    }

    res.json(result);
});


// se il parametro non è composto solo da numeri
router.get('/:slug', (req, res) => {

    const slug = req.params.slug;

    const post = posts.find((post) => post.slug === slug);

    let result = post;

    // se ho undefined
    if (!post) {
        res.status(404);
        result = {
            error: 'Post not found',
            message: `Non è presente nessun elemento che corrisponde a: ${slug}`

        }
    }
    res.json(result);

});






// http://localhost:3000/posts/pippo

//store
router.post('/', (req, res) => {
    res.send('creo un nuovo post');
});


//update
router.put('/:slug', (req, res) => {
    const slug = req.params.slug;
    res.send(`aggiorno il post ${slug}`);
});

//modify
router.patch('/:slug', (req, res) => {
    const slug = req.params.slug;
    res.send(`modifico il post ${slug}`);
});

//destroy
router.delete('/:slug', (req, res) => {
    const slug = req.params.slug;
    res.send(`elimino il post ${slug}`);
});


module.exports = router