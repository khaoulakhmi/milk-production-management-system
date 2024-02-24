import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Delete } from "../common/Delete";
import { Update } from "./Update";
import { Heading } from "@chakra-ui/react";
import BirthDialog from "./AddBirthDialog";
import { ShowBirth } from "./ShowBirth";

export type BirthT = {
    id: number,
    birth_date: string,
    mother_cow_id: number
}

export const Birth = ({ itemsPerPage = 5 }) => {

    const [births, setBirths] = useState([])
    const cancelRef = useRef()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(births.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, births.length);
    const [deleteProductId,setdeleteProductId] = useState(0)
    const [successMessage, setSuccessMessage] = useState('');
    const [updateId,setUpdateId] =useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [birthData, setBirthData] = useState({
        birth_date: '',
        mother_cow_id: 0
    });
    const [updatedData, setUpdatedData] = useState({
        birth_date: '',
        mother_cow_id: 0
    });

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value
        });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getBirths'); // Assuming getProductions is your backend endpoint
            setBirths(response.data);
            console.log('this is data MILK ', response.data); // Log the data here
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleOpenUpdateDialog = (id: number) => {
        setShowUpdateDialog(true);
        setUpdateId(id)
    };

    const handleCloseUpdateDialog = () => {
        setShowUpdateDialog(false);
        
    };
    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleOpenDeleteDialog = (id: number) => {
        setShowDeleteDialog(true);
        setdeleteProductId(id)
    };

    const handleOpenAddDialog =() => {
        setShowAddDialog(true)
        console.log("showAddDialog",showAddDialog)
    }


    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
        
    };
    const handleCloseAddDialog = () => {
        setShowAddDialog(false)
    }

    const handleUpdatedData = async (id: number, updatedData: any) => {
        try {
            const response = await axios.put(`http://localhost:5000/updateBirth/${id}`, updatedData);
            setBirths(response.data);
            setShowUpdateDialog(false);
            } catch (error) {
            console.error('Error updating :', error);
        }
    };
    
    const handleDeleteProduct = async (birthId: number) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deleteBirth/${birthId}`);
            setBirths(response.data)
            setShowDeleteDialog(false)
            console.log(response.data); 
        } catch (error) {
            console.error('Error deleting Production:', error);
           
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBirthData({ ...birthData, [name]: value });
    };

    const handleSubmit = async (milkData:any) => {
        try {
            const response = await axios.post('http://localhost:5000/addNEwBirth', milkData);
    
            if (response.status === 201) {
                setSuccessMessage('Milk production added successfully.');
                setErrorMessage('');
                setBirths(response.data)
                return response.data; 
            } else {
                throw new Error('Failed to add milk production. Server returned status: ' + response.status);
            }
        } catch (error) {
            setErrorMessage('Failed to add milk production. Please try again.');
            setSuccessMessage('');
            throw new Error('Failed to add milk production. Please try again. Error: ' + error);
        }
    };
    
    return(
        <div className="cowPage">
                  <Heading as='h2' size='xl'>
                Medical Exam Data for cow number
            </Heading>
        <div style={{margin:10, justifyContent:"space-between"}} className="showCow">
            <ShowBirth 
            data={births} 
            currentPage={currentPage} 
            totalPages={totalPages} 
            startIndex={startIndex} 
            endIndex={endIndex} 
            handlePrevious={handlePrevious} 
            handleNext={handleNext} 
            onOpenDeleteDialog={(id: number) => handleOpenDeleteDialog(id)} 
            onOpenUpdateDialog={(id:number)=>handleOpenUpdateDialog(id)}
            onOpenAddDialog={handleOpenAddDialog}
        />
        {showDeleteDialog && (
                <Delete
                    isOpen={showDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onCancel={handleCloseDeleteDialog}
                    onDelete={() => handleDeleteProduct(deleteProductId)}
                    cancelRef={cancelRef}
                    className="product"
                />
            )}
        {showUpdateDialog && (
                <Update
                    isOpen={showUpdateDialog}
                    onClose={handleCloseUpdateDialog}
                    onCancel={handleCloseUpdateDialog}
                    onUpdate={() => handleUpdatedData(updateId, updatedData)}
                    cancelRef={cancelRef}
                    handleInputChange={handleInputChange}
                />
        )}
        {showAddDialog && (
            <BirthDialog handleSubmit={()=>handleSubmit(birthData)} 
            birthData={birthData} 
            handleChange={handleChange} 
            successMessage={successMessage} 
            errorMessage={errorMessage} 
            isOpen={showAddDialog} 
            onClose={handleCloseAddDialog} 
            onCancel={handleCloseAddDialog} 
            cancelRef={cancelRef}/>
        )}
            
        </div>
        
        
        </div>
    )
} 