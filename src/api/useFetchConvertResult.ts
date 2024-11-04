import { useState, useCallback } from 'react';
import { CONVERT_API } from '../constants/api';
import { fetchWithApiKey } from '../apiClient';

export interface ConvertResult {
  amount: number;
  date: string;
  from: string;
  timestamp: number;
  to: string;
  value: number;
}

interface UseFetchConvertReturn {
  result: ConvertResult | null;
  loading: boolean;
  error: string | null;
  fetchConvertResult: (params: Record<string, string>) => Promise<void>;
}

function useFetchConvertResult(): UseFetchConvertReturn {
  const [result, setResult] = useState<null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConvertResult = useCallback(
    async (params: Record<string, string>) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWithApiKey(CONVERT_API, { params });
        setResult(data.response);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { result, loading, error, fetchConvertResult };
}

export default useFetchConvertResult;
