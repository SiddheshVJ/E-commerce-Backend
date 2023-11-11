import Product from '../models/productModel'
import asyncHandler from "express-async-handler";
import slugify from 'slugify';

export const createProduct = asyncHandler(async (req, res) => {

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await new Product(req.body).save()
        res.status(200).json({
            newProduct
        })
    } catch (error) {
        throw new Error(error)
    }
})

export const getProduct = asyncHandler(async (req, res) => {
    try {

        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json({
            product
        })
    } catch (error) {
        throw new Error(error)
    }
})

export const getAllProduct = asyncHandler(async (req, res) => {
    try {
        //filtering
        const queryObj = { ...req.query }
        const excludeField = ['page', 'sort', 'limit', 'fields']
        excludeField.forEach((ele) => delete queryObj[ele])
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        let query = Product.find(JSON.parse(queryStr))

        // sorting

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // limit fields

        if (req.query.fields) {
            const field = req.query.fields.split(',').join(' ')
            query = query.select(field)
        } else {
            query = query.select('-__v')
        }

        // pagination

        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)

        if (req.query.page) {
            const productCount = await Product.countDocuments()
            if (skip >= productCount) throw new Error('This page does not exists')
        }

        let product = await query
        res.status(200).json({
            product
        })
    } catch (error) {
        throw new Error(error)
    }
})

export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        let productUpdate = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            productUpdate
        })
    } catch (error) {
        throw new Error(error)
    }
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        let deleteUpdate = await Product.findByIdAndDelete(id)
        res.status(200).json({
            deleteUpdate
        })
    } catch (error) {
        throw new Error(error)
    }
})