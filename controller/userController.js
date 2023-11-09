import { generateToken } from "../config/jwtToken";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";


// Register User
export const createUser = asyncHandler(async (req, res) => {

    const email = req.body.email;
    const findUser = await User.findOne({ email });

    if (!findUser) {
        // create new user
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error('User Already Exists')
    }
})


// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // check user exists or not
    const findUser = await User.findOne({ email })
    const checkPass = await findUser.isPasswordMatched(password)

    if (findUser && checkPass) {
        res.status(200).json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    } else {
        throw new Error('Invalid Credentials')
    }
})


// Get Users
export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find({})
        res.status(200).json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// Get Single User
export const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getUser = await User.findById(id)
        res.status(200).json(getUser)
    } catch (error) {
        throw new Error(error)
    }

})

// Delete Single User
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.status(200).json({
            message: `${deleteUser.firstName} Your Account Deleted`
        })
    } catch (error) {
        throw new Error(error)
    }

})

// Update User
export const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstName: req?.body.firstName,
            lastName: req?.body.lastName,
            mobile: req?.body.mobile,
            email: req?.body.email,
            role: req?.body.role
        }, {
            new: true
        })

        res.status(200).json({
            message: `${updateUser.firstName} Your Account Updated`
        })
    } catch (error) {
        throw new Error(error)
    }

})

export const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: true
        }, {
            new: true
        })
        res.json({
            message: `user is blocked.`
        })
    } catch (error) {
        throw new Error(error)
    }
})

export const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: false
        }, {
            new: true
        })
        res.json({
            message: `user Unblocked.`
        })
    } catch (error) {
        throw new Error(error)
    }
})