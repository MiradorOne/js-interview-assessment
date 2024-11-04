import {
  adaptCurrenciesToOptions,
  filterCurrenciesByCode,
} from './currenciesUtils';

const mock = [
  {
    id: 2,
    name: 'Afghani',
    short_code: 'AFN',
    code: '971',
    precision: 2,
    subunit: 100,
    symbol: '؋',
    symbol_first: false,
    decimal_mark: '.',
    thousands_separator: ',',
  },
  {
    id: 3,
    name: 'Lek',
    short_code: 'ALL',
    code: '8',
    precision: 2,
    subunit: 100,
    symbol: 'L',
    symbol_first: false,
    decimal_mark: '.',
    thousands_separator: ',',
  },
  {
    id: 4,
    name: 'Armenian Dram',
    short_code: 'AMD',
    code: '51',
    precision: 2,
    subunit: 100,
    symbol: 'դր.',
    symbol_first: false,
    decimal_mark: '.',
    thousands_separator: ',',
  },
];

const options = [
  { value: 'AFN', label: 'Afghani (AFN)', id: 2 },
  { value: 'ALL', label: 'Lek (ALL)', id: 3 },
  { value: 'AMD', label: 'Armenian Dram (AMD)', id: 4 },
];

describe('adaptCurrenciesToOptions', () => {
  it('should adapt currencies for select options', () => {
    const result = adaptCurrenciesToOptions(mock);
    expect(result).toEqual(options);
  });

  it('should return an empty array', () => {
    const result = adaptCurrenciesToOptions([]);
    expect(result).toEqual([]);
  });
});

describe('filterCurrenciesByCode', () => {
  it('should return the filtered array', () => {
    const result = filterCurrenciesByCode(options, 'AFN');
    expect(result).toEqual([
      { value: 'ALL', label: 'Lek (ALL)', id: 3 },
      { value: 'AMD', label: 'Armenian Dram (AMD)', id: 4 },
    ]);
  });

  it('should return the original array if the code is not found', () => {
    const result = filterCurrenciesByCode(options, '999');
    expect(result).toEqual(options);
  });
});
