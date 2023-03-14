import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import EditPet from './components/EditPet';
import UserLogin from './components/UserLogin';
import NewPet from './components/NewPet';
import NewUser from './components/NewUser';
import PetDetails from './components/PetDetails';
import YourPets from './components/YourPets';
import ApprovePets from './components/ApprovePets';

import ProtectedRoute from './utils/ProtectedRoute';
import ProtectedAdminRoute from './utils/ProtectedAdminRoute';
import Layout from './pages/layout';
import NoPage from './pages/no-page';
import Home from './pages/home';
import Match from './pages/pets-match/Match';
//import Mymatches from './pages/my-matches';
import Mymatches from './components/Mymatches';
import AllPets from './pages/all-pets';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/user/new" element={<NewUser />} />
          <Route exact path="/user/login" element={<UserLogin />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/home" element={<YourPets />} />
            <Route exact path="/pets/new" element={<NewPet />} />
            <Route exact path="/pets/:petId" element={<PetDetails />} />
            <Route exact path="/pets/:petId/edit" element={<EditPet />} />
            <Route exact path="/pets/:petId/match" element={<Match/>} />
            <Route exact path="/pets/matches" element={<Mymatches/>} />
            <Route path="/pets/*" element={<NoPage />} />
          </Route>
          <Route path="/" element={<ProtectedAdminRoute><Layout /></ProtectedAdminRoute>}>
            <Route exact path="/asdf" element={<><AllPets /></>} />
            <Route exact path="/admin/approve" element={ <ApprovePets/> } />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
