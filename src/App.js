import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { useState, useRef } from 'react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './App.css';

import TableColumn from './Components/TableColumn';

function App() {

  return (
    <div className="App">
      <TableColumn />
    </div>
  );
}

export default App;
