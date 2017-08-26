# react-high-timer
A higher-order React timer component

You can replace your calls to `setTimeout(fn, 500)` with `this.props.setTimeout(fn, 500)` and everything will be properly cleaned up for you when the component unmounts.

## Installation

```sh
npm i react-high-timer
```

## Usage

```js
import * as React from 'react';
import { TimerProps, withTimer } from 'react-high-timer';

export class MyComponent extends React.Component<PropsOfMyComponent & TimerProps, {}> {
  componentDidMount() {
    this.props.setInterval(() => {
      console.log('I do not leak!');
    }, 1000);
  }
}

export default withTimer(MyComponent);
```
