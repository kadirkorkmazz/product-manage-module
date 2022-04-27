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
import { findIndexById } from '../Utils/findIndexById';
import HeaderTable from '../Utils/HeaderTable';
import ItemDialogFooter from '../Utils/ItemDialogFooter';
import DeleteItemDialogFooter from '../Utils/DeleteItemDialogFooter';
import { getData } from '../../Helpers/getData';
import { addData } from '../../Helpers/addData';
import { setData } from '../../Helpers/setData';
import { deleteData } from '../../Helpers/deleteData';

const DataPostsTable = () => {
  let emptyPost = {
    id: '',
    title: '',
    body: '',
    tags: [],
    reactions: 0,
  };

  const [posts, setPosts] = useState(null);
  const [postDialog, setPostDialog] = useState(false);
  const [deletePostDialog, setDeletePostDialog] = useState(false);
  const [post, setPost] = useState(emptyPost);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchData = async () => {
    let variety = 'posts';
    const response = await getData(variety);
    setPosts(response.posts);
    setIsDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNew = () => {
    setPost(emptyPost);
    setSubmitted(false);
    setPostDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setPostDialog(false);
  };

  const hideDeletePostDialog = () => {
    setDeletePostDialog(false);
  };

  const savePost = () => {
    setSubmitted(true);

    if (post.title.trim()) {
      let _posts = [...posts];
      let _post = { ...post };
      if (post.id) {
        const index = findIndexById(post.id, posts);

        _posts[index] = _post;
        setData(_post.id, 'posts', _post);

        toast.current.show({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Gönderi Güncellendi',
          life: 3000,
        });
      } else {
        _post.id = createId();
        _posts.push(_post);
        addData(_post, 'posts');
        toast.current.show({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Gönderi Oluşturuldu',
          life: 3000,
        });
      }

      setPosts(_posts);
      setPostDialog(false);
      setPost(emptyPost);
    }
  };

  const editPost = (post) => {
    setPost({ ...post });
    setPostDialog(true);
  };

  const confirmDeletePost = (post) => {
    setPost(post);
    setDeletePostDialog(true);
  };

  const deletePost = () => {
    let _posts = posts.filter((val) => val.id !== post.id);
    setPosts(_posts);
    setDeletePostDialog(false);
    deleteData(post.id, 'posts');

    setPost(emptyPost);
    toast.current.show({
      severity: 'success',
      summary: 'Başarılı',
      detail: 'Gönderi Silindi',
      life: 3000,
    });
  };

  const onInputChange = (e, part) => {
    const val = (e.target && e.target.value) || '';
    let _post = { ...post };
    _post[`${part}`] = val;

    setPost(_post);
  };

  const onInputNumberChange = (e, part) => {
    const val = e.value || 0;
    let _post = { ...post };
    _post[`${part}`] = val;

    setPost(_post);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => editPost(rowData)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning'
          onClick={() => confirmDeletePost(rowData)}
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
          value={posts}
          dataKey='id'
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
          currentPageReportTemplate='Toplam {totalRecords} gönderiden {first} ile {last} arasındakiler'
          header={
            <HeaderTable
              openNew={openNew}
              lbl={'Gönderi Ekle'}
              head={'Gönderiler'}
            />
          }
          responsiveLayout='scroll'
        >
          <Column
            body={actionBodyTemplate}
            style={{ minWidth: '8rem' }}
          ></Column>

          <Column
            field='title'
            header='Başlık'
            sortable
            style={{ minWidth: '16rem' }}
          ></Column>
          <Column
            field='body'
            header='Gönderi'
            style={{ minWidth: '16rem' }}
          ></Column>

          <Column
            field='reactions'
            header='Tepkiler'
            sortable
            style={{ minWidth: '5rem' }}
          ></Column>
          <Column
            field='tags'
            header='Etiketler'
            sortable
            style={{ minWidth: '10rem' }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={postDialog}
        style={{ width: '450px' }}
        header='Gönderi Detayları'
        modal
        className='p-fluid'
        footer={<ItemDialogFooter saveItem={savePost} />}
        onHide={hideDialog}
      >
        <div className='field'>
          <label htmlFor='title'>Başlık</label>
          <InputText
            id='title'
            value={post.title}
            onChange={(e) => onInputChange(e, 'title')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !post.title })}
          />
          {submitted && !post.title && (
            <small className='p-error'>Başlık girmek zorunludur</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='description'>Gönderi</label>
          <InputTextarea
            id='description'
            value={post.body}
            onChange={(e) => onInputChange(e, 'body')}
            required
            rows={5}
            cols={20}
          />
        </div>

        <div className='field'>
          <label className='mb-3'>Etiketler</label>
          <div className='formgrid grid'>
            <InputText
              id='tags'
              value={post.tags}
              onChange={(e) => onInputChange(e, 'tags')}
              required
            />
          </div>
        </div>

        <div className='formgrid grid'>
          <div className='field col'>
            <label htmlFor='reactions'>Tepkiler</label>
            <InputNumber
              id='reactions'
              value={post.reactions}
              onValueChange={(e) => onInputNumberChange(e, 'reactions')}
              integeronly='true'
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deletePostDialog}
        style={{ width: '450px' }}
        header='Onay'
        modal
        footer={
          <DeleteItemDialogFooter
            hideDeleteItemDialog={hideDeletePostDialog}
            deleteItem={deletePost}
          />
        }
        onHide={hideDeletePostDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {post && (
            <span>
              <b>{post.title}</b> başlıklı gönderiyi silmek istediğine emin
              misin?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DataPostsTable;
