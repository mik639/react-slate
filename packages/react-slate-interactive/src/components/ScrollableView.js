/* @flow */

import React, { type Element } from 'react';
import { View } from '@react-slate/core';
import {
  startIoCapture,
  stopIoCapture,
  addIoEventListener,
  removeIoEventListener,
} from '../io';

type Props = {
  children: Element<*>,
  height: number,
  inverted?: boolean,
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
        let index = state.index + (this.props.inverted ? -1 : 1) * rotation;
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
    addIoEventListener('mousewheel', this.onScroll);
  }

  componentWillUnmount() {
    stopIoCapture();
    removeIoEventListener('mousewheel', this.onScroll);
  }

  render() {
    return <View render={this.customRender}>{this.props.children}</View>;
  }
}
