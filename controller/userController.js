import userModel from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
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