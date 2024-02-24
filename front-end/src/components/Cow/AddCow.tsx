import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Text, Select } from '@chakra-ui/react';

type AddCoPropos = {
    cowData: {
        entry_date: string,
        breed: string
    }

    handleSubmit: () => void
    handleChange: (e: React.ChangeEvent<any>) => void
    successMessage: string
    errorMessage: string
} 
const AddCow: React.FC<AddCoPropos> = ({
    handleSubmit, 
    cowData, 
    handleChange, 
    successMessage, 
    errorMessage
    }) => {

    return (
        <form onSubmit={ ()=>handleSubmit() }>

            <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="entry_date"  onChange={handleChange} />
            </FormControl>

            <FormControl id="breed" isRequired>
                <FormLabel>Breed</FormLabel>
                    <Select
                        placeholder="Select Breed"
                        name="breed"
                        value={cowData.breed}
                        onChange={handleChange}
                    >
                        <option value="Montbeliarde">Montbeliarde</option>
                        <option value="Holstein">Holstein</option>
                    </Select>
            </FormControl>

            {successMessage && <Text color="green">{successMessage}</Text>}
            {errorMessage && <Text color="red">{errorMessage}</Text>}

            <Button mt={4} colorScheme="teal" type="submit" onSubmit={()=>handleSubmit()}>
                Add Milk Production
            </Button>
        </form>
    );
};

export default AddCow;
