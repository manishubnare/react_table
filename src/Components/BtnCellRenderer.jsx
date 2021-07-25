import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import green from "@material-ui/core/colors/green";

class BtnCellRenderer extends Component {
    constructor(props) {
      super(props);
      this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
      this.setState(this.props.value);
    }

    buttonClick = (e) => {
        this.setState({
            visible:true
        })
        let deletedRow = this.props.node.data;
        e.gridApi.updateRowData({ remove: [deletedRow] })
     };

    render() {
      return (
        <DeleteOutlinedIcon style={{color:"red"}} onClick = {() => this.buttonClick(this.props.node)} ></DeleteOutlinedIcon>
      )
    }
}

export default BtnCellRenderer;