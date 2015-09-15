var column_1 = require('./column');
var Row = (function () {
    function Row(rowIndex, columnCount) {
        /*
        this.columns = [];

        for(let j = 0; j < this.columnCount; j++){
            this.columns.push(new Column(j,this.rowIndex));
        }
        */
        this.rowIndex = rowIndex;
        this.columnCount = columnCount;
        this.columns = [];
        this.start = 0;
        this.end = columnCount;
        for (var i = 0; i < this.columnCount; i++) {
            this.columns.push(new column_1.Column(i, this.rowIndex));
        }
    }
    return Row;
})();
exports.Row = Row;
