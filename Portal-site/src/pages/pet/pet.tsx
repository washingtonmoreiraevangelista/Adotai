import { useEffect, useState, useMemo } from 'react'
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { petsService } from '../../service/pets.service'
import type { Pet } from '../../interface/pet.interface'
import { PetCard } from '../../components/petCard/petCard'

export const PetsPage = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [page, setPage] = useState(0)
  const petsPerPage = 12

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await petsService.getAllPets(1, 9999)
        console.log('Pets recebidos:', response)
        setPets(response.pet) // Ajustando para garantir que pets seja populado corretamente
      } catch (error) {
        console.error('Erro ao buscar pets:', error)
      }
    }

    fetchPets()
  }, [])

  const totalPages = Math.ceil(pets.length / petsPerPage)

  const paginatedPets = useMemo(() => {
    const start = page * petsPerPage
    return pets.slice(start, start + petsPerPage)
  }, [pets, page, petsPerPage])

  const goPrevPage = () => setPage((p) => Math.max(p - 1, 0))
  const goNextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1))

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #f0fdf4, #ccfbf1)',
        pb: 10,
        backgroundImage: `url(src/assets/pet.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <Container sx={{ maxWidth: 800, textAlign: 'center', pt: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: '#88c3b5',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Dieta Diária!
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={6}>
          Siga sua nutrição diária de forma inteligente
        </Typography>
      </Container> */}

      <Container sx={{ maxWidth: 800, textAlign: 'center', mb: 4 }}>
        <Grid container spacing={1} justifyContent="center">
          {paginatedPets.map((pet) => (
            <Grid item key={pet.id} xs={6} sm={3} md={2} lg={1} sx={{ display: 'flex', justifyContent: 'center' }}>
              <PetCard pet={pet} orgPhoneNumber="SEU_NUMERO" />
            </Grid>
          ))}
        </Grid>
      </Container>

      {pets.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
          <Button onClick={goPrevPage} disabled={page === 0} sx={{ minWidth: 'auto', p: 1 }}>
            <ArrowBackIosNewIcon />
          </Button>
          <Typography variant="body1">
            {totalPages > 0 ? page + 1 : 0} / {totalPages}
          </Typography>
          <Button onClick={goNextPage} disabled={page >= totalPages - 1} sx={{ minWidth: 'auto', p: 1 }}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
      )}
    </Box>
  )
}
