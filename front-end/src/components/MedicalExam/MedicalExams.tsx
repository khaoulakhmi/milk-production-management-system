

import React from 'react';
import {
    Table as RBTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    IconButton,
    Heading,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { MedicalExamT } from '.';

type props ={
    data: MedicalExamT[];
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    itemsPerPage?: number; // Number of items per page
    handlePrevious: () => void;
    handleNext: () => void;
    onOpenDeleteDialog: (id: number) => void
    onOpenUpdateDialog: (id: number) => void
    onOpenAddDialog: () => void

} 
export const ShowMedicalExams: React.FC<props> = ({
    data, 
    currentPage, 
    totalPages, 
    startIndex, 
    endIndex,
    handlePrevious, 
    handleNext,
    onOpenDeleteDialog,
    onOpenUpdateDialog,
    onOpenAddDialog
    }) => {
    return (
         
        <>
            <TableContainer>
            <RBTable variant='striped' size='sm' >
                <TableCaption>Table of Medical Exams</TableCaption>
                <Thead bgColor='teal' >
                    <Tr>
                        <Th textAlign='center' color='white'>Cow ID</Th>
                        <Th textAlign='center' color='white'>Exam Date</Th>
                        <Th textAlign='center' color='white'>Disease</Th>
                        <Th color='white'>Update</Th>
                        <Th  color='white'>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.slice(startIndex, endIndex).map((exam, index) => (
                        <Tr key={startIndex + index}>
                            <Td textAlign='center'>{exam.cow_id}</Td>
                            <Td textAlign='center'>{exam.exam_date}</Td>
                            <Td textAlign='center'>{exam.disease}</Td>
                            <Td>
                                <IconButton
                                    onClick={() => onOpenUpdateDialog(exam.id)}
                                    variant='solid'
                                    colorScheme='teal'
                                    aria-label='Edit Exam'
                                    fontSize='20px'
                                    icon={<EditIcon />}
                                />
                            </Td>
                            <Td>
                                <IconButton
                                    onClick={() => onOpenDeleteDialog(exam.id)}
                                    variant='outline'
                                    colorScheme='teal'
                                    aria-label='Delete Exam'
                                    fontSize='20px'
                                    icon={<DeleteIcon />}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </RBTable>
            <div style={{paddingBottom: 10, paddingRight: 10}}>
                <Button onClick={handlePrevious} isDisabled={currentPage === 1} colorScheme='teal' variant='ghost' size='sm' >
                    Previous
                </Button>
                <Button onClick={handleNext} isDisabled={currentPage === totalPages} colorScheme='teal' variant='ghost' size='sm'>
                    Next
                </Button>
                <div style={{float:'right',textAlign:'center'}}>
                    <Button size='sm' onClick={onOpenAddDialog}>Add New Exam</Button>
                </div>
            </div>
        </TableContainer> 
            
        </>
    )
}