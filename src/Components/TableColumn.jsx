import React from 'react';
import ReactDOM from 'react-dom';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../App.css';
import BtnCellRenderer from './BtnCellRenderer';
import DropDown from './DropDown';
import { DatePicker, Space } from 'antd';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { DateFilter } from 'ag-grid-community';
import Date from './Date';
import GenderCellRenderer from './genderCellRenderer.jsx';
import moment from 'moment';
import { param } from 'jquery';



const TabelColumn = () => {

   const [setRowData] = useState([]);
   const gridRef = useRef(null);
   const [gridApi, setGridApi] = useState([]);
   const [gridColumnApi, setGridColumnApi] = useState(null);

   const [GridApi , setGridApiOne] = useState([]);
   const [gridColumnApiOne , setGridColumnApiOne] = useState(null);

   
   const rowData = [
    {id:1, name: "test1", email: "test1@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Varansai'},
    {id:2, name: "test2", email: "test2@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Kanpur'},
    {id:3, name: "test3", email: "test3@gmail.com", gender:'Male',dob:'22/07/2019',country:'Ireleand' , city:'Dublin'}
   ];

   var newrowData = [];

    var newData = {
        id : '',
        name : '',
        email : '',
        gender : '',
        dob : '',
        country : '',
        city : ''
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

    };

    const onGridReadyOne = (param) => {
        setGridApiOne(param.api);
        setGridColumnApiOne(param.columnApi);
    }

    const getRowData = () => {
        var rowData = [];
        gridApi.forEachNode(function (node) {
        rowData.push(node.data);
        });
        console.log('Row Data:');
        console.log(rowData);
    };

    const addItems = (addIndex) => {
        var newItems = [createNewRowData()];
        var res = gridApi.applyTransaction({
          add: newItems,
          addIndex: addIndex,
        });
    };

    const onRemoveSelected = () => {
        var selectedData = gridApi.getSelectedRows();
        var res =gridApi.applyTransaction({ remove: selectedData });
    
       
    };
    
    const onRemoveUnselected = () =>{
        var selectedData = gridApi.getSelectedRows();
        var rowData = [];
        gridApi.forEachNode(function (node) {
            if(!selectedData.find(x => x == node.data)){
                rowData.push(node.data);    
            } 
        });
        var res = gridApi.applyTransaction({ remove: rowData });
    };

    var onSubmitvalue = false;
    const onSubmit = () =>{
        var currrowData = [];
        var selectedData = gridApi.getSelectedRows();
        var message = '';
        onSubmitvalue = true;
        gridApi.forEachNode(function (node) {
            if(!newrowData.find(x => x == node.data)){
                if(selectedData.find(x=> x == node.data) && !(isNotEqual(newData , node.data))){
                    currrowData.push(node.data);
                    newrowData.push(node.data);
                    message = 'Submitted'
                }else if(isNotEqual(newData , node.data)){
                    message = 'Error';
                }
            }
        });
        var res = GridApi.applyTransaction({ add: currrowData });
        alert(message);
    }

    const isNotEqual = (obj1 , obj2) => {
        const Obj1key = Object.keys(obj1);
        const Obj2key = Object.keys(obj2);

        if(Obj1key.length != obj2.length){
            return true;
        }

        for(let objkey of Obj1key){
            if(obj1[objkey] !== obj2[objkey]){
                return true;
            }
        }

        return false;
    }

    
    // function Date(){
    //     const [inputDate , setInputDate] = useState(moment());
    //     const dateFormat = "DD/MM/YYYY"
    //     const customFormat = value => `${value.format(dateFormat)}`;
    //     return(
    //         <DatePicker onChange={(value , e) => setInputDate(moment(e)) } format={customFormat} />
    //     );

    // }


    const updateItems = () => {
        var itemsToUpdate = [];
        var selectedData = gridApi.getSelectedRows();
        console.log(selectedData);
        var data = selectedData.data;
        itemsToUpdate.push(data);
        var res = gridApi.applyTransaction({ update: itemsToUpdate });
    };

    const onCellValueChanged = (params) => {
        var colId = params.column.getId();
        if (colId === 'country') {
          var selectedCountry = params.data.country;
          var selectedCity = params.data.city;
          var allowedCities = countyToCityMap(selectedCountry);
          var cityMismatch = allowedCities.indexOf(selectedCity) < 0;
          if (cityMismatch) {
             params.node.setDataValue('city', null);
          }
        }
    };

    function onDeleteSelected(params){
        var selectedRow = params.data;
        gridApi.forEachNode(function (node){
            if(selectedRow.find(x => x == node.data)){
                gridApi.applyTransaction({delete : selectedRow});
            }
        })
    }

   return ([
        <div style = {{textAlign: 'center',marginTop:10}}>
                <Button className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={() => addItems()}>Add Items</Button>
                <Button className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={() => onRemoveSelected()}>Remove Selected</Button>
                <Button className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={() => onRemoveUnselected()}>Remove UnSelected</Button>
                <Button type="submit" className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={()=> onSubmit()}>Submit</Button>   
                
        </div>,
       <div id="myGrid" className="ag-theme-alpine"  style={{height: 280, width: 1200 , marginLeft:140 , marginTop:10 }}>
           <AgGridReact
                defaultColDef={{
                    flex: 1,
                    minWidth: 120,
                    editable: true,
                }}
              frameworkComponents = {{
                btnCellRenderer: BtnCellRenderer,
                tableDatePicker : Date,
                genderCellRenderer: GenderCellRenderer
              }}
               singleClickEdit={true}
               ref = {gridRef}
               rowData={rowData}
               rowSelection="multiple"
               animateRows={true}
               onCellValueChanged = {onCellValueChanged}
               onGridReady={onGridReady}>
               <AgGridColumn field="id"  pinned="left" resizable={true} checkboxSelection ={true} sortable={true} filter={true} style={{width: 25}} ></AgGridColumn>
               <AgGridColumn field="name" headerTooltip="Name" pinned="left" sortable={true} resizable={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="email" headerTooltip="Email" sortable={true} filter={true} resizable={true} filter="agTextColumnFilter" ></AgGridColumn>
               <AgGridColumn field="gender" sortable={true} cellRenderer="genderCellRenderer" cellEditor="agSelectCellEditor" cellEditorParams={{ values: ['Male', 'Female'] , cellHeight: 50 , cellRenderer: 'genderCellRenderer',}}/>
               <AgGridColumn field="dob" sortable={true} editable={true}  filter={true} resizable={true} filter="agTextColumnFilter" cellEditor="tableDatePicker"  ></AgGridColumn>
               <AgGridColumn field="country" sortable={true} filter={true} resizable={true} filter="agTextColumnFilter" cellEditor="agSelectCellEditor" cellEditorParams={{ cellHeight: 50, values: ['Ireland', 'USA','India'] }}></AgGridColumn>
               <AgGridColumn field="city" cellEditor="agSelectCellEditor" cellEditorParams={cellCellEditorParams} sortable={true} filter={true} resizable={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn onClick = {onDeleteSelected} editable={false} cellRenderer = "btnCellRenderer"></AgGridColumn>
           </AgGridReact>
       </div>,
       <div style={{marginLeft:140 , marginTop:20}}>
            <h6>Submitted Data</h6>
       </div>,
       <div className="ag-theme-alpine" style={{height: 280, width: 1200 , marginLeft:140 , marginTop:10}}>
        <AgGridReact
            defaultColDef={{
                flex: 1,
                minWidth: 120,
                editable: false,
            }}
            rowData={newrowData}
            rowSelection="multiple"
            onGridReady = {onGridReadyOne}
            animateRows={true}>
            <AgGridColumn field="id" filter="agNumberColumnFilter" sortable={true} editable = {false} filter={true}></AgGridColumn>
            <AgGridColumn field="name" sortable={true} editable = {false} resizable={true} filter="agTextColumnFilter"></AgGridColumn>
            <AgGridColumn field="email" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
            <AgGridColumn field="gender" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
            <AgGridColumn field="dob" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter" ></AgGridColumn>
            <AgGridColumn field="country" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
            <AgGridColumn field="city" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
        </AgGridReact>
    </div>
    ]
       
   );

   var newCount = 1;
   function createNewRowData() {

        var newData = {
            id : '',
            name : '',
            email : '',
            gender : '',
            dob : '',
            country : '',
            city : ''
        };
        newCount++;
        return newData;
    }

    function cellCellEditorParams(params) {
        var selectedCountry = params.data.country;
        var allowedCities = countyToCityMap(selectedCountry);
        return {
          values: allowedCities,
          formatValue: function (value) {
            return value + ' (' + selectedCountry + ')';
          },
        };
      }
      function countyToCityMap(match) {
        var map = {
          Ireland: ['Dublin', 'Cork', 'Galway'],
          USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
          India : ['Varanasi','Bhopal','Mumbai']
        };
        return map[match];
      }
};

export default TabelColumn;