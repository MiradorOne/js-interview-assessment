import {
  Box,
  Container,
  Grid2 as Grid,
  Input,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import Select from './common/Select';
import Button from './common/Button';

import useFetchCurrencies from '../api/useFetchCurrencies';
import {
  adaptCurrenciesToOptions,
  filterCurrenciesByCode,
} from '../utils/currenciesUtils';
import useFetchConvertResult, { ConvertResult } from '../api/useFetchConvertResult';

type ValidationError = {
  error: boolean;
  message: string;
} | null;

interface Props {
  handleConversionSave: (conversion: ConvertResult) => void
}

const CurrencyForm = ({ handleConversionSave }: Props) => {
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState<
    string | undefined
  >(undefined);
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState<
    string | undefined
  >(undefined);
  const [amount, setAmount] = useState<string>('');
  const [validationError, setValidationError] = useState<ValidationError>(null);

  const { currencies, loading, error } = useFetchCurrencies();
  const {
    result: convertResult,
    fetchConvertResult,
    loading: convertLoading,
    error: convertError,
  } = useFetchConvertResult();

  const adaptedCurrencies = adaptCurrenciesToOptions(currencies || []);

  const filteredFromCurrencies = selectedCurrencyTo
    ? filterCurrenciesByCode(adaptedCurrencies, selectedCurrencyTo)
    : adaptedCurrencies;
  const filteredToCurrencies = selectedCurrencyFrom
    ? filterCurrenciesByCode(adaptedCurrencies, selectedCurrencyFrom)
    : adaptedCurrencies;

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selectedOption = event.target.value;

    if (event.target.name === 'from') {
      setSelectedCurrencyFrom(selectedOption);
    } else if (event.target.name === 'to') {
      setSelectedCurrencyTo(selectedOption);
    }

    return null;
  };

  const handleConvertClick = () => {
    // That was the fastest way to validate
    // If the app grows it should be done via validation utils or specific lib like zod to get rid of repeated code
    if (!selectedCurrencyFrom) {
      setValidationError({
        error: true,
        message: 'Please select currency to convert from',
      });

      return;
    }

    if (!selectedCurrencyTo) {
      setValidationError({
        error: true,
        message: 'Please select currency to convert to',
      });

      return;
    }

    if (!amount) {
      setValidationError({
        error: true,
        message: 'Amount input is required',
      });

      return;
    }

    if (Number(amount) < 0) {
      setValidationError({
        error: true,
        message: 'Amount should be greater than 0',
      });

      return;
    }

    fetchConvertResult({
      from: selectedCurrencyFrom,
      to: selectedCurrencyTo,
      amount,
    });

    setValidationError(null);
  };

  useEffect(() => {

    if (!convertError && !convertLoading && convertResult) {
      handleConversionSave(convertResult)
    }

  }, [convertResult])

return (
  <Container sx={{ marginTop: 4 }}>
    <Typography variant="h4" gutterBottom>
      Select Currency to convert
    </Typography>
    {error ? (
      <Typography>Something went wrong. Try Reload the page</Typography>
    ) : (
      ''
    )}
    <Grid container spacing={2}>
      {loading ? (
        <Grid size={6}>
          <Typography>Loading currencies...</Typography>
        </Grid>
      ) : (
        <>
          <Grid size={{ sm: 3, xs: 12 }}>
            <Select
              label="From"
              name="from"
              value={selectedCurrencyFrom}
              options={filteredFromCurrencies}
              onChange={handleSelectChange}
            />
          </Grid>
          <Grid size={{ sm: 3, xs: 12 }}>
            <Select
              label="To"
              name="to"
              value={selectedCurrencyTo}
              options={filteredToCurrencies}
              onChange={handleSelectChange}
            />
          </Grid>
        </>
      )}
      <Grid container spacing={2}>
        <Grid size={5}>
          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            onChange={e => setAmount(e.target.value)}
          />
        </Grid>
        <Grid size={2}>
          <Button
            onClick={handleConvertClick}
            isDisabled={loading}
            label="Convert"
          />
        </Grid>
      </Grid>
      {validationError?.error && (
        <Grid size={12}>
          <Typography color="error">{validationError?.message}</Typography>
        </Grid>
      )}
    </Grid>
    <Grid container size={12}>
      {convertError && (
        <Typography color="error" pt={2}>
          {convertError}
        </Typography>
      )}
      {!convertError && convertLoading && (
        <Typography pt={2}>Converting...</Typography>
      )}
      {convertResult && !convertLoading && (
        <Grid container pt={2} alignItems="center">
          <Box sx={{ typography: 'body2' }}>Result: </Box>
          <Box sx={{ typography: 'body1', fontWeight: 'bold' }} pl={2}>
            {Number(convertResult?.value).toFixed(2)} &nbsp;(
            {selectedCurrencyTo})
          </Box>
        </Grid>
      )}
    </Grid>
  </Container>
);
};

export default CurrencyForm;