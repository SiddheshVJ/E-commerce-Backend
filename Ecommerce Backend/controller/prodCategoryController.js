import ProductCategory from '../models/prodCategoryModel'
import asyncHandler from 'express-async-handler'
import { validateMongoDbId } from '../utils/validateMongoDbId'


export const createCategory = asyncHandler(async (req, res) => {

    try {
        const newCategory = await ProductCategory.create(req.body)
        res.json(newCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateCategory = await ProductCategory.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.json(updateCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteCategory = await ProductCategory.findByIdAndDelete({ _id: id })
        res.json(deleteCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getCategory = await ProductCategory.findById({ _id: id })
        res.json(getCategory)
    } catch (err) {
        throw new Error(err)
    }
})

export const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getAllCategory = await ProductCategory.find()
        res.json(getAllCategory)
    } catch (err) {
        throw new Error(err)
    }
})



