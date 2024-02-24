import React from 'react';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import AddMilkForm from './AddNewMilkData';

type DialogProps = {
    milkData: {
        date: string,
        quantity_liters: string
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


const MilkProductionDialog:React.FC<DialogProps> = ({ 
    isOpen,
    onClose, 
    handleSubmit, 
    milkData, 
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
          <AddMilkForm 
            handleSubmit={handleSubmit} 
            milkData={milkData} 
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

export default MilkProductionDialog;
