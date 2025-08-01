import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
} from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import type { Pet } from '../../interface/pet.interface'

interface PetCardProps {
  pet: Pet
  orgPhoneNumber: string
}

export const PetCard = ({ pet, orgPhoneNumber }: PetCardProps) => {
  const {
    name,
    description,
    type,
    raca,
    idade,
    city,
    size,
    adopted,
  } = pet

  const whatsappMessage = `Olá! Tenho interesse em adotar o pet ${name}. Poderiam me dar mais informações?`
  const whatsappURL = `https://wa.me/${orgPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <Card
      variant="outlined"
      sx={{
        width: 280,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        borderColor: 'primary.main',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Stack spacing={1}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name ?? 'Nome não informado'}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description ?? 'Sem descrição'}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {type && <Chip label={type} icon={<PetsIcon />} />}
            {raca && <Chip label={raca} />}
            {idade && <Chip label={idade} />}
            {size && <Chip label={size} />}
            {city && <Chip label={city} icon={<LocationOnIcon />} />}
            {adopted && <Chip label="Adotado" color="success" />}
          </Stack>
        </Stack>
      </CardContent>

      {!adopted && orgPhoneNumber && (
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<WhatsAppIcon />}
            href={whatsappURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Adotar via WhatsApp
          </Button>
        </CardActions>
      )}
    </Card>

  )
}
