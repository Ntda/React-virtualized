import React from 'react';
import PropTypes from 'prop-types';
import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer'
import { Column, Table } from 'react-virtualized/dist/commonjs/Table';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer'
import dataSource from './testData';

const TableVirtualized = () => {
    const cache = new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 20,
    });

    const columnCellRenderer = ({ dataKey, parent, rowIndex, style }) => {
        return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={dataKey}
                parent={parent}
                rowIndex={rowIndex}>
                {({ registerChild }) => {
                    return (
                        <div ref={registerChild} className='abc' style={{
                            whiteSpace: 'normal',
                            width: 700
                        }}><span>Index: {rowIndex}</span>
                            <div>{dataSource[rowIndex]}</div>
                        </div>
                    )
                }}
            </CellMeasurer>
        )
    }

    const rowGetter = ({ index }) => dataSource[index];
    cache.clearAll();

    const headerRenderer = ({
        columnData,
        dataKey,
        disableSort,
        label,
        sortBy,
        sortDirection
    }) => {
        return (
            <div className='header'>
                Dynamic text
                <span>Icon</span>
            </div>
        )
    }
    return (
        <AutoSizer disableHeight>
            {({ width }) => (
                <Table
                    deferredMeasurementCache={cache}
                    headerHeight={20}
                    height={500}
                    overscanRowCount={2}
                    rowHeight={cache.rowHeight}
                    rowGetter={rowGetter}
                    width={width}
                    rowCount={dataSource.length}>
                    <Column
                        dataKey="name"
                        label="Name"
                        width={width - 20}
                    />
                    <Column
                        dataKey="color"
                        headerRenderer={headerRenderer}
                        width={width - 20}
                        cellRenderer={columnCellRenderer}
                    />
                    <Column
                        width={width - 20}
                        dataKey='random'
                        headerRenderer={headerRenderer}
                        label='Dynamic text'
                        cellRenderer={columnCellRenderer} />

                </Table>
            )}
        </AutoSizer>
    );
};

TableVirtualized.propTypes = {

};

export default TableVirtualized;