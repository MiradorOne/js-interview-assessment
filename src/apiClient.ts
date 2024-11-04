const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

// This function is created to avoid the need to pass the API key in every request
// Possible solutions is to use a middleware or axios
export const fetchWithApiKey = async (
  endpoint: string,
  options: FetchOptions = {}
) => {
  const url = new URL(`${API_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY!);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), options);
  if (response.status !== 200)
    throw new Error(`Error ${response.status}: ${response.statusText}`);

  return response.json();
};
