import { Request, Response } from "express";
import * as fs from 'fs';
const path = require('path');

export const dataFolderPath = path.join(__dirname, '../data');

interface Cow {
    cow_id: number;
    date : string;
    breed: "Montbeliarde" | "Holstein"
}

export const getCow = (req: Request, res: Response) => {
    // Read existing data asynchronously
    fs.readFile(path.join(dataFolderPath, 'cow.json'), (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const existingData = JSON.parse(data.toString());
           
            console.log('Cow data:', existingData);
            res.send(existingData);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};

export const updateCow = (req: Request, res: Response) => {
    const cowId = req.params.cow_id;
    const updatedCowData = req.body;

    fs.readFile(path.join(dataFolderPath, 'cow.json'), (err, data) => {
        if (err) {
            console.error('Error reading cow.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData = JSON.parse(data.toString());
            const cowIndex = existingData.findIndex((cow: Cow) => cow.cow_id === parseInt(cowId));

            if (cowIndex === -1) {
                return res.status(404).send('Cow not found');
            }
            existingData[cowIndex].breed =  updatedCowData.breed;
            existingData[cowIndex].entry_date = updatedCowData.date
            fs.writeFile(path.join(dataFolderPath, 'cow.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing updated data to cow.json:', err);
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

export const deleteCow = ( req: Request, res: Response ) => {
    const cow_id = req.params.cow_id; 

    fs.readFile(path.join(dataFolderPath, 'cow.json'), (err, data) => {
        if (err) {
            console.error('Error reading vaches.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            let existingData = JSON.parse(data.toString());
            existingData = existingData.filter((cow: Cow) => cow.cow_id !== parseInt(cow_id));

            fs.writeFile(path.join(dataFolderPath, 'cow.json'), JSON.stringify(existingData), err => {
                if (err) {
                    console.error('Error writing updated data to vaches.json:', err);
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

export const addNewCow = (req: Request, res: Response) => {
    const newCowData: Cow  = {
        ...req.body,
    };

    fs.readFile(path.join(dataFolderPath, 'cow.json'), (err, data) => {
        if (err) {
            console.error('Error reading cow.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData: Cow[] = JSON.parse(data.toString());

            const maxId = existingData.reduce((max, entry) => Math.max(max, entry.cow_id), 0);

            newCowData.cow_id = maxId + 1;

            existingData.push(newCowData);

            fs.writeFile(path.join(dataFolderPath, 'cow.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing to cow.json:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log("New milk production added successfully:", newCowData);
                res.status(200).send(existingData);
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};
