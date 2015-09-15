import {KeyMap} from './key-map';
import {Row} from './row';
import {Column} from './column';

export class SpreadsheetModel{

    rows:Array<Row>;
    current:Column;
    start:number;
    end:number;

    colStart:number;
    colEnd:number;
    
    constructor(public rowCount, public columnCount, maxRowCount, maxColCount){

        this.rows = [];
        
        this.start = 0;
        this.end = rowCount;
        
        this.colStart = 0;
        this.colEnd = columnCount;

        for(let i = 0; i < maxRowCount; i++){
            this.rows.push(new Row(i, maxColCount));
        }

        this.current = this.rows[0].columns[0];
    }



    
    selectColumn(col){
        this.current = col;
    }

    navigate(keyCode){

        const navDirection = KeyMap.getNavigationDirection(keyCode);

        if(navDirection.down){
            this.ensureRow();
            this.ensureCol();
  
            this.current = this.rows[this.current.rowIndex + 1].columns[this.current.columnIndex];
            this.adjustRowRangeDownward();
        }
        if(navDirection.up){
            this.ensureCol();
            if(this.current.rowIndex === 0){
                return;
            }
            this.current = this.rows[this.current.rowIndex - 1].columns[this.current.columnIndex];
            this.adjustRowRangeUpward();
        }
        if(navDirection.left){
            this.ensureCol();
            if(this.current.columnIndex === 0){
                return;
            }
            this.current = this.rows[this.current.rowIndex].columns[this.current.columnIndex - 1];
            this.adjustColRangeLeft();
        }
        if(navDirection.right){
            this.ensureRow();
            this.ensureCol();
             /*
            if(this.current.columnIndex === this.columnCount - 1){
                return;
            }*/
            this.current = this.rows[this.current.rowIndex].columns[this.current.columnIndex + 1];
            this.adjustColRangeRight();
        }
    }

    adjustRowRangeUpward(){
        if(this.current.rowIndex < this.start){
            this.shiftRowsBy(-1);
        }
    }

    adjustRowRangeDownward(){
        if(this.current.rowIndex === this.end){
            this.shiftRowsBy(1);
        }
    }
    
    adjustColRangeLeft(){
        if(this.current.columnIndex < this.colStart){
            this.shiftColsBy(-1);
        }
    }

    adjustColRangeRight(){
        if(this.current.columnIndex === this.colEnd){
            this.shiftColsBy(1);
        }
    }

    shiftRowsBy(offset){
        this.start = this.start + offset;
        this.end = this.end + offset;
    }

    ensureRow(){
        if(this.current.rowIndex + 1 >= this.rows.length){
            this.rows.push(new Row(this.current.rowIndex + 1,this.columnCount));
        }
    }
    
    shiftColsBy(offset){
        this.colStart = this.colStart + offset;
        this.colEnd = this.colEnd + offset;
    }
    
    ensureCol(){
            
        for(let i = this.start; i < this.end; i++) {
            let columnIndex = this.current.columnIndex + 1;
            while (columnIndex >= this.rows[i].columns.length){
                this.rows[i].columns.push(new Column( this.rows[i].columns.length, i));
            }
        }

    }

}



