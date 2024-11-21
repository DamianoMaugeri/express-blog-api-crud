const express = require('express');

const router = express.Router();

const posts = require('../data/posts');

const postController = require('../controlles/postController.js')

// creo le crud su post

//index
router.get('/', postController.index);

//show
router.get('/:id([0-9]+)', postController.showConId);


// se il parametro non è composto solo da numeri
router.get('/:slug', postController.showConSlug);



//store
router.post('/', postController.store);


//update
router.put('/:id([0-9]+)', postController.update);
router.put('/:slug', postController.update);

//modify
router.patch('/:slug', postController.modify);

//destroy
// se il parametro è composto solo da numeri 
router.delete('/:id([0-9]+)', postController.destroyConId)

// se il parametro non è composto solo da numeri 
router.delete('/:slug', postController.destroyConSlug);

module.exports = router