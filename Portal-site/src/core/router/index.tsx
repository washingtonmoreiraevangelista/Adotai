import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home/homePage'
import { PetsPage } from '../../pages/pet/pet'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
       {/* Página pública */}
      <Route path="/" element={<HomePage />} />
      <Route path="/pets" element={<PetsPage />} />

      {/* Rotas privadas */}
      {/* <Route element={<PrivateLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
)