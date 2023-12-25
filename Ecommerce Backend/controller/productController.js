import Product from '../models/productModel'
import asyncHandler from "express-async-handler";
import User from '../models/userModel'
import slugify from 'slugify';
import { validateMongoDbId } from '../utils/validateMongoDbId'
import { cloudinaryUploadImg } from '../utils/cloudinary'

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
        validateMongoDbId(id)
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
    validateMongoDbId(id)
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
    validateMongoDbId(id)
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

export const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { prodId } = req.body

    try {
        const user = await User.findById(_id)
        const alreadyAdded = await user.wishList.find((id) => id.toString() === prodId)

        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishList: prodId }
                },
                {
                    new: true
                })
            res.json(user)
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishList: prodId }
                },
                {
                    new: true
                })
            res.json(user)
        }
    } catch (err) {
        throw new Error(err)
    }
})

export const rating = asyncHandler(async (req, res) => {

    const { _id } = req.user
    const { star, prodId, comment } = req.body

    try {
        const product = await Product.findById(prodId)

        let alreadyRated = product.ratings.find((userId) => userId.postedBy.toString() === _id.toString())

        if (alreadyRated) {

            const updateRating = await Product.updateOne(
                {
                    ratings: {
                        $elemMatch: alreadyRated
                    }
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment
                    }
                },
                {
                    new: true
                }
            )
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            postedBy: _id
                        },
                    },
                },
                {
                    new: true
                }
            );
        }
        const getAllRatings = await Product.findById(prodId)
        let totalRating = getAllRatings.ratings.length
        let ratingSum = getAllRatings.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0)
        let actualRating = Math.round(ratingSum / totalRating)

        let finalProduct = await Product.findByIdAndUpdate(
            prodId,
            {
                totalRatings: actualRating
            },
            {
                new: true
            }
        )
        res.json(finalProduct)
    } catch (err) {
        throw new Error(err)
    }


})

export const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images")
        const urls = []
        const files = req.files

        for (const file of files) {
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
        }
        const findProduct = await Product.findByIdAndUpdate(id, { images: urls.map(file => { return file }) }, { new: true })
        res.json(findProduct)
    } catch (err) {
        throw new Error(err)
    }
})