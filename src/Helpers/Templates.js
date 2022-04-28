import formatCurrency from './formatCurrency';

export const priceBodyTemplate = (rowData) => {
  return formatCurrency(rowData.price);
};

export const imageBodyTemplate = (rowData) => {
  return (
    <img
      src={rowData.thumbnail}
      onError={(e) =>
        (e.target.src =
          'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
      }
      alt={rowData.image}
      className='product-image'
    />
  );
};

export const tagsTemplate = (rowData) => {
  return rowData.tags.toString();
};
