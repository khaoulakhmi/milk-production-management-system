import { Router } from "express";
import { addNewCow, deleteCow, getCow, updateCow } from "../Controllers/cowController";


const cowRouter = Router();

cowRouter.get("/getCows", getCow);
cowRouter.delete("/deleteCow/:cow_id", deleteCow)
cowRouter.put('/updateCow/:cow_id',updateCow)
cowRouter.post('/addNEwCow',addNewCow)

export default cowRouter;