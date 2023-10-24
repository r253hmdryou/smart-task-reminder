import { Container, CssBaseline, Grid, TextField } from "@mui/material";

export function App() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ margin: "16px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <TextField label="新規リマインダー" variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
