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

} 
export const MedicalExamForOne: React.FC<props> = ({
    data, 
    currentPage, 
    totalPages, 
    startIndex, 
    endIndex,
    handlePrevious, 
    handleNext,
    onOpenDeleteDialog,
    onOpenUpdateDialog, }) => {
    return (
        <>
         {data.length === 0 ? (
        <p>No medical exam data available.</p>
    ) : (
        <>
            <Heading as='h2' size='md' textAlign='center' marginBottom='20px'>
                Medical Exam Data for cow number {data[0].cow_id}
            </Heading>
            <TableContainer style={{ width: '50%', margin: '0 auto' }}>
            <RBTable variant='striped' size='sm' >
                <TableCaption>Table of Cow {data[0].cow_id}'s Exams </TableCaption>
                <Thead bgColor='teal' >
                    <Tr>
                        <Th textAlign='center' color='white'>Medical Exam Date</Th>
                        <Th textAlign='center' color='white'>disease</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.slice(startIndex, endIndex).map((exam, index) => (
                        <Tr key={startIndex + index}>
                            <Td textAlign='center'>{exam.exam_date}</Td>
                            <Td textAlign='center'>{exam.disease}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </RBTable>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button onClick={handlePrevious} isDisabled={currentPage === 1} colorScheme='teal' variant='ghost' size='sm' >
                    Previous
                </Button>
                <Button onClick={handleNext} isDisabled={currentPage === totalPages} colorScheme='teal' variant='ghost' size='sm'>
                    Next
                </Button>
            </div>
        </TableContainer> 
            
        </>
    )}
        </>
    )
}