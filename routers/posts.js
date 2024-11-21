const express = require('express');

const router = express.Router();

const posts = require('../data/posts');

const postController = require('../controlles/postController.js')

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