import { toast } from 'react-toastify';
import { Cover, Process, Publisher } from '../../components/Constants';

export function getPromise(response: any) {
  return toast.promise(response, {
    pending: 'Učitavanje...',
    success: 'Uspješno!',
    error: 'Dogodila se pogreška, kontaktirajte administratora.'
  });
}

export function getCoverTypeBackend() {
  const response = fetch('http://localhost:8080/api/coverTypes')
    .then((response) => response.json())
    .then((data: Cover[]) => {
      return data;
    });
  toast.promise(response, {
    pending: 'Učitavanje...',
    success: 'Uspješno!',
    error: 'Dogodila se pogreška, kontaktirajte administratora.'
  });

  return response;
}

export function getProcessBackend() {
  const response = fetch('http://localhost:8080/api/processes')
    .then((response) => response.json())
    .then((data: Process[]) => {
      return data;
    });

  return response;
}

export function getPublisherBackend() {
  const response = fetch('http://localhost:8080/api/publishers')
    .then((response) => response.json())
    .then((data: Publisher[]) => {
      return data;
    });

  return response;
}
