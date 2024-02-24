import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';

type AddMilkProps = {
   examData: {
        exam_date: string,
        cow_id: number,
        disease: string
    }
    handleSubmit: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    successMessage: string
    errorMessage: string
} 
const AddNewExam: React.FC<AddMilkProps> = ({
    handleSubmit, 
    examData, 
    handleChange, 
    successMessage, 
    errorMessage
    }) => {

    return (
        <form onSubmit={ ()=>handleSubmit() }>

            

            <FormControl id="cow_id" isRequired>
                <FormLabel>Cow ID</FormLabel>
                <Input type="number" name="cow_id" onChange={handleChange} />
            </FormControl>
            <FormControl id="disease" isRequired>
                <FormLabel>Disease</FormLabel>
                <Input type="text" name="disease" onChange={handleChange} />
            </FormControl>
            <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="exam_date"  onChange={handleChange} />
            </FormControl>

            {successMessage && <Text color="green">{successMessage}</Text>}
            {errorMessage && <Text color="red">{errorMessage}</Text>}

            <Button mt={4} colorScheme="teal" type="submit" onSubmit={()=>handleSubmit()}>
                Add New Exam
            </Button>
        </form>
    );
};

export default AddNewExam;
