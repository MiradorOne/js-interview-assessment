import { Option } from '../components/common/Select';
import { Currency } from '../api/useFetchCurrencies';

const formatCurrencyDisplay = (currency: Currency) => {
  return `${currency.name} (${currency.short_code})`;
};

// This util is used to pass only properties required by Select component
export const adaptCurrenciesToOptions = (currencies: Currency[]) => {
  return currencies.map(currency => ({
    value: currency.short_code,
    label: formatCurrencyDisplay(currency),
    id: currency.id,
  }));
};

// This util is used to get rid of currency that is selected in another Select
export const filterCurrenciesByCode = (
  currencies: Option[],
  short_code: string
) => {
  return currencies.filter(currency => currency.value !== short_code);
};
