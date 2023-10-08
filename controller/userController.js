import userModel from "../models/userModel";

export const createUser = async (req, res) => {

    const email = req.body.email;
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
        // create new user
        const newUser =await userModel.create(req.body)
        res.json(newUser)
    } else {
        // user exist
        res.json({
            msg: "User Already Exists",
            success: false

        })
    }
}