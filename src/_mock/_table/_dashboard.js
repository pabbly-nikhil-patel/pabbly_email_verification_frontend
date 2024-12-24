import { _mock } from '../_mock';

// ----------------------------------------------------------------------

export const DASHBOARD_STATUS_OPTIONS = [
  { value: 'completed', label: 'Completed', tooltip: 'All completed lists.' },
  { value: 'processing', label: 'Processing', tooltip: 'All processing lists.' },
  { value: 'unprocessed', label: 'Unprocessed', tooltip: 'All unprocessed lists.' },
];

export const _dashboard = [...Array(20)].map((_, index) => {
  const status = index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'processing' : 'unprocessed';

  const uploadedList = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: '192.158.1.38',
  };

  return {
    id: _mock.id(index),
    createdAt: _mock.time(index),
    uploadedList,
    status,
  };
});
