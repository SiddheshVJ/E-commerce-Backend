import { generateToken } from "../config/jwtToken";
import userModel from "../models/userModel";
import expressAsyncHandler from "express-async-handler";


// Register User
export const createUser = expressAsyncHandler(async (req, res) => {

    const email = req.body.email;
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        // create new user
        const newUser = await userModel.create(req.body)
        res.json(newUser)
    } else {
        throw new Error('User Already Exists')
    }
})


// Login User
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    // check user exists or not
    const findUser = await userModel.findOne({ email })
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

export const getAllUsers = expressAsyncHandler(async (req, res) => {
    try {
        const getUsers = await userModel.find({})
        res.status(200).json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// Get Single User

export const getUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getUser = await userModel.findById(id)
        res.status(200).json(getUser)
    } catch (error) {
        throw new Error(error)
    }

})

// Delete Single User


export const deleteUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await userModel.findByIdAndDelete(id)
        res.status(200).json({
            message: `${deleteUser.firstName} Your Account Deleted`
        })
    } catch (error) {
        throw new Error(error)
    }

})

// Update User
export const updateUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const updateUser = await userModel.findByIdAndUpdate(id, {
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