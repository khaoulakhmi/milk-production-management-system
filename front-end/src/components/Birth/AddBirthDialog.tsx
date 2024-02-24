import React from 'react';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import AddNewBirth from './AddNewBirth';

type DialogProps = {
    birthData: {
        birth_date: string,
        mother_cow_id: number
    }
    handleSubmit: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    successMessage: string
    errorMessage: string
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    cancelRef: any;
} 


const BirthDialog:React.FC<DialogProps> = ({ 
    isOpen,
    onClose, 
    handleSubmit, 
    birthData, 
    handleChange, 
    successMessage, 
    errorMessage,
    cancelRef }) => {

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Add Milk Production</AlertDialogHeader>
        <AlertDialogBody>
          <AddNewBirth
            handleSubmit={handleSubmit} 
            birthData={birthData} 
            handleChange={handleChange} 
            successMessage={successMessage} 
            errorMessage={errorMessage}  />
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onClose}>Cancel</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BirthDialog;
