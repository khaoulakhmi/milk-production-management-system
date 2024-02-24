import { Request, Response } from "express";
import * as fs from 'fs';
const path = require('path');

export const dataFolderPath = path.join(__dirname, '../data');

interface Birth {
    id: number
    mother_cow_id: number;
    birth_date : string;
}

export const getBirth = (req: Request, res: Response) => {
    fs.readFile(path.join(dataFolderPath, 'birth.json'), (err, data) => {
        if (err) {
            console.error('Error reading birth.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const existingData = JSON.parse(data.toString());
           
            console.log('birth data:', existingData);
            res.send(existingData);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};

export const updateBirth = (req: Request, res: Response) => {
    const BirthId = req.params.birth_id;
    console.log(BirthId)
    const updatedBirthData = req.body;

    fs.readFile(path.join(dataFolderPath, 'birth.json'), (err, data) => {
        if (err) {
            console.error('Error reading birth.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData = JSON.parse(data.toString());
            const BirthIndex = existingData.findIndex((Birth: Birth) => Birth.id === parseInt(BirthId));

            if (BirthIndex === -1) {
                return res.status(404).send('Birth not found');
            }

            existingData[BirthIndex].mother_cow_id =  updatedBirthData.mother_cow_id;
            existingData[BirthIndex].birth_date = updatedBirthData.birth_date

            fs.writeFile(path.join(dataFolderPath, 'birth.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing updated data to birth.json:', err);
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

export const deleteBirth = ( req: Request, res: Response ) => {
    const Birth_id = req.params.birth_id; // Assuming Birth_id is the parameter name
    console.log(Birth_id)
    fs.readFile(path.join(dataFolderPath, 'birth.json'), (err, data) => {
        if (err) {
            console.error('Error reading birth.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            let existingData = JSON.parse(data.toString());
            // Filter out the Birth with the specified ID
            existingData = existingData.filter((Birth: Birth) => Birth.id !== parseInt(Birth_id));

            // Write the updated data back to the file
            fs.writeFile(path.join(dataFolderPath, 'birth.json'), JSON.stringify(existingData), err => {
                if (err) {
                    console.error('Error writing updated data to birth.json:', err);
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

export const addNewBirth = (req: Request, res: Response) => {
    const newBirthData: Birth  = {
        ...req.body,
    };

    fs.readFile(path.join(dataFolderPath, 'birth.json'), (err, data) => {
        if (err) {
            console.error('Error reading Birth.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData: Birth[] = JSON.parse(data.toString());
            const maxId = existingData.reduce((max, entry) => Math.max(max, entry.id), 0);
            newBirthData.id = maxId + 1;
            existingData.push(newBirthData);

            fs.writeFile(path.join(dataFolderPath, 'birth.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing to birth.json:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log("New milk production added successfully:", newBirthData);
                res.status(200).send(existingData);
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};
