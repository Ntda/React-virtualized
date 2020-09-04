import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { List } from 'react-virtualized/dist/commonjs/List';
import 'react-virtualized/styles.css';
import { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'
import { CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer'
import dataSource from './testData'

function App() {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50
  });
  const rowRenderer = ({ index, key, parent, style }) => {
    console.log(style)
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        {({ registerChild }) => {
          return (<div ref={registerChild} >
            <span>Title</span>
            <div>{dataSource[index]}</div>
          </div>)
        }}
      </CellMeasurer>
    )
  }
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <List
          deferredMeasurementCache={cache}
          height={400}
          width={400}
          overscanRowCount={0}
          rowCount={dataSource.length}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          scrollToIndex={dataSource.length-1} />
      )}
    </AutoSizer>
  );
}

export default App;
