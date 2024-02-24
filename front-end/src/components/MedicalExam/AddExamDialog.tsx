import React from 'react';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import AddNewExam from './AddNEwExam';

type DialogProps = {
    examData: {
        exam_date: string,
        cow_id: number,
        disease: string
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


const ExamDialog:React.FC<DialogProps> = ({ 
    isOpen,
    onClose, 
    handleSubmit, 
    examData, 
    handleChange, 
    successMessage, 
    errorMessage,
    cancelRef }) => {

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Add Medical Exam</AlertDialogHeader>
        <AlertDialogBody>
          <AddNewExam
            handleSubmit={handleSubmit} 
            examData={examData} 
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

export default ExamDialog;
