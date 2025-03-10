import express from "express"
import { UserControllers } from "./user.controller"

const router = express.Router()

router.post("/register-user", UserControllers.registerUser)

export const UserRoutes = router