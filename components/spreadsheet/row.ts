import {Column} from './column';

export class Row{

    columns:Array<Column>;
    start:number;
    end:number;

    constructor(public rowIndex, public columnCount){
        
        /*
        this.columns = [];

        for(let j = 0; j < this.columnCount; j++){
            this.columns.push(new Column(j,this.rowIndex));
        }
        */
        
        this.columns = [];
        this.start = 0;
        this.end = columnCount;

        for(let i = 0; i < this.columnCount; i++){

            this.columns.push(new Column(i,this.rowIndex));
        }

    }
    
    
 
}