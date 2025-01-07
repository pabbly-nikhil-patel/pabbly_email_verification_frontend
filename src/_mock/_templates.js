// import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const TEMPLATES_STATUS_OPTIONS = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'draft', label: 'Draft' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'deleted', label: 'Deleted' },
];

export const _templates = [...Array(20)].map((index) => {
  const statuses = ['approved', 'pending', 'draft', 'rejected', 'deleted'];
  const status = statuses[index % 5];

  return {
    status,
  };
});
