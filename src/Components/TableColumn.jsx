import React from 'react';
import ReactDOM from 'react-dom';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import ColorsRenderer from './DropDown';
import Date from './Date'



const TabelColumn = () => {

   const [setRowData] = useState([]);
   const gridRef = useRef(null);
   const [gridApi, setGridApi] = useState([]);
   const [gridColumnApi, setGridColumnApi] = useState(null);
   

   const rowData = [
    {id:1, name: "test1", email: "test1@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Varansai'},
    {id:2, name: "test2", email: "test2@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Kanpur'},
    {id:3, name: "test2", email: "test3@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Lucknow'}
   ];

   var newrowData = [
        {id:1, name: "test1", email: "test1@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Varansai'},
        {id:2, name: "test2", email: "test2@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Kanpur'},
        {id:3, name: "test2", email: "test3@gmail.com", gender:'Male',dob:'22/07/2019',country:'India' , city:'Lucknow'}
    ];
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

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
        printResult(res);
    };

    const onRemoveSelected = () => {
        var selectedData = gridApi.getSelectedRows();
        var res = gridApi.applyTransaction({ remove: selectedData });
        printResult(res);
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
        printResult(res);
    };

    const onSubmit = () =>{
        var currrowData = [];
        var selectedData = gridApi.getSelectedRows();
        gridApi.forEachNode(function (node) {
            if(selectedData.find(x => x == node.data) && !newrowData.find(x => x == node.data)){
                currrowData.push(node.data);    
            } 
        });
        console.log(currrowData);
    }

   return ([
        <div style = {{textAlign: 'center',marginTop:5}}>
                <button className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={() => addItems()}>Add Items</button>
                <button className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={() => onRemoveSelected()}>Remove Selected</button>
                <button className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={() => onRemoveUnselected()}>Remove UnSelected</button>
                <button type="submit" className = "btn btn-outline-primary" style = {{marginLeft:5 , marginRight:5}} onClick={()=> onSubmit()}>Submit</button>   
        </div>,
       <div className="ag-theme-alpine" style={{height: 300, width: 1000 , marginLeft:140 , marginTop:10}}>
           <AgGridReact
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    editable: true,
                }}
               singleClickEdit={true}
               ref = {gridRef}
               rowData={rowData}
               components={{ datePicker: <Date /> }}
               rowSelection="multiple"
               animateRows={true}
               onGridReady={onGridReady}>
               <AgGridColumn field="id" checkboxSelection ={true} sortable={true} filter={true}></AgGridColumn>
               <AgGridColumn field="name" sortable={true} resizable={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="email" sortable={true} filter={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="gender" sortable={true} filter={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="dob" sortable={true} filter={true} filter="agTextColumnFilter" cellEditor="datePicker"></AgGridColumn>
               <AgGridColumn field="country" sortable={true} filter={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="city" sortable={true} filter={true} filter="agTextColumnFilter"></AgGridColumn>
           </AgGridReact>
       </div>,
       <div style={{marginLeft:140 , marginTop:10}}>
            <h6>Submitted Data</h6>
       </div>,
       <div className="ag-theme-alpine" style={{height: 300, width: 1000 , marginLeft:140 , marginTop:10}}>
           <AgGridReact
                defaultColDef={{
                    flex: 1,
                    minWidth: 80,
                    editable: false,
                }}
               rowData={newrowData}
               rowSelection="multiple"
               animateRows={true}>
               <AgGridColumn field="id" checkboxSelection ={true} sortable={true} editable = {false} filter={true}></AgGridColumn>
               <AgGridColumn field="name" sortable={true} editable = {false} resizable={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="email" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="gender" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="dob" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter" ></AgGridColumn>
               <AgGridColumn field="country" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
               <AgGridColumn field="city" sortable={true} editable = {false} filter={true} filter="agTextColumnFilter"></AgGridColumn>
           </AgGridReact>
       </div>,

    ]
       
   );

   var newCount = 1;
   function createNewRowData() {
        var newData = {
            id : 'id',
            name : 'name',
            email : 'email',
            gender : 'gender',
            dob : 'date',
            country : 'country',
            city : 'city'
        };
        newCount++;
        return newData;
    }

    function printResult(res) {
        console.log('---------------------------------------');
        if (res.add) {
        res.add.forEach(function (rowNode) {
            console.log('Added Row Node', rowNode);
        });
        }
        if (res.remove) {
        res.remove.forEach(function (rowNode) {
            console.log('Removed Row Node', rowNode);
        });
        }
        if (res.update) {
        res.update.forEach(function (rowNode) {
            console.log('Updated Row Node', rowNode);
        });
        }
    }

  
};

export default TabelColumn;