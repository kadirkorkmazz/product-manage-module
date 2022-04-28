import React from 'react';
import { Button } from 'primereact/button';

function HeaderTable({ openNew, lbl, head }) {
  return (
    <div className='table-header'>
      <h2 className='mx-0 my-1'>{head}</h2>
      <React.Fragment>
        <Button
          label={lbl}
          icon='pi pi-plus'
          className='p-button-success mr-2'
          onClick={openNew}
        />
      </React.Fragment>
    </div>
  );
}

export default HeaderTable;
