import { Router } from "express";
import { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } from "../controller/userController";

const router = Router()


router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/allusers', getAllUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

module.exports = router