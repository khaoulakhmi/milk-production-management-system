import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MedicalExamForOne } from "./MedicalExamForOne";
import { Delete } from "../common/Delete";
import { ShowMedicalExams } from "./MedicalExams";
import { UpdateExam } from "./UpdateExam";
import ExamDialog from "./AddExamDialog";
import { Heading } from "@chakra-ui/react";

export type MedicalExamT = {
    id:number
    cow_id: number;
    exam_date: string;
    disease: string;
} 

export const MedicalExam = ({ itemsPerPage = 5 }) => {

    const [exams, setExams] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(exams.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, exams.length);
   
    const [selectedOption, setSelectedOption] = useState('');
    const cancelRef = useRef()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [deleteId,setdeleteId] = useState(0)
    const [successMessage, setSuccessMessage] = useState('');
    const [updateId,setUpdateId] =useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [examData, setExamData] = useState({
        exam_date: '',
        cow_id: 0,
        disease: ''
    });
    const [updatedData, setUpdatedData] = useState({
        exam_date: '',
        cow_id: 0,
        disease: ''
    });
    
    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getExams'); 
            setExams(response.data);
            console.log('this is data ', response.data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value
        });
    };

    const handleOpenUpdateDialog = (id: number) => {
        setShowUpdateDialog(true);
        setUpdateId(id)
    };

    const handleCloseUpdateDialog = () => {
        setShowUpdateDialog(false);
        
    };

    const handleOpenDeleteDialog = (id: number) => {
        setShowDeleteDialog(true);
        setdeleteId(id)
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
            const response = await axios.put(`http://localhost:5000/updateExam/${id}`, updatedData);
            setExams(response.data);
            setShowUpdateDialog(false);
            } catch (error) {
            console.error('Error updating :', error);
        }
    };
    
    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`http://localhost:5000/delete/${id}`);
            setExams(response.data)
            setShowDeleteDialog(false)
            console.log(response.data); 
        } catch (error) {
            console.error('Error deleting Production:', error);
           
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setExamData({ ...examData, [name]: value });
    };

    const handleSubmit = async (examData:any) => {
        try {
            const response = await axios.post('http://localhost:5000/addExam', examData);
    
            if (response.status === 201) {
                setSuccessMessage('Exam added successfully.');
                setErrorMessage('');
                setExams(response.data)
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
                Medical Exam Data 
            </Heading>
            <div className="showCow">
                <ShowMedicalExams 
                    data={exams}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    onOpenDeleteDialog={(id: number) => handleOpenDeleteDialog(id)}
                    onOpenUpdateDialog={(id: number) => handleOpenUpdateDialog(id)} 
                    onOpenAddDialog={handleOpenAddDialog}        />
                {showDeleteDialog && (
                    <Delete 
                        isOpen={showDeleteDialog} 
                        onClose={handleCloseDeleteDialog} 
                        onCancel={handleCloseDeleteDialog} 
                        onDelete={()=>handleDelete(deleteId)} 
                        cancelRef={cancelRef} 
                        className={"Medical Exam"}/>
                )}

                {showUpdateDialog && (
                    <UpdateExam 
                        isOpen= { showUpdateDialog } 
                        onClose= { handleCloseUpdateDialog } 
                        onCancel= { handleCloseUpdateDialog } 
                        onUpdate= {()=>handleUpdatedData(updateId, updatedData)} 
                        handleInputChange= {handleInputChange} 
                        cancelRef= { cancelRef }
                    />
                )}
                {showAddDialog && (
                    <ExamDialog 
                        examData={examData} 
                        handleSubmit={()=>handleSubmit(examData)} 
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