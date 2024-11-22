const express = require('express');

const router = express.Router();

const posts = require('../data/posts');

const postController = require('../controlles/postController.js')



// gestisco la ricerca con un middleware
router.param('id', (req, res, next, id) => {

    const post = posts.find((post) => post.id === parseInt(req.params.id));
    console.log(post)

    if (post) {
        req.post = post;
        next();
    } else {
        res.status(404)
        res.json({
            from: 'middleware param',
            error: 'Post not found',
            message: 'Il post non è stata trovato.',
        })
    }

});

router.param('slug', (req, res, next, slug) => {

    const post = posts.find((post) => post.slug === slug);

    if (post) {
        req.post = post;
        next();
    } else {
        res.status(404)
        res.json({
            from: 'middleware param',
            error: 'Post not found',
            message: 'Il post non è stata trovato.',
        })
    }

});

// creo le crud su post


//index
router.get('/', postController.index);

//show
router.get('/:id([0-9]+)', postController.showConId);
router.get('/:slug', postController.showConSlug);

//store
router.post('/', postController.store);


//update
router.put('/:id([0-9]+)', postController.update);
router.put('/:slug', postController.updateSlug);

//modify
router.patch('/:id([0-9]+)', postController.modify);
router.patch('/:slug', postController.modifySlug);

//destroy
router.delete('/:id([0-9]+)', postController.destroyConId);
router.delete('/:slug', postController.destroyConSlug);

module.exports = router