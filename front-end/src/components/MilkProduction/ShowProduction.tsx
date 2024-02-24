

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
import { MilkProductionT } from '.';

type props ={
    data: MilkProductionT[];
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
export const ShowMilkProduction: React.FC<props> = ({
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
                <TableCaption>Table of milk Production</TableCaption>
                <Thead bgColor='teal' >
                    <Tr>
                        <Th textAlign='center' color='white'>Date</Th>
                        <Th textAlign='center' color='white'>Quantity per liters</Th>
                        <Th color='white'>Update</Th>
                        <Th color='white'>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.slice(startIndex, endIndex).map((milk, index) => (
                        <Tr key={startIndex + index}>
                            <Td textAlign='center'>{milk.date}</Td>
                            <Td textAlign='center'>{milk.quantity_liters}</Td>
                            <Td>
                                <IconButton
                                    onClick={() => onOpenUpdateDialog(milk.id)}
                                    variant='solid'
                                    colorScheme='teal'
                                    aria-label='Edit Cow'
                                    fontSize='20px'
                                    icon={<EditIcon />}
                                />
                            </Td>
                            <Td>
                                <IconButton
                                    onClick={() => onOpenDeleteDialog(milk.id)}
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
                <div style={{float:'right'}}>
                    <Button size='sm' onClick={onOpenAddDialog}>Add New Production</Button>
                </div>
            </div>
        </TableContainer> 
            
        </>
    )
}