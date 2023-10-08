import { Router } from "express";
import { createUser } from "../controller/userController";

const router = Router()


router.post('/register', createUser)

module.exports = router