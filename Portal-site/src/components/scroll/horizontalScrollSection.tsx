import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from "@mui/material"
import type { Pet } from "../../interface/pet.interface"
import { petsService } from "../../service/pets.service"

export const HorizontalScroll = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await petsService.getAllPets(1, 9999)
        console.log("Pets recebidos:", response)
        setPets(response.pet) 
      } catch (error) {
        console.error("Erro ao buscar pets:", error)
      } finally {
        setLoading(false) 
      }
    }

    fetchPets()
  }, [])

  const itemsPerPage = 4

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartIndex((prevIndex) => {
        return (prevIndex + 1) % pets.length 
      })
    }, 4000) 

    return () => clearInterval(intervalId)
  }, [pets.length])

  return (
     <Box my={8} px={4}>
      <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
        Conheça nossos pets
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          spacing={2} 
          justifyContent="center"
          sx={{
            maxWidth: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                maxWidth: "100%",
                padding: "20px", 
              }}
            >
              {pets.slice(startIndex, startIndex + itemsPerPage).map((pet) => (
                <Card
                  key={pet.id}
                  sx={{
                    minWidth: 250, 
                    maxWidth: 600, 
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 010px", 
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {pet.name}
                    </Typography>
                    <Typography color="text.secondary">{pet.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}
