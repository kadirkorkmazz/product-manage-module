import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './DataTables.css';

import createId from '../Utils/createId';
import { priceBodyTemplate, imageBodyTemplate } from '../Utils/Templates';
import { findIndexById } from '../Utils/findIndexById';
import HeaderTable from '../Utils/HeaderTable';
import ItemDialogFooter from '../Utils/ItemDialogFooter';
import DeleteItemDialogFooter from '../Utils/DeleteItemDialogFooter';
import { getData } from '../../Helpers/getData';
import { addData } from '../../Helpers/addData';
import { setData } from '../../Helpers/setData';
import { deleteData } from '../../Helpers/deleteData';

const DataProductsTable = () => {
  let emptyProduct = {
    id: '',
    title: '',
    thumbnail: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchData = async () => {
    let variety = 'products';
    const response = await getData(variety);
    setProducts(response.products);
    setIsDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.title.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id, products);

        _products[index] = _product;
        setData(_product.id, 'products', _product);

        toast.current.show({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Ürün Güncellendi',
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        console.log(_product);
        addData(_product, 'products');
        toast.current.show({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Ürün Eklendi',
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    deleteData(product.id, 'products');

    setProduct(emptyProduct);
    toast.current.show({
      severity: 'success',
      summary: 'Başarılı',
      detail: 'Ürün Silindi',
      life: 3000,
    });
  };

  const onInputChange = (e, part) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${part}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, part) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${part}`] = val;

    setProduct(_product);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning'
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  return (
    <div className='datatable-table'>
      <Toast ref={toast} />

      <div className='card'>
        <DataTable
          ref={dt}
          value={products}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Toplam {totalRecords} üründen {first} ile {last} arasındakiler '
          header={
            <HeaderTable openNew={openNew} lbl={'Ürün Ekle'} head={'Ürünler'} />
          }
          responsiveLayout='scroll'
        >
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: '8rem' }}
          ></Column>

          <Column
            field='title'
            header='Ürün Adı'
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field='description'
            header='Açıklama'
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field='price'
            header='Ücret'
            body={priceBodyTemplate}
            sortable
            style={{ minWidth: '8rem' }}
          ></Column>
          <Column
            field='stock'
            header='Stok'
            sortable
            style={{ minWidth: '5rem' }}
          ></Column>
          <Column
            field='category'
            header='Kategori'
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
          <Column
            field='thumbnail'
            header='Ürün Görseli'
            body={imageBodyTemplate}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: '450px' }}
        header='Ürün detayları'
        modal
        className='p-fluid'
        footer={<ItemDialogFooter saveItem={saveProduct} />}
        onHide={hideDialog}
      >
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            onError={(e) =>
              (e.target.src =
                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            }
            alt={product.title}
            className='product-image block m-auto pb-3'
          />
        )}
        <div className='field'>
          <label htmlFor='name'>Ürün Adı</label>
          <InputText
            id='name'
            value={product.title}
            onChange={(e) => onInputChange(e, 'title')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.title })}
          />
          {submitted && !product.title && (
            <small className='p-error'>Ürün adı zorunludur</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='description'>Açıklama</label>
          <InputTextarea
            id='description'
            value={product.description}
            onChange={(e) => onInputChange(e, 'description')}
            required
            rows={3}
            cols={20}
          />
        </div>

        <div className='field'>
          <label className='mb-3'>Kategori</label>
          <div className='formgrid grid'>
            <InputText
              id='category'
              value={product.category}
              onChange={(e) => onInputChange(e, 'category')}
              required
            />
          </div>
        </div>

        <div className='formgrid grid'>
          <div className='field col'>
            <label htmlFor='price'>Ücret</label>
            <InputNumber
              id='price'
              value={product.price}
              onValueChange={(e) => onInputNumberChange(e, 'price')}
              mode='currency'
              currency='TRY'
              locale='tr-TR'
            />
          </div>
          <div className='field col'>
            <label htmlFor='quantity'>Stok</label>
            <InputNumber
              id='stock'
              value={product.stock}
              onValueChange={(e) => onInputNumberChange(e, 'stock')}
              integeronly='true'
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '450px' }}
        header='Onay'
        modal
        footer={
          <DeleteItemDialogFooter
            hideDeleteItemDialog={hideDeleteProductDialog}
            deleteItem={deleteProduct}
          />
        }
        onHide={hideDeleteProductDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              <b>{product.title}</b> adlı ürünü silmek istediğine emin misin?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DataProductsTable;
