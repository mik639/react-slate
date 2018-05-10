/* @flow */

import React, { type Element } from 'react';
import { View } from '@react-slate/core';
import { startIoCapture, stopIoCapture, ioHook } from '../io';

type Props = {
  children: Element<*>,
  height: number,
};

type State = {
  index: number,
};

export default class ScrollableView extends React.Component<Props, State> {
  contentHeight: number = 0;
  state: State = {
    index: 0,
  };

  onScroll = ({
    rotation,
    direction,
  }: {
    rotation: number,
    direction: number,
  }) => {
    if (direction === 3) {
      this.setState(state => {
        let index = state.index + rotation;
        index = index < 0 ? 0 : index;
        index =
          index + this.props.height > this.contentHeight
            ? this.contentHeight - this.props.height
            : index;
        return {
          index,
        };
      });
    }
  };

  customRender = (instance: *, relativeCanvas: *, absoluteCanvas: *) => {
    const renderResults = instance.nativeRender(relativeCanvas, absoluteCanvas);
    const { height } = this.props;
    const { index } = this.state;
    this.contentHeight = renderResults.canvas.length;
    renderResults.canvas = renderResults.canvas.slice(index, height + index);
    return renderResults;
  };

  componentDidMount() {
    startIoCapture();
    if (ioHook()) {
      ioHook().addListener('mousewheel', this.onScroll);
    }
  }

  componentWillUnmount() {
    stopIoCapture();
    if (ioHook()) {
      ioHook().removeListener('mousewheel', this.onScroll);
    }
  }

  render() {
    return <View render={this.customRender}>{this.props.children}</View>;
  }
}
