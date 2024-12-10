import { folderItems } from 'src/utils/folderutilityfunction';

import { LABELS } from './_folderLables';

export const HOMEITEMS = folderItems([{ id: '25', label: LABELS.home, children: [] }]);

export const ITEMS = folderItems([
  { id: '0', label: LABELS.companyb, children: [] },
  {
    id: '1',
    label: LABELS.mainFolder,
    children: [
      { id: '2', label: LABELS.whastappDatabase },
      {
        id: '3',
        label: LABELS.childFolder2,
        children: [
          { id: '6', label: LABELS.grandChild1 },
          {
            id: '7',
            label: LABELS.grandChild2,
            children: [
              { id: '9', label: LABELS.folder1 },
              { id: '10', label: LABELS.folder2 },
              { id: '11', label: LABELS.folder3 },
            ],
          },
          { id: '8', label: LABELS.grandChild3 },
        ],
      },
      { id: '4', label: LABELS.childFolder3 },
      { id: '5', label: LABELS.childFolder4 },
    ],
  },
  { id: '12', label: LABELS.pabblySubscriptionBilling, children: [] },
  { id: '13', label: LABELS.pabblyEmailMarketing, children: [] },
  { id: '14', label: LABELS.pabblyFormBuilder, children: [] },
  { id: '15', label: LABELS.pabblyEmailVerification, children: [] },
  { id: '16', label: LABELS.pabblyHook, children: [] },
  {
    id: '17',
    label: LABELS.clientA,
    children: [
      {
        id: '19',
        label: LABELS.childFolder1Client,
        children: [
          { id: '20', label: LABELS.grandChild1Client },
          {
            id: '21',
            label: LABELS.grandChild2Client,
            children: [
              { id: '22', label: LABELS.folder1 },
              { id: '23', label: LABELS.folder2 },
            ],
          },
        ],
      },
    ],
  },
]);

export const ITEMS2 = folderItems([{ id: '24', label: LABELS.trash, children: [] }]);
