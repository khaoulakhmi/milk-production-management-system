import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';

type AddMilkProps = {
   birthData: {
        birth_date: string,
        mother_cow_id: number
    }
    handleSubmit: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    successMessage: string
    errorMessage: string
} 
const AddNewBirth: React.FC<AddMilkProps> = ({
    handleSubmit, 
    birthData, 
    handleChange, 
    successMessage, 
    errorMessage
    }) => {

    return (
        <form onSubmit={ ()=>handleSubmit() }>

            <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="birth_date"  onChange={handleChange} />
            </FormControl>

            <FormControl id="mother" isRequired>
                <FormLabel>Mother ID</FormLabel>
                <Input type="number" name="mother_cow_id" onChange={handleChange} />
            </FormControl>

            {successMessage && <Text color="green">{successMessage}</Text>}
            {errorMessage && <Text color="red">{errorMessage}</Text>}

            <Button mt={4} colorScheme="teal" type="submit" onSubmit={()=>handleSubmit()}>
                Add New Birth
            </Button>
        </form>
    );
};

export default AddNewBirth;
