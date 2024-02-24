import { ChangeEvent, useEffect, useRef, useState } from "react";
import  ShowCows from "./ShowCows";
import axios from "axios";
import './index.css'
import { DeleteCow } from "./DeleteCow";
import { UpdateCow } from "./UpdateCow";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MedicalExamForOne } from "../MedicalExam/MedicalExamForOne";
import AddCowDialog from "./AddCowDialog";
import { Heading } from "@chakra-ui/react";

export const Cow = ({ itemsPerPage = 5 }) => {

    const [cows, setCows] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [showAddCow, setShowAddCow] = useState(false);
    const cancelRef = useRef()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [deleteCowId, setdeleteCowId] = useState(0);
    const [UpdateCowId,setUpdateCowId] =useState(0);
    const [showMedicalExam, setShowMedicalExam] = useState(false);
    const [medicalExamData, setMedicalExamData] = useState([]);
    const [updatedData, setUpdatedData] = useState({
        breed: '',
        date: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(cows.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, cows.length);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [cowData, setCowData] = useState({
        entry_date: '',
        breed: ''
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCowData({ ...cowData, [name]: value });
    };

    const closeAddCowDialog = () => {
        setShowAddCow(false);
    };

    const handleSubmit = async (cowData:any) => {
        try {
            const response = await axios.post('http://localhost:5000/addNewCow', cowData);
    
            if (response.status === 201) {
                setSuccessMessage('Cow added successfully.');
                setErrorMessage('');
                setShowAddCow(false)
                setCows(response.data)
            } else {
                throw new Error('Failed to add Cow. Server returned status: ' + response.status);
            }
        } catch (error) {
            setErrorMessage('Failed to add Cow. Please try again.');
            setSuccessMessage('');
            throw new Error('Failed to add Cow. Please try again. Error: ' + error);
        }
    };
    
    const handleOpenDeleteDialog = (id: number) => {
        setShowDeleteDialog(true);
        setdeleteCowId(id)
    };

    const handleOpenUpdateDialog = (id: number) => {
        setShowUpdateDialog(true);
        setUpdateCowId(id)
    };

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
        
    };
    const handleCloseUpdateDialog = () => {
        setShowUpdateDialog(false);
        
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getCows'); // Assuming getCows is your backend endpoint
            setCows(response.data);
            console.log('this is data ', response.data); // Log the data here
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleToggleAddCow = () => {
        setShowAddCow(true);
    };
    const handleRadioChange = (value: string) => {
    setSelectedOption(value);
    };

    const handleMedicalExamClick = async (id: number) => {
        try {
            // Fetch the medical exam data for the cow with the specified ID
            const response = await axios.get(`http://localhost:5000/getMedicalExamByID/${id}`);
            setMedicalExamData(response.data);
            setShowMedicalExam(true);
            navigate(`/MedicalExam/${id}`)
        } catch (error) {
            console.error('Error fetching medical exam data:', error);
        }
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const handleDeleteCow = async (cowId: number) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deleteCow/${cowId}`);
            setCows(response.data)
            setShowDeleteDialog(false)
            console.log(response.data); 
        } catch (error) {
            console.error('Error deleting cow:', error);
           
        }
    };

    const handleUpdateCow = async (cowId: number, updatedData: any) => {
        try {
            const response = await axios.put(`http://localhost:5000/updateCow/${cowId}`, updatedData);
            setCows(response.data);
            setShowUpdateDialog(false);
            } catch (error) {
            console.error('Error updating cow:', error);
        }
    };
    

    return(
        <div className="cowPage">
            <Heading as='h2' size='xl'>
                Cow Data 
            </Heading>
            <div className="showCow">
            { showMedicalExam ? null : (
                    <ShowCows
                        data={cows} 
                        handlePrevious={handlePrevious} 
                        handleNext={handleNext} 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        startIndex={startIndex} 
                        endIndex={endIndex}
                        onOpenDeleteDialog={(id: number) => handleOpenDeleteDialog(id)}
                        onOpenUpdateDialog={(id: number) => handleOpenUpdateDialog(id)}
                        onMedicalExamClick={(id: number) => handleMedicalExamClick(id)}
                        onOpenAddCow= { handleToggleAddCow } />
                )}
            </div>
            <div className="addCow">
                {showAddCow && (
                    <AddCowDialog 
                    cowData={cowData} 
                    handleSubmit={() => handleSubmit(cowData)} 
                    handleChange={handleChange} 
                    successMessage={successMessage} 
                    errorMessage={errorMessage} 
                    isOpen={showAddCow} 
                    onClose={closeAddCowDialog} 
                    onCancel={closeAddCowDialog} 
                    cancelRef={cancelRef}                    />
                )}
            </div>
            {showDeleteDialog && (
                <DeleteCow
                    isOpen={showDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onCancel={handleCloseDeleteDialog}
                    onDelete={() => handleDeleteCow(deleteCowId)}
                    cancelRef={cancelRef}
                />
            )}
            {showUpdateDialog && (
                <UpdateCow
                    isOpen={showUpdateDialog}
                    onClose={handleCloseUpdateDialog}
                    onCancel={handleCloseUpdateDialog}
                    onUpdate={() => handleUpdateCow(UpdateCowId, updatedData)}
                    cancelRef={cancelRef}
                    handleInputChange={handleInputChange}
                />
            )}
            <Routes>
                <Route path="/MedicalExam/:id" 
                element={<MedicalExamForOne 
                            data = {medicalExamData}
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            startIndex={startIndex} 
                            endIndex={endIndex}
                            handlePrevious={handlePrevious} 
                            handleNext={handleNext}
                            onOpenDeleteDialog={(id: number) => handleOpenDeleteDialog(id)}
                            onOpenUpdateDialog={(id: number) => handleOpenUpdateDialog(id)}
                            />
                 }/>
            </Routes>
        </div>
    )
}