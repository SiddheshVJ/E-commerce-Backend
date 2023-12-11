import Coupon from '../models/couponModel'
import asyncHandler from 'express-async-handler'
import { validateMongoDbId } from '../utils/validateMongoDbId'

export const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (err) {
        throw new Error(err)
    }
})

export const getAllCoupon = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find()
        res.json(coupons)
    } catch (err) {
        throw new Error(err)
    }
})

export const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedCoupon)
    } catch (err) {
        throw new Error(err)
    }
})

export const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(id)
        res.status(200).json(deletedCoupon)
    } catch (err) {
        throw new Error(err)
    }
}) 