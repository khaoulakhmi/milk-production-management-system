import { Router } from "express";
import { addNewExam, deleteExam, getExams, getMedicalExamByID, updateExam } from "../Controllers/medicalExamController";


const MedicalExamRouter = Router();


MedicalExamRouter.get('/getMedicalExamByID/:cow_id', getMedicalExamByID)
MedicalExamRouter.delete('/delete/:id',deleteExam)
MedicalExamRouter.post('/addExam',addNewExam)
MedicalExamRouter.get('/getExams',getExams)
MedicalExamRouter.put('/updateExam/:id',updateExam)

export default MedicalExamRouter