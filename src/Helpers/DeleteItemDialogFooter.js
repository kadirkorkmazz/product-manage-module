import React from 'react';
import { Button } from 'primereact/button';

function DeleteItemDialogFooter({ hideDeleteItemDialog, deleteItem }) {
  return (
    <React.Fragment>
      <Button
        label='Hayır'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteItemDialog}
      />
      <Button
        label='Evet'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteItem}
      />
    </React.Fragment>
  );
}

export default DeleteItemDialogFooter;
