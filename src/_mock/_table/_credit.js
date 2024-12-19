import { _mock } from '../_mock';

// ----------------------------------------------------------------------

export const CREDIT_STATUS_OPTIONS = [
  { value: 'completed', label: 'Completed' },
  { value: 'processing', label: 'Processing' },
  { value: 'unprocessed', label: 'Unprocessed' },
];

export const _credit = [...Array(2)].map(( index) => {
  const status = index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'processing' : 'unprocessed';


  return {
    id: _mock.id(index),
    createdAt: _mock.time(index),

    status,
  };
});
