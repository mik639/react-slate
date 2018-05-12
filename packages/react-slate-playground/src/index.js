import React from 'react';
import path from 'path';
import { renderToTerminal, View } from '@react-slate/core';
import { ScrollableView } from '@react-slate/interactive';
import {
  hideCursor,
  clearScrollbackOnExit,
  overwriteConsole,
} from '@react-slate/utils';
import throttle from 'lodash.throttle';
// import App from './App';

overwriteConsole({
  outStream: path.join(__dirname, '../node_modules/.artifacts/stdout.log'),
  errStream: path.join(__dirname, '../node_modules/.artifacts/stderr.log'),
});
hideCursor(process.stdout);
clearScrollbackOnExit(process.stdout);

const App = () => (
  <ScrollableView height={5}>
    <View>1</View>
    <View>2</View>
    <View>3</View>
    <View>4</View>
    <View>5</View>
    <View>6</View>
    <ScrollableView height={5}>
      <View>A1</View>
      <View>B2</View>
      <View>C3</View>
      <View>D4</View>
      <View>E5</View>
      <View>F6</View>
      <View>G7</View>
      <View>H8</View>
      <View>I9</View>
      <View>J10</View>
      <View>K11</View>
      <View>L12</View>
      <View>M13</View>
    </ScrollableView>
    <View>7</View>
    <View>8</View>
    <View>9</View>
    <View>10</View>
    <View>11</View>
    <View>12</View>
    <View>13</View>
  </ScrollableView>
);

renderToTerminal(<App />, process.stdout);

process.on(
  'resize',
  throttle(() => {
    renderToTerminal(<App />, process.stdout);
  }, 100)
);
