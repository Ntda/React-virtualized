import React, { useMemo, useLayoutEffect, useRef, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { List } from 'react-virtualized/dist/commonjs/List';
import 'react-virtualized/styles.css';
import { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'
import { CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer';
import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer'
import { Scrollbars } from 'react-custom-scrollbars';
import dataSource from './testData';


class AppFunc extends Component {
  constructor(props) {
    super(props);
    this.messagesEnd = React.createRef();
  }

  list = React.createRef();
  scrollbars = React.createRef();
  cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 50
  });
  handleScroll = e => {
    console.log('handle scroll')
    const { scrollTop } = e.target;
    const { Grid } = this.list.current;
    Grid.handleScrollEvent({ scrollTop });
  };

  rowRenderer = ({ index, key, parent, style }) => {
    console.log(style)
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}>
        {({ registerChild }) => {
          return (<div ref={registerChild} className='abc' style={style}>
            <span>{index}</span>
            <div>{dataSource[index]}</div>
          </div>)
        }}
      </CellMeasurer>
    )
  }

  scrollToBottom = () => {
    console.log(this.messagesEnd)
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
   this.list.current.scrollToRow(10)
  }

  render() {
    return (
      <Scrollbars
      onScroll={this.handleScroll}
      style={{ height:400, width:400 }}
      ref={this.msgsScrollbars}
    >
      <List
        className='list'
        deferredMeasurementCache={this.cache}
        height={400}
        width={400}
        scrollToAlignment='end'
        overscanRowCount={0}
        rowHeight={this.cache.rowHeight}
        rowRenderer={this.rowRenderer}
        style={{ overflowX: false, overflowY: false }}
        ref={this.list}
        rowCount={dataSource.length}
      />
    </Scrollbars>)
  };
}

export default AppFunc;
