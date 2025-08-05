import { Outlet, useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { BoxMain, BoxWrapper, ContainerRoute } from './style'

export const PrivateLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/', { replace: true }) 
    }
  }, [navigate])

  return (
    <Box>
      <BoxWrapper>
        <BoxMain component="main">
          <ContainerRoute component="section" maxWidth="xl">
            <Outlet />
          </ContainerRoute>
        </BoxMain>
      </BoxWrapper>
    </Box>
  )
}