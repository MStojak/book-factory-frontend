import React from 'react';
import { Card } from 'primereact/card';
import './welcome.scss';
import { Divider } from 'primereact/divider';

const Welcome = () => (
  <div className="background-welcome-anonymous min-h-screen sm:py-16 flex items-center justify-center items-center">
    <div className="w-fit flex justify-center items-center w-full relative mx-auto my-auto rounded-xl shadow-lg">
      <Card className="card-welcome-anonymous w-fit flex justify-center items-center w-full">
        <h1 className="mb-2">Hello Anonymous!</h1>
        <Divider />
        <Divider />
        <p className="mt-3">Please authenticate yourself!</p>
      </Card>
    </div>
  </div>
);

export default Welcome;
