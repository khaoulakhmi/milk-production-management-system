import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from "react-router-dom"
import { Dashboard } from './components/Dashboard/Dashboard';
import { Cow } from './components/Cow';
import { MedicalExam } from './components/MedicalExam';

function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path= '/*' element= {<Dashboard/>}/>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
