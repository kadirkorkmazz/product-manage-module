import React from 'react';
import { Button } from 'primereact/button';

function ItemDialogFooter({ saveItem }) {
  return (
    <Button
      label='Kaydet'
      icon='pi pi-check'
      className='p-button-text'
      onClick={saveItem}
    />
  );
}

export default ItemDialogFooter;
