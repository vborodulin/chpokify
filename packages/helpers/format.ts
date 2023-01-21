const DEFAULT_LOCALE = 'en-US';

const formatCurrencyWithSymbol = (
  value = 0,
  options: Intl.NumberFormatOptions = {}
) => {
  try {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: 'currency',
      currencyDisplay: 'symbol',
      useGrouping: false,
      ...options,
    }).format(value);
  } catch (err) {
    return value.toString();
  }
};

const formatNumber = (
  value: number,
  options: Intl.NumberFormatOptions = {}
): string => {
  try {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: 'decimal',
      useGrouping: true,
      ...options,
    }).format(value);
  } catch (err) {
    return value.toString();
  }
};

export const formatHelpers = {
  formatCurrencyWithSymbol,
  formatNumber,
};
