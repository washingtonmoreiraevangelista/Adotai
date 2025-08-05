import { Box, Button, Container, Typography, Grid, Paper, Divider } from "@mui/material"

export const AdoptPage = () => {
  return (
    <Box py={6} bgcolor="#f4fcfc">
      <Container maxWidth="md">
        {/* Título */}
        <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
          Como Adotar um Pet
        </Typography>

        {/* Introdução */}
        <Typography variant="h6" color="text.secondary" align="center" mb={4}>
          Adotar um pet é um ato de amor que transforma vidas. Ao abrir seu lar para um animal,
          você está salvando uma vida e ganhando um companheiro leal.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Passo a passo */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Passo a passo da adoção
        </Typography>
        <Grid container spacing={3} mb={4}>
          {[
            "Escolha seu pet na nossa lista de adoção.",
            "Clique no botão de adotar.",
            "vai ser redirecionado para o WhassApp.",
            "Converse com a Ong responsável pela adoção.",
            "Preencha o formulário com seus dados.",
            "Aguardamos a análise e agendamos uma entrevista.",
            "Após a aprovação, você assina o termo e leva seu pet para casa!"
          ].map((step, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography>
                  <strong>{index + 1}.</strong> {step}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Requisitos */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Requisitos para adoção
        </Typography>
        <ul>
          <li>Ser maior de 18 anos</li>
          <li>Apresentar documento com foto</li>
          <li>Ter ambiente adequado para o pet</li>
          <li>Assinar termo de adoção responsável</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        {/* O que está incluso */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          O que está incluso na adoção
        </Typography>
        <ul>
          <li>Vacinas em dia</li>
          <li>Castração (ou agendamento)</li>
          <li>Vermifugação</li>
          <li>Microchip (em alguns casos)</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        {/* Benefícios */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Benefícios de adotar
        </Typography>
        <ul>
          <li>Você salva uma vida</li>
          <li>Ajuda a reduzir o abandono</li>
          <li>Ganha um companheiro fiel</li>
          <li>Evita a compra irresponsável de animais</li>
        </ul>

        <Divider sx={{ my: 4 }} />

        {/* FAQ */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Perguntas Frequentes
        </Typography>
        <Box mb={2}>
          <Typography><strong>Tem custo?</strong> A adoção é gratuita, mas aceitamos doações para ajudar outros animais.</Typography>
        </Box>
        <Box mb={4}>
          <Typography><strong>Posso devolver o pet?</strong> Em casos especiais, sim. Sempre conversamos antes para garantir o melhor para o animal.</Typography>
        </Box>

        {/* CTA */}
        <Box textAlign="center" mt={6}>
          <Button variant="contained" color="primary" size="large" href="/pets">
            Ver pets disponíveis
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
