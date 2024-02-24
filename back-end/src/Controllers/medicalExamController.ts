import { Request, Response } from "express";
import * as fs from 'fs';
import { dataFolderPath } from "./cowController";
import path from "path";

interface MedicalExam {
    id: number;
    exam_date: string;
    disease: string;
    cow_id: number;
} 

export const getMedicalExamByID = ( req: Request, res: Response ) => {
    const { cow_id } = req.params
    fs.readFile(path.join(dataFolderPath, 'medicalExam.json'), (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error'); // Sending an error response
            return;
        }
        const existingData=JSON.parse(data.toString());
        const medicalExams = existingData.filter((exam: MedicalExam) => {
            return exam.cow_id === parseInt(cow_id)
        });

        res.json(medicalExams);
        console.log(existingData)
        console.log(medicalExams)
    })
    
}

export const getExams = (req: Request, res: Response) => {
    fs.readFile(path.join(dataFolderPath, 'medicalExam.json'), (err, data) => {
        if (err) {
            console.error('Error reading medicalExam.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const existingData = JSON.parse(data.toString());
           
            console.log('medicalExam data:', existingData);
            res.send(existingData);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};

export const updateExam = (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id)
    const updatedData = req.body;

    fs.readFile(path.join(dataFolderPath, 'medicalExam.json'), (err, data) => {
        if (err) {
            console.error('Error reading medicalExam.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData = JSON.parse(data.toString());
            const examIndex = existingData.findIndex((exam: MedicalExam) => exam.id === parseInt(id));

            if (examIndex === -1) {
                return res.status(404).send('Birth not found');
            }

            existingData[examIndex].cow_id =  updatedData.cow_id;
            existingData[examIndex].exam_date = updatedData.exam_date
            existingData[examIndex].disease = updatedData.disease

            fs.writeFile(path.join(dataFolderPath, 'medicalExam.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing updated data to medicalExam.json:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log('update successful')
                res.status(200).send(existingData); 
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};

export const deleteExam = ( req: Request, res: Response ) => {
    const id = req.params.id; // Assuming Birth_id is the parameter name
    console.log(id)
    fs.readFile(path.join(dataFolderPath, 'medicalExam.json'), (err, data) => {
        if (err) {
            console.error('Error reading medicalExam.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            let existingData = JSON.parse(data.toString());
            existingData = existingData.filter((exam: MedicalExam) => exam.id !== parseInt(id));

            fs.writeFile(path.join(dataFolderPath, 'medicalExam.json'), JSON.stringify(existingData), err => {
                if (err) {
                    console.error('Error writing updated data to medicalExam.json:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.status(200).send(existingData);
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};

export const addNewExam = (req: Request, res: Response) => {
    const newExamData: MedicalExam  = {
        ...req.body,
    };

    fs.readFile(path.join(dataFolderPath, 'medicalExam.json'), (err, data) => {
        if (err) {
            console.error('Error reading medicalExam.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData: MedicalExam[] = JSON.parse(data.toString());

            const maxId = existingData.reduce((max, entry) => Math.max(max, entry.id), 0);

            newExamData.id = maxId + 1;

            existingData.push(newExamData);

            fs.writeFile(path.join(dataFolderPath, 'medicalExam.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing to medicalExam.json:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log("New Exam added successfully:", newExamData);
                res.status(200).send(existingData);
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};
