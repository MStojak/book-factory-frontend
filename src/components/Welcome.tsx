import React from 'react';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import '../styles/themes/book-factory-theme/theme.css';
import './Welcome.scss';

const Welcome = () => {
  const pozz = () => {
    console.log('Disi pizdo');
  };
  return (
    <div
      style={{ paddingTop: '5rem', background: 'transparent' }}
      className="flex items-center justify-content-center text-center">
      <div
        className="flex items-center justify-content-center items-center "
        style={{ background: 'transparent' }}>
        <Card className="flex justify-content-center">
          <h1 className="mb-2">Hello Anonymous!</h1>
          <Divider />
          <Divider />
          <p className="mt-3">Please authenticate yourself!</p>
          <Button
            className="btn-welcome-anonymous mt-3"
            label="DisiDisi"
            onClick={() => pozz()}></Button>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
