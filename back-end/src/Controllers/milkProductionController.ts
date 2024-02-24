import { Request, Response } from "express";
import * as fs from 'fs';
import { dataFolderPath } from "./cowController";
const path = require('path');

type Product = {
    id: number;
    date: string ;
    quantity_liters: number

}
export const getProduction = ( req: Request, res: Response) => {
    fs.readFile(path.join(dataFolderPath, 'milkProduction.json'), (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            const existingData = JSON.parse(data.toString());
           
            res.send(existingData);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
}

type MilkProduction = {
    id: number;
    date: string;
    quantity_liters: number;
}

export const addNewMilkProduction = (req: Request, res: Response) => {
    const newMilkData: MilkProduction = {
        ...req.body,
    };

    fs.readFile(path.join(dataFolderPath, 'milkProduction.json'), (err, data) => {
        if (err) {
            console.error('Error reading milkProduction.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData: MilkProduction[] = JSON.parse(data.toString());

            const maxId = existingData.reduce((max, entry) => Math.max(max, entry.id), 0);

            newMilkData.id = maxId + 1;

            existingData.push(newMilkData);

            fs.writeFile(path.join(dataFolderPath, 'milkProduction.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing to milkProduction.json:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log("New milk production added successfully:", newMilkData);
                res.status(201).send(existingData);
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};


export const updateMilkProduction = (req: Request, res: Response) => {
    const productId = req.params.id;
    const updatedProductData = req.body;
    fs.readFile(path.join(dataFolderPath, 'milkProduction.json'), (err, data) => {
        if (err) {
            console.error('Error reading milkProduction.json:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            let existingData = JSON.parse(data.toString());
            const milkIndex = existingData.findIndex((product: Product) => product.id === parseInt(productId));

            if (milkIndex === -1) {
                return res.status(404).send('Cow not found');
            }

            existingData[milkIndex].quantity_liters =  updatedProductData.quantity;
            existingData[milkIndex].date = updatedProductData.date

            fs.writeFile(path.join(dataFolderPath, 'milkProduction.json'), JSON.stringify(existingData), (err) => {
                if (err) {
                    console.error('Error writing updated data to milkProduction.json:', err);
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

export const deleteProduct = ( req: Request, res: Response ) => {
    const product_id = req.params.id; 
    console.log(product_id)
    fs.readFile(path.join(dataFolderPath, 'milkProduction.json'), (err, data) => {
        if (err) {
            console.error('Error reading vaches.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        try {
            let existingData = JSON.parse(data.toString());
            existingData = existingData.filter((product: Product) => product.id !== parseInt(product_id));

            fs.writeFile(path.join(dataFolderPath, 'milkProduction.json'), JSON.stringify(existingData), err => {
                if (err) {
                    console.error('Error writing updated data to milkProduction.json:', err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                console.log('deleted')
                res.status(200).send(existingData);
            });
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};