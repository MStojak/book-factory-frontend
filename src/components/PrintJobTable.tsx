import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import 'primeflex/primeflex.css';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { toast } from 'react-toastify';

interface Publisher {
  id: number;
  name: string;
  oib: string;
}

interface PrintJob {
  id: number;
  bookTitle: string;
  writerName: string;
  publisherId: number;
  pageNumber: number;
  coverTypeId: number;
  editionNumber: number;
  description: string;
  startDate: Date;
  deadline: Date;
  archive: boolean;
}

export const PrintJobTable: React.FC = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher | null>(null);
  const [printJobs, setPrintJobs] = useState<PrintJob[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [printJob, setPrintJob] = useState<PrintJob | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/publishers')
      .then((response) => response.json())
      .then((data) => setPublishers(data));
    fetch('http://localhost:8080/api/printJobs')
      .then((response) => response.json())
      .then((data) => setPrintJobs(data));
  }, []);

  useEffect(() => {
    if (selectedPublisher) {
      fetch(`http://localhost:8080/api/printJobs?publisherId=${selectedPublisher.id}`)
        .then((response) => response.json())
        .then((data) => setPrintJobs(data));
    }
  }, [selectedPublisher]);

  const handlePublisherChange = (e: { value: Publisher }) => {
    setSelectedPublisher(e.value);
    setEditingPublisher(e.value);
  };
  // Function to handle the edit click
  const handleEditClick = (rowData: PrintJob) => {
    setIsEditing(true);
    setPrintJob(rowData);
    setDialogVisible(true);
  };

  // Function to handle the delete click
  const handleDeleteClick = (rowData: PrintJob) => {
    fetch(`http://localhost:8080/api/printJobs/${rowData.id}`, {
      method: 'DELETE'
    }).then(() => {
      setPrintJobs(printJobs.filter((job) => job.id !== rowData.id));
    });
  };

  // Function to handle the form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/printJobs${isEditing ? `/${printJob?.id}` : ''}`, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(printJob)
    })
      .then((response) => {
        if (response.status != 200) {
          console.log('AO');
          setDialogVisible(false);
          toast.promise(response.json(), {
            pending: 'Učitavanje...',
            success: 'Uspješno!',
            error: 'Dogodila se pogreška, kontaktirajte administratora.'
          });
          return undefined;
        }
        const res = response.json();
        toast.promise(res, {
          pending: 'Učitavanje...',
          success: 'Uspješno!',
          error: 'Dogodila se pogreška, kontaktirajte administratora.'
        });
        return res;
      })
      .then((data) => {
        if (data == undefined) {
          console.log('AO');
          return;
        } else if (isEditing) {
          setPrintJobs(printJobs.map((job) => (job.id === data.id ? data : job)));
        } else {
          setPrintJobs([...printJobs, data]);
        }
        //setDialogVisible(false);
        setIsEditing(false);
      });
    setDialogVisible(false);
  };

  // Action body template for edit and delete buttons
  const actionBodyTemplate = (rowData: PrintJob) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => handleEditClick(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => handleDeleteClick(rowData)}
        />
      </>
    );
  };

  const updatePrintJob = (key: keyof PrintJob, value: any) => {
    if (printJob) {
      setPrintJob({
        ...printJob,
        [key]: value
      });
    }
  };

  const publisherTemplate = (publisher: Publisher) => {
    return (
      <Card title={`Publisher: ${publisher.name}`} className="p-mb-4 " style={{ width: '20vw' }}>
        <form onSubmit={handlePublisherSubmit} className="p-fluid">
          <div className="p-grid">
            <div className="p-field p-col-12 p-md-4">
              <label htmlFor="name">
                <b>Name:</b>
              </label>
            </div>
            <div className="p-field p-col-12 p-md-8">
              <InputText
                id="name"
                value={editingPublisher ? editingPublisher.name : ''}
                onChange={(e) =>
                  setEditingPublisher({ ...editingPublisher, name: e.target.value } as Publisher)
                }
              />
            </div>
            <div className="p-field p-col-12 p-md-4">
              <label htmlFor="oib">
                <b>OIB:</b>
              </label>
            </div>
            <div className="p-field p-col-12 p-md-8">
              <InputText
                id="oib"
                value={editingPublisher ? editingPublisher.oib : ''}
                onChange={(e) =>
                  setEditingPublisher({ ...editingPublisher, oib: e.target.value } as Publisher)
                }
              />
            </div>
            <div className="p-field p-col-12">
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </Card>
    );
  };

  const handlePublisherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPublisher) return;
    await fetch(`http://localhost:8080/api/publishers/${editingPublisher?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingPublisher)
    });
    // Refresh the publishers list
    const publishersResponse = await fetch('http://localhost:8080/api/publishers');
    const publishersData = await publishersResponse.json();
    setPublishers(publishersData);
    // Select the updated publisher in the dropdown
    setSelectedPublisher(publishersData.find((p: Publisher) => p.id === editingPublisher.id));
    // Fetch the printJobs for the updated publisher
    const jobsResponse = await fetch(
      `http://localhost:8080/api/printJobs?publisherId=${editingPublisher.id}`
    );
    const jobsData = await jobsResponse.json();
    setPrintJobs(jobsData);
  };

  return (
    <div>
      <div className="p-grid">
        <div className="p-col-12 p-md-6">
          <label htmlFor="publisher">Publisher </label>
          <Dropdown
            id="publisher"
            optionLabel="name"
            options={publishers}
            value={selectedPublisher}
            onChange={handlePublisherChange}
            placeholder="Select a Publisher"
          />
        </div>
      </div>

      {selectedPublisher && publisherTemplate(selectedPublisher)}

      <Button
        icon="pi pi-plus"
        className="p-button-success p-mb-2"
        onClick={() => {
          setIsEditing(false);
          setPrintJob({
            id: 0,
            bookTitle: '',
            writerName: '',
            publisherId: 0,
            pageNumber: 0,
            coverTypeId: 0,
            editionNumber: 0,
            description: '',
            startDate: new Date(),
            deadline: new Date(),
            archive: false
          });
          setDialogVisible(true);
        }}
      />

      <DataTable value={printJobs}>
        <Column field="bookTitle" header="Book Title" />
        <Column field="writerName" header="Writer Name" />
        <Column field="publisherId" header="Publisher Id" />
        <Column field="pageNumber" header="Page Number" />
        <Column field="coverTypeId" header="Cover Type Id" />
        <Column field="editionNumber" header="Edition Number" />
        <Column field="description" header="Description" />
        <Column field="startDate" header="Start Date" />
        <Column field="deadline" header="Deadline" />
        <Column field="archive" header="Archive" />
        <Column body={actionBodyTemplate} />
      </DataTable>

      <Dialog
        header="Print Job Details"
        visible={dialogVisible}
        style={{ width: '30vw' }}
        onHide={() => {
          setDialogVisible(false);
        }}>
        <form onSubmit={handleFormSubmit} className="p-fluid">
          <div className="p-grid">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="bookTitle">Book Title</label>
              <InputText
                id="bookTitle"
                value={printJob ? printJob.bookTitle : ''}
                onChange={(e) => updatePrintJob('bookTitle', e.target.value)}
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="writerName">Writer Name</label>
              <InputText
                id="writerName"
                value={printJob ? printJob.writerName : ''}
                onChange={(e) => updatePrintJob('writerName', e.target.value)}
              />
            </div>

            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="publisherId">Publisher Id</label>
              <InputText
                id="publisherId"
                value={printJob ? printJob.publisherId?.toString() : ''}
                onChange={(e) => updatePrintJob('publisherId', Number(e.target.value))}
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="pageNumber">Page Number</label>
              <InputText
                id="pageNumber"
                value={printJob ? printJob.pageNumber?.toString() : ''}
                onChange={(e) => updatePrintJob('pageNumber', Number(e.target.value))}
              />
            </div>

            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="coverTypeId">Cover Type Id</label>
              <InputText
                id="coverTypeId"
                value={printJob ? printJob.coverTypeId?.toString() : ''}
                onChange={(e) => updatePrintJob('coverTypeId', Number(e.target.value))}
              />
            </div>
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="editionNumber">Edition Number</label>
              <InputText
                id="editionNumber"
                value={printJob ? printJob.editionNumber?.toString() : ''}
                onChange={(e) => updatePrintJob('editionNumber', Number(e.target.value))}
              />
            </div>

            <div className="p-field p-col-12">
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={printJob ? printJob.description : ''}
                onChange={(e) => updatePrintJob('description', e.target.value)}
              />
            </div>

            {isEditing ? (
              <>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="startDate">Start Date</label>
                  <InputText
                    id="startDate"
                    name="startDate"
                    value={printJob ? printJob.startDate.toString() : new Date().toString()}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="deadline">Deadline</label>
                  <InputText
                    id="deadline"
                    name="deadline"
                    value={printJob ? printJob.deadline.toString() : new Date().toString()}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="startDate">Start Date</label>
                  <Calendar
                    id="startDate"
                    name="startDate"
                    value={printJob ? printJob.startDate : new Date()}
                    onChange={(e) => updatePrintJob('startDate', e.target.value)}
                    showTime
                    appendTo={document.body}
                  />
                </div>
                <div className="p-field p-col-12 p-md-6">
                  <label htmlFor="deadline">Deadline</label>
                  <Calendar
                    id="deadline"
                    name="deadline"
                    value={printJob ? printJob.deadline : new Date()}
                    onChange={(e) => updatePrintJob('deadline', e.target.value)}
                    showTime
                    appendTo={document.body}
                  />
                </div>
              </>
            )}
            <br />
            <div className="p-field p-col-12">
              <label htmlFor="archive">Archive</label>
              <Checkbox
                id="archive"
                checked={printJob ? printJob.archive : false}
                onChange={(e) => updatePrintJob('archive', e.checked || false)}
              />
            </div>
          </div>
          <br />
          <Button type="submit">Save</Button>
        </form>
      </Dialog>
    </div>
  );
};
