import { generateToken } from "../config/jwtToken";
import { generateRefreshToken } from "../config/refreshToken";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { validateMongoDbId } from "../utils/validateMongoDbId"
import jwt from "jsonwebtoken";

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
        const refreshToken = await generateRefreshToken(findUser?._id)
        const updateUser = await User.findByIdAndUpdate(findUser?._id, {
            refreshToken: refreshToken
        }, { new: true })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 22 * 60 * 60 * 1000,
        })
        res.status(200).json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
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
    validateMongoDbId(id)
    try {
        const getUser = await User.findById(id)
        res.status(200).json(getUser)
    } catch (error) {
        throw new Error(error)
    }

})

// Delete Single User
export const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.params
    validateMongoDbId(_id)
    try {
        const deleteUser = await User.findByIdAndDelete(_id)
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
    validateMongoDbId(_id)
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

//block user
export const blockUser = asyncHandler(async (req, res) => {
    const { _id } = req.params
    validateMongoDbId(_id)
    try {
        const user = await User.findByIdAndUpdate(_id, {
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
//Un block user
export const unBlockUser = asyncHandler(async (req, res) => {
    const { _id } = req.params
    validateMongoDbId(_id)
    try {
        const user = await User.findByIdAndUpdate(_id, {
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

// handle refreshed token

export const handleRefreshedToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error('No refresh token in cookies')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) throw new Error('No refresh token is in Db or not matched')
    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('There is something wrong with refresh token')
        }
        const accessToken = generateToken(user._id)
        res.json({ accessToken })

    })
})

// logout
export const logOut = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error('No refresh token in cookies')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })
        return res.sendStatus(204) // forbidden
    }
    await User.findOneAndUpdate({refreshToken}, {
        refreshToken: ""
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    })
    return res.sendStatus(204)

})