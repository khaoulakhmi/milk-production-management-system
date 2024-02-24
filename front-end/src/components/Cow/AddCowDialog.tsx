import React from 'react';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import AddCow from './AddCow';


type DialogProps = {
   cowData: {
        entry_date: string,
        breed: string
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


const AddCowDialog:React.FC<DialogProps> = ({ 
    isOpen,
    onClose, 
    handleSubmit, 
    cowData, 
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
          <AddCow
            handleSubmit={handleSubmit} 
            cowData={cowData} 
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

export default AddCowDialog;
