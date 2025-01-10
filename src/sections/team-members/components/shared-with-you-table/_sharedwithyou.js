import dayjs from 'dayjs';

export const SHAREDWITHYOU_STATUS_OPTIONS = [
  { value: 'revocable', label: 'Revocable' },
  { value: 'non-revocable', label: 'Non-Revocable' },
];

export const _sharedwithyou = [...Array(10)].map((_, index) => {
  const status = index % 2 === 0 ? 'revocable' : 'non-revocable';

  const emails = [
    'neeraj.agarwal@pabbly.com',
    'hardik.pradhan@pabbly.com',
    'anand.nayak@pabbly.com',
    'nikhil.patel@pabbly.com',
    'rajendra.jatav@pabbly.com',
  ];

  const permissions = [
    'Write Access',
    'Read Access',
    'Read Access',
    'Write Access',
    'Read Access',
  ];

  const folders_you_shareds = [
    'Company A Folder, Company B sub folder',
    'Company B, Company C',
    'Client A',
    'Client B',
    'Parent Folder',
    'Main Folder',
  ];

  const createdOn = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');
  const updatedAt = dayjs().subtract(index, 'day').add(2, 'hours').format('MMM DD, YYYY HH:mm:ss'); // Updated time for demonstration
  const email = emails[index % emails.length];
  const permission = permissions[index % permissions.length];
  const folders_you_shared =
    folders_you_shareds[index % folders_you_shareds.length];
  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `folder-${index}`,
    status,
    email,
    folders_you_shared,
    createdOn,
    permission,
    updatedAt,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
