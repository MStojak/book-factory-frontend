import React from 'react';
import { Card } from 'primereact/card';
import './welcome.scss';
import { PrintJobTable } from '../PrintJobTable';
import Constants from '../Constants';

const Welcome = () => (
  <div className="background-welcome-anonymous min-h-screen sm:py-16 flex items-center justify-center items-center">
    <div className="w-fit flex justify-center items-center w-full relative mx-auto my-auto rounded-xl shadow-lg">
      <Card className="card-welcome-anonymous w-fit flex justify-center items-center w-full">
        <PrintJobTable />
        <Constants />
      </Card>
    </div>
  </div>
);

export default Welcome;
