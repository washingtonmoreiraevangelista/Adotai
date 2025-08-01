import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Grid,
  Chip,
  Box,
} from '@mui/material';
import { Map, CalendarMonth, Send } from '@mui/icons-material';
import { useState } from 'react';
import type { Pet } from '../../interface/pet.interface'


interface AdoptionModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdoptionModal = ({ pet, isOpen, onClose }: AdoptionModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitação enviada para adoção de ${pet?.name}`);
    setFormData({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  if (!pet) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Adotar {pet.name}</DialogTitle>
      <DialogContent dividers sx={{ maxHeight: '75vh' }}>
        <Grid container spacing={3}>
          {/* Lado da Imagem */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={pet.image}
              alt={pet.name}
              sx={{ width: '100%', height: 240, borderRadius: 2, objectFit: 'cover' }}
            />
          </Grid>

          {/* Lado das Informações */}
          <Grid item xs={12} md={7}>
            <Typography variant="h6">{pet.name}</Typography>
            <Typography variant="body2" color="text.secondary">{pet.raca}</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
              <Chip label={pet.type} color="primary" />
              <Chip label={pet.size} variant="outlined" />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <CalendarMonth fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">{pet.idade}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Map fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">{pet.city}</Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }}>
              {pet.description}
            </Typography>
          </Grid>
        </Grid>

        {/* Formulário */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            label="Nome completo *"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email *"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Telefone *"
                fullWidth
                required
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </Grid>
          </Grid>

          <TextField
            label={`Por que você quer adotar ${pet.name}?`}
            multiline
            rows={4}
            fullWidth
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            sx={{ mt: 2 }}
          />

          <DialogActions sx={{ px: 0, pt: 3 }}>
            <Button onClick={onClose} variant="outlined" fullWidth>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth endIcon={<Send />}>
              Enviar Solicitação
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
