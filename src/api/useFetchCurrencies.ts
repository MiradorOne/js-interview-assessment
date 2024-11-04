import { useState, useEffect } from 'react';
import { CURRENCIES_API } from '../constants/api';
import { fetchWithApiKey } from '../apiClient';

export interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

interface UseFetchCurrenciesReturn {
  currencies: Currency[] | null;
  loading: boolean;
  error: string | null;
}

// I use this custom hook to separate fetch data/states from UI
function useFetchCurrencies(): UseFetchCurrenciesReturn {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWithApiKey(`${CURRENCIES_API}?type=fiat`);
        setCurrencies(data.response);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
}

export default useFetchCurrencies;
