import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '../../pages/home/homePage'
import { PetsPage } from '../../pages/pet/pet'
import { HorizontalScroll } from '../../components/scroll/horizontalScrollSection'
import { AdoptPage } from '../../pages/adoted/adopt'
import { LoginRegisterSplit } from '../../pages/register/register'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Página pública */}
      <Route path="/" element={<HomePage />} />
      <Route path="/pets" element={<PetsPage />} />
      <Route path="/pets" element={<HorizontalScroll />} />
      <Route path="/adopt" element={<AdoptPage />} />
      <Route path="/sessions" element={<LoginRegisterSplit />} />



      {/* Rotas privadas */}
      {/* <Route element={<PrivateLayout />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route> */}
    </Routes>
  </BrowserRouter>
)