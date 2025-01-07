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

  const workflows_folders_you_shareds = [
    'Client (A), Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment or Add Lead in Salesforce on New Google Form Submission,  Create Invoice in QuickBooks after Stripe Payment, Update Customer in Hubspot on New Sale in Shopify',
    'Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment or Add Lead in Salesforce on New Google Form Submission',
    'Main Folder, Add Student in Uteach Course and Subscriber in Convertkit on Thrivecart Payment or Add Lead in Salesforce on New Google Form Submission,  Create Invoice in QuickBooks after Stripe Payment, Update Customer in Hubspot on New Sale in Shopify',
    'Create Invoice in QuickBooks after Stripe Payment',
    'Update Customer in Hubspot on New Sale in Shopify',
    'Main Folder',
  ];

  const createdOn = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');
  const updatedAt = dayjs().subtract(index, 'day').add(2, 'hours').format('MMM DD, YYYY HH:mm:ss'); // Updated time for demonstration
  const email = emails[index % emails.length];
  const workflows_folders_you_shared =
    workflows_folders_you_shareds[index % workflows_folders_you_shareds.length];
  const createdAt = dayjs().subtract(index, 'day').format('MMM DD, YYYY HH:mm:ss');

  return {
    id: `workflow-${index}`,
    status,
    email,
    workflows_folders_you_shared,
    createdOn,
    updatedAt,
    totalQuantity: (index + 1) * 5,
    createdAt,
  };
});
