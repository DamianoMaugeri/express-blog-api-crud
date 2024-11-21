const posts = require('../data/posts.js')

// controllo l'ultimo id 
let lastid = posts.sort((a, b) => a.id - b.id).at(-1).id



//================================================================= INDEX  ===============================================================

const index = (req, res) => {

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
};


//===============================================================  SHOW  =======================================================

const showConId = (req, res) => {

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
};

//-----------------------------------------------------------------------

const showConSlug = (req, res) => {

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

};
//================================================================  STORE  =============================================================

const store = (req, res) => {
    res.send('creo un nuovo post');

    // controllo i dati in entrata , voglio come dati title,content,image,tags

    // se sono corretti 

    const { title, content, image, tags } = req.body;

    lastid++;
    const slug = title.split(' ').join('-').toLowerCase();

    const post = {
        id: lastid,
        title,
        slug,
        content,
        image,
        tags
    };

    posts.push(post);

    res.status(201).json(pizza)





};




//================================================================  UPDATE  ============================================================

const update = (req, res) => {

    // se nel parametro ci sono solo numeri lo considero come id
    // faccio il parseint per trasfolmarlo in numero

    const id = parseInt(req.params.id);
    // cerco nel mio array l'oggetto che ha una chiave id = a quel numero
    // find mi ritorna il primo elemento che soddisfa la callback o undefined

    const post = posts.find((post) => post.id === id);

    // se post è undefined

    if (!post) {
        res.status(404);
        result = {
            error: 'Post not found',
            message: `Non è presente nessun elemento con id: ${id}`

        }
    }

    // se ho trovato il post 

    const { title, content, image, tags } = req.body;



    //verifico che tutti i parametri siano presenti 



    // aggiorno il post 
    const slug = title.split(' ').join('-').toLowerCase();

    post.title = title;
    post.slug = slug;
    post.content = content;
    post.image = image;
    post.tags = tags;

    res.json(post)







};



//================================================================  MODIFY  ============================================================

const modify = (req, res) => {
    const slug = req.params.slug;
    res.send(`modifico il post ${slug}`);
};




//================================================================  DESTROY ============================================================

const destroyConId = (req, res) => {
    const slug = req.params.slug;

    const postIndex = posts.findIndex((post) => post.slug === slug);

    if (postIndex === -1) {
        res.status(404);
        return res.json(
            {
                error: 'Post not found',
                message: `Non è presente nessun elemento che corrisponde a: ${slug}`
            }
        )
    };

    posts.splice(postIndex, 1);
    res.sendStatus(204);

};

//--------------------------------------------------------------------------------

const destroyConSlug = (req, res) => {
    const slug = req.params.slug;

    const postIndex = posts.findIndex((post) => post.slug === slug);

    if (postIndex === -1) {
        res.status(404);
        return res.json(
            {
                error: 'Post not found',
                message: `Non è presente nessun elemento che corrisponde a: ${slug}`
            }
        )
    };

    posts.splice(postIndex, 1);
    res.sendStatus(204);

};


module.exports = { index, showConId, showConSlug, store, update, modify, destroyConId, destroyConSlug }