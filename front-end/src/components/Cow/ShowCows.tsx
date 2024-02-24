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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export type CowT = {
    cow_id: number;
    entry_date: string;
    breed: "Montbeliarde" | "Holstein"
};

type Props = {
    data: CowT[]; // Array of cow objects
    itemsPerPage?: number; // Number of items per page
    handlePrevious: () => void;
    handleNext: () => void;
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    onOpenDeleteDialog: (id: number) => void
    onOpenUpdateDialog: (id: number) => void
    onMedicalExamClick: (id: number) => void
    onOpenAddCow: () => void
};

const ShowCows: React.FC<Props> = ({ 
    data,
    handlePrevious, 
    handleNext, 
    currentPage, 
    totalPages, 
    startIndex, 
    endIndex, 
    onOpenDeleteDialog,
    onOpenUpdateDialog,
    onMedicalExamClick,
    onOpenAddCow
}) => {
    return (
        <TableContainer>
            <RBTable variant='striped' size='sm' >
                <TableCaption>Table of Cows</TableCaption>
                <Thead bgColor='teal' >
                    <Tr>
                        <Th color='white'>ID</Th>
                        <Th color='white'>Entry Date</Th>
                        <Th color='white'>Breed</Th>
                        <Th color='white'>Medical Exam</Th>
                        <Th color='white'>Update</Th>
                        <Th color='white'>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.slice(startIndex, endIndex).map((cow, index) => (
                        <Tr key={startIndex + index}>
                            <Td>{cow.cow_id}</Td>
                            <Td>{cow.entry_date}</Td>
                            <Td>{cow.breed}</Td>
                            <Td>
                                <Button colorScheme='teal' variant='link' size='sm' onClick={() => onMedicalExamClick(cow.cow_id)}>
                                    See the Medical Exam
                                </Button>
                            </Td>
                            <Td>
                                <IconButton
                                    onClick={() => onOpenUpdateDialog(cow.cow_id)}
                                    variant='solid'
                                    colorScheme='teal'
                                    aria-label='Edit Cow'
                                    fontSize='20px'
                                    icon={<EditIcon />}
                                />
                            </Td>
                            <Td>
                                <IconButton
                                    onClick={() => onOpenDeleteDialog(cow.cow_id)}
                                    variant='outline'
                                    colorScheme='teal'
                                    aria-label='Delete Cow'
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
                <div style={{float: 'right' }}>
                <Button size='sm' onClick={onOpenAddCow}>Add New Cow</Button>
                </div>
            </div>
        </TableContainer>
    );
};

export default ShowCows;
