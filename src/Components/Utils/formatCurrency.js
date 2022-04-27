const formatCurrency = (value) => {
  return value.toLocaleString('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  });
};

export default formatCurrency;
