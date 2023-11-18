import blogCategorySchema from '../models/blogCategoryModel'
import asyncHandler from 'express-async-handler'
import { validateMongoDbId } from '../utils/validateMongoDbId'


export const createBlogCategory = asyncHandler(async (req, res) => {

    try {
        const newBlogCategory = await blogCategorySchema.create(req.body)
        res.json(newBlogCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const updateBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateBlogCategory = await blogCategorySchema.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.json(updateBlogCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteBlogCategory = await blogCategorySchema.findByIdAndDelete({ _id: id })
        res.json(deleteBlogCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const getBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getBlogCategory = await blogCategorySchema.findById({ _id: id })
        res.json(getBlogCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const getAllBlogCategory = asyncHandler(async (req, res) => {
    try {
        const getAllBlogCategory = await blogCategorySchema.find()
        res.json(getAllBlogCategory)
    } catch (err) {
        throw new Error(err)
    }
})

