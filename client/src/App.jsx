import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AllPets from './components/AllPets';
import EditPet from './components/EditPet';
import UserLogin from './components/UserLogin';
import NewPet from './components/NewPet';
import NewUser from './components/NewUser';
import PetDetails from './components/PetDetails';
import YourPets from './components/YourPets';
import ApprovePets from './components/ApprovePets';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<><UserLogin/></>} />
          <Route exact path="/asdf" element={<><AllPets /></>} />
          <Route exact path="/pets/new" element={<NewPet />} />
          <Route exact path="/home" element={<YourPets />} />
          <Route exact path="/pets/:petId" element={<PetDetails />} />
          <Route exact path="/pets/:petId/edit" element={<EditPet />} />
          <Route exact path="/user/new" element={<NewUser />} />
          <Route exact path="/user/login" element={<UserLogin />} />
          <Route exact path="/admin/approve" element={ <ApprovePets/> } />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
