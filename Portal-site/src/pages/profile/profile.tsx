import { useState } from 'react'
import { Box, TextField, Button, Snackbar, Alert, CircularProgress, Typography } from '@mui/material'
import { petsService } from '../../service/pets.service'
import type { Pet } from '../../interface/pet.interface'

export const RegisterPetPage = () => {
  const [petData, setPetData] = useState<Pet>({
    name: '',
    description: '',
    type: '',
    raca: '',
    idade: '',
    size: '',
    city: '',
    adopted: false,
  })
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPetData({ ...petData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await petsService.createPet(petData) 
      setSnackbar({
        open: true,
        message: 'Pet cadastrado com sucesso!',
        severity: 'success',
      })
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Erro ao cadastrar pet',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Cadastro de Pet
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="name"
          value={petData.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Descrição"
          name="description"
          value={petData.description}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tipo"
          name="type"
          value={petData.type}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Raça"
          name="raca"
          value={petData.raca}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Idade"
          name="idade"
          value={petData.idade}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Tamanho"
          name="size"
          value={petData.size}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Cidade"
          name="city"
          value={petData.city}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Cadastrar Pet
          </Button>
        )}
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
