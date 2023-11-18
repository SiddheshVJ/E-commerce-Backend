import Brand from '../models/brandModel'
import asyncHandler from 'express-async-handler'
import { validateMongoDbId } from '../utils/validateMongoDbId'


export const createBrand = asyncHandler(async (req, res) => {

    try {
        const newBrand = await Brand.create(req.body)
        res.json(newBrand)
    } catch (err) {
        throw new Error(err)
    }
})

export const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateBrand = await Brand.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        res.json(updateBrand)
    } catch (err) {
        throw new Error(err)
    }
})

export const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteBrand = await Brand.findByIdAndDelete({ _id: id })
        res.json(deleteBrand)
    } catch (err) {
        throw new Error(err)
    }
})

export const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getBrand = await Brand.findById({ _id: id })
        res.json(getBrand)
    } catch (err) {
        throw new Error(err)
    }
})

export const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const getAllBrands = await Brand.find()
        res.json(getAllBrands)
    } catch (err) {
        throw new Error(err)
    }
})

