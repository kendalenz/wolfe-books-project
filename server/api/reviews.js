const express = require('express')
const app = express.Router()
const { Review } = require('../db')

module.exports = app

app.get('/:id', async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: { productId: req.params.id },
        })
        res.send(reviews)
    } catch (ex) {
        next(ex)
    }
})

app.post('/:id', async (req, res, next) => {
    try {
        const review = await Review.create(req.body)
        res.send(review)
    } catch (ex) {
        next(ex)
    }
})
