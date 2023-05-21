import React, { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {
  getCoverTypeBackend,
  getProcessBackend,
  getPublisherBackend
} from '../routers/toast/CustomToast';

export interface Cover {
  id: number;
  name: string;
}

export interface Process {
  id: number;
  name: string;
  description: string;
}

export interface Publisher {
  id: number;
  name: string;
  oib: string;
}

const Constants = () => {
  const [coverTypes, setCoverTypes] = useState<Cover[]>();
  const [processTypes, setProcessTypes] = useState<Process[]>();
  const [publisherTypes, setPublisherTypes] = useState<Publisher[]>();

  const coverFields = ['id', 'name'];
  const processFields = ['id', 'name', 'description'];
  const publisherFields = ['id', 'name', 'oib'];

  useEffect(() => {
    getCoverTypeBackend().then((data: Cover[]) => {
      setCoverTypes(data);
    });
    getProcessBackend().then((data: Process[]) => {
      setProcessTypes(data);
    });
    getPublisherBackend().then((data: Publisher[]) => {
      setPublisherTypes(data);
    });
  }, []);

  const coverType = () => {
    if (coverTypes) {
      return getCovers(coverFields, 'Lista tipova korica', coverTypes);
    }
  };
  const processType = () => {
    if (processTypes) {
      return getProcesses(processFields, 'Lista tipova procesa', processTypes);
    }
  };
  const publisherType = () => {
    if (processTypes) {
      return getPublishers(publisherFields, 'Lista nakladnika', publisherTypes);
    }
  };

  function getCovers(fields: string[], title: string, value: any[]) {
    return (
      <div>
        <DataTable value={value} header={makeHeaderText(title)}>
          <Column field={fields[0]} header="#" sortable></Column>
          <Column field={fields[1]} header="Name" sortable></Column>
        </DataTable>
      </div>
    );
  }

  function getProcesses(fields: string[], title: string, value: any[]) {
    return (
      <div>
        <DataTable value={value} header={makeHeaderText(title)}>
          <Column field={fields[0]} header="#" sortable></Column>
          <Column field={fields[1]} header="Name" sortable></Column>
          <Column field={fields[2]} header="Description" sortable></Column>
        </DataTable>
      </div>
    );
  }

  function getPublishers(fields: string[], title: string, value: any[] | undefined) {
    if (value == undefined) {
      return <></>;
    }
    return (
      <div>
        <DataTable value={value} header={makeHeaderText(title)}>
          <Column field={fields[0]} header="#" sortable></Column>
          <Column field={fields[1]} header="Name" sortable></Column>
          <Column field={fields[2]} header="Oib" sortable></Column>
        </DataTable>
      </div>
    );
  }

  function makeHeaderText(label: string) {
    return (
      <div className="p-3">
        <span>{label}</span>
      </div>
    );
  }

  return (
    <>
      <div style={{ border: 'transparent' }}>
        <div className="flex flex-column justify-content-around">
          <Divider />
          <div>{coverType()}</div>
          <Divider />
          <div>{processType()}</div>
          <Divider />
          <div>{publisherType()}</div>
        </div>
      </div>
    </>
  );
};

export default Constants;
