var key_map_1 = require('./key-map');
var row_1 = require('./row');
var column_1 = require('./column');
var SpreadsheetModel = (function () {
    function SpreadsheetModel(rowCount, columnCount, maxRowCount, maxColCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.rows = [];
        this.start = 0;
        this.end = rowCount;
        this.colStart = 0;
        this.colEnd = columnCount;
        for (var i = 0; i < maxRowCount; i++) {
            this.rows.push(new row_1.Row(i, maxColCount));
        }
        this.current = this.rows[0].columns[0];
    }
    SpreadsheetModel.prototype.selectColumn = function (col) {
        this.current = col;
    };
    SpreadsheetModel.prototype.navigate = function (keyCode) {
        var navDirection = key_map_1.KeyMap.getNavigationDirection(keyCode);
        if (navDirection.down) {
            this.ensureRow();
            this.ensureCol();
            this.current = this.rows[this.current.rowIndex + 1].columns[this.current.columnIndex];
            this.adjustRowRangeDownward();
        }
        if (navDirection.up) {
            this.ensureCol();
            if (this.current.rowIndex === 0) {
                return;
            }
            this.current = this.rows[this.current.rowIndex - 1].columns[this.current.columnIndex];
            this.adjustRowRangeUpward();
        }
        if (navDirection.left) {
            this.ensureCol();
            if (this.current.columnIndex === 0) {
                return;
            }
            this.current = this.rows[this.current.rowIndex].columns[this.current.columnIndex - 1];
            this.adjustColRangeLeft();
        }
        if (navDirection.right) {
            this.ensureRow();
            this.ensureCol();
            /*
           if(this.current.columnIndex === this.columnCount - 1){
               return;
           }*/
            this.current = this.rows[this.current.rowIndex].columns[this.current.columnIndex + 1];
            this.adjustColRangeRight();
        }
    };
    SpreadsheetModel.prototype.adjustRowRangeUpward = function () {
        if (this.current.rowIndex < this.start) {
            this.shiftRowsBy(-1);
        }
    };
    SpreadsheetModel.prototype.adjustRowRangeDownward = function () {
        if (this.current.rowIndex === this.end) {
            this.shiftRowsBy(1);
        }
    };
    SpreadsheetModel.prototype.adjustColRangeLeft = function () {
        if (this.current.columnIndex < this.colStart) {
            this.shiftColsBy(-1);
        }
    };
    SpreadsheetModel.prototype.adjustColRangeRight = function () {
        if (this.current.columnIndex === this.colEnd) {
            this.shiftColsBy(1);
        }
    };
    SpreadsheetModel.prototype.shiftRowsBy = function (offset) {
        this.start = this.start + offset;
        this.end = this.end + offset;
    };
    SpreadsheetModel.prototype.ensureRow = function () {
        if (this.current.rowIndex + 1 >= this.rows.length) {
            this.rows.push(new row_1.Row(this.current.rowIndex + 1, this.columnCount));
        }
    };
    SpreadsheetModel.prototype.shiftColsBy = function (offset) {
        this.colStart = this.colStart + offset;
        this.colEnd = this.colEnd + offset;
    };
    SpreadsheetModel.prototype.ensureCol = function () {
        for (var i = this.start; i < this.end; i++) {
            var columnIndex = this.current.columnIndex + 1;
            while (columnIndex >= this.rows[i].columns.length) {
                this.rows[i].columns.push(new column_1.Column(this.rows[i].columns.length, i));
            }
        }
    };
    return SpreadsheetModel;
})();
exports.SpreadsheetModel = SpreadsheetModel;
