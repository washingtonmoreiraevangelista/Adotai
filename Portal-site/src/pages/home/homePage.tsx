import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import GroupIcon from "@mui/icons-material/Group"
import type { Pet } from "../../interface/pet.interface"
import { AdoptionModal } from '../../components/adotad-card/adotad'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const [selectedPet] = useState<Pet | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()


  const goToPets = () => {
    navigate('/pets')
  }

  return (
    <Box sx={{ backgroundColor: "#f4fcfc", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        height="600px"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundImage: `url(src/assets/pet4.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          position="relative"
          zIndex={1}
          textAlign="center"
          px={2}
          color="white"
        >
          <Typography variant="h2" fontWeight="bold">
            Encontre seu novo
            <Typography component="span" variant="h2" color="primary">
              <br />
              melhor amigo
            </Typography>
          </Typography>
          <Typography variant="h6" mt={2} maxWidth="700px" mx="auto">
            Milhares de pets estão esperando por uma família amorosa. Adote e
            transforme duas vidas: a sua e a deles.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            mt={4}
          >
            <Button variant="contained" size="large" startIcon={<FavoriteIcon />} onClick={goToPets}>
              Encontrar meu pet
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<GroupIcon />}
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "#f4fcfc",
                },
              }}
            >
              Como adotar
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Métricas */}
      <Box py={12}>
        <Container>
          <Grid container spacing={8} justifyContent="center" textAlign="center">
              <Typography variant="h4" fontWeight="bold" color="primary">
                500+
              </Typography>
              <Typography color="text.secondary">Pets adotados</Typography>
        
              <Typography variant="h4" fontWeight="bold" color="primary">
                50+
              </Typography>
              <Typography color="text.secondary">Parceiros</Typography>
           
              <Typography variant="h4" fontWeight="bold" color="primary">
                100%
              </Typography>
              <Typography color="text.secondary">Amor garantido</Typography>
          </Grid>
        </Container>
      </Box>


      {/* CTA */}
      <Box py={8} bgcolor="primary.light" textAlign="center">
        <Container>
          <Typography variant="h4" fontWeight="bold">
            Pronto para mudar uma vida?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="600px"
            mx="auto"
            mt={2}
          >
            A adoção é um ato de amor que transforma vidas. Seu novo melhor
            amigo está esperando por você.
          </Typography>
        </Container>
      </Box>

      {/* Modal */}
      <AdoptionModal
        pet={selectedPet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </Box>
  )
}
