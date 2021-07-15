import React, { useState, Component } from 'react';
import RocketCore from './RocketCore';

export function FunctionalRocket() {
  const [initialLaunchTime] = useState(0);

  return <RocketCore initialLaunchTime={initialLaunchTime} />;
}

export class ClassRocket extends Component {
  constructor() {
    super();

    this.state = {
      initialLaunchTime: 0
    };
  }

  render() {
    const { initialLaunchTime } = this.state;

    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}
