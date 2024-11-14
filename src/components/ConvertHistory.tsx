import { Container, Grid2 as Grid } from '@mui/material';
import { ConvertResult } from '../api/useFetchConvertResult';

interface Props {
  history: ConvertResult[]
}
const ConvertHistory = ({ history }: Props) => {
  return (
    <Container >
      <Grid>
        <Grid size={{ xs: 12}} pt={2} pb={2}>Convert History</Grid>

        {history.map((entry, i) => {
          return (
            <Grid key={i} size={{xs: 12}} pb={2}>
              {entry.from} - {entry.to}
              <br/>
              Amount: {entry.amount} - Result: {entry.value}
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default ConvertHistory