import { Router } from "express";
import { addNewBirth, deleteBirth, getBirth, updateBirth } from "../Controllers/BirthController";


const birthRouter = Router();

birthRouter.get("/getBirths", getBirth);
birthRouter.delete("/deleteBirth/:birth_id", deleteBirth)
birthRouter.put('/updateBirth/:birth_id',updateBirth)
birthRouter.post('/addNEwBirth',addNewBirth)

export default birthRouter;