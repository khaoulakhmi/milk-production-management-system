import { Router } from "express";
import { addNewMilkProduction, deleteProduct, getProduction, updateMilkProduction } from "../Controllers/milkProductionController";


const milkProductionRouter = Router();


milkProductionRouter.get('/getMilkProduction', getProduction)
milkProductionRouter.delete('/deleteProduct/:id', deleteProduct)
milkProductionRouter.put('/updateMilkProduction/:id', updateMilkProduction)
milkProductionRouter.post('/addNewMilkData',addNewMilkProduction)

export default milkProductionRouter