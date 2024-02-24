import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';

type AddMilkProps = {
    milkData: {
        date: string,
        quantity_liters: string
    }
    handleSubmit: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    successMessage: string
    errorMessage: string
} 
const AddMilkForm: React.FC<AddMilkProps> = ({
    handleSubmit, 
    milkData, 
    handleChange, 
    successMessage, 
    errorMessage
    }) => {

    return (
        <form onSubmit={ ()=>handleSubmit() }>

            <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="date"  onChange={handleChange} />
            </FormControl>

            <FormControl id="amount" isRequired>
                <FormLabel>quantity (in liters)</FormLabel>
                <Input type="number" name="quantity_liters" onChange={handleChange} />
            </FormControl>

            {successMessage && <Text color="green">{successMessage}</Text>}
            {errorMessage && <Text color="red">{errorMessage}</Text>}

            <Button mt={4} colorScheme="teal" type="submit" onSubmit={()=>handleSubmit()}>
                Add Milk Production
            </Button>
        </form>
    );
};

export default AddMilkForm;
