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
import { HorizontalScroll } from '../../components/scroll/horizontalScrollSection'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  const [selectedPet] = useState<Pet | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const goToPets = () => {
    navigate('/pets')
  }

  const handleAdocao = () => {
    navigate('/adopt')
  }

  return (
    <Box sx={{ backgroundColor: "#f4fcfc", minHeight: "100vh" }}>
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
            spacing={1}
            justifyContent="center"
            mt={4}
          >
            <Button variant="contained" size="large" startIcon={<FavoriteIcon />} onClick={goToPets}>
              Encontrar meu pet
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<GroupIcon />}
              sx={{
                backgroundColor: "#FC7765",
                color: "white",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#FC7765",
                  boxShadow: "none",
                },
              }}
              onClick={handleAdocao}
            >
              Como adotar
            </Button>

          </Stack>
        </Box>
      </Box>

      {/* Métricas */}
      <Box py={4}>
        <Container>
          <Grid container spacing={40} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" fontWeight="bold" color="primary" align="center">
                500+
              </Typography>
              <Typography color="text.secondary" align="center">
                Pets adotados
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h4" fontWeight="bold" color="primary" align="center">
                50+
              </Typography>
              <Typography color="text.secondary" align="center">
                Parceiros
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h4" fontWeight="bold" color="primary" align="center">
                100%
              </Typography>
              <Typography color="text.secondary" align="center">
                Amor garantido
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Horizontal Scroll */}
      <Box mt={3}>
        <HorizontalScroll />
      </Box>

      {/* CTA */}
      <Box py={6} bgcolor="primary.light" textAlign="center">
        <Container>
          <Typography variant="h4" fontWeight="bold">
            Pronto para mudar uma vida?
          </Typography>
          <br />
          <Typography variant="h6" color="text.secondary" mb={4}>
            Junte-se a nós na missão de encontrar lares para nossos amigos de quatro patas.
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            mb={2}
          >
            Se você representa uma <strong>ONG</strong> e quer fazer parte deste projeto de adoção, cadastre sua instituição abaixo.
            <br />
            Caso já tenha uma conta :{" "}
            <Link style={{ color: "#0921f7ff", textDecoration: "underline", fontWeight: "bold" }} to="/sessions">
              login/Cadastro
            </Link>
          </Typography>

        </Container>
      </Box>

      {/* Modal */}
      <AdoptionModal
        pet={selectedPet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCadastroONG}
          sx={{
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            ONG
          </Typography>
        </Button>
      </Box> */}
    </Box>
  )
}
