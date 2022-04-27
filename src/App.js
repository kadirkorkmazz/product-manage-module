import './App.css';
import DataProductsTable from './Components/DataTables/DataProductsTable';
import DataPostsTable from './Components/DataTables/DataPostsTable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Header />}>
            <Route path='/' exact element={<DataProductsTable />} />

            <Route path='products' exact element={<DataProductsTable />} />
            <Route path='posts' exact element={<DataPostsTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
