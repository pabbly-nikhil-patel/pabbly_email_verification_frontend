import { useState } from 'react';

import { Box, Link, Button, TextField, Autocomplete } from '@mui/material';

import FileUpload from 'src/components/upload/upload';

export default function Upload({ setAlertState }) {
  const [listName, setListName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Home');

  const folders = [
    'None',
    'Pabbly Connect',
    'Home',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
    'Pabbly Subscription Billing',
    'Pabbly Email Marketing',
    'Pabbly Form Builder',
    'Pabbly Email Verification',
    'Pabbly Hook',
    'Client (A)',
    '- Child Folder 1 - Subscription Billing',
    '- Child Folder 2',
    '-- Grand child 1',
    '-- Grand child 2',
    '--- Folder 1',
    '--- Folder 2',
    '--- Folder 3',
    '-- Grand child 3',
    '- Child Folder 3',
    '- Child Folder 4',
  ];

  const handleListNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleFolderChange = (event, newValue) => {
    setSelectedFolder(newValue);
  };

  return (
    <Box>
      <Box>
        <TextField
          label="Email List Name"
          fullWidth
          value={listName}
          onChange={handleListNameChange}
          placeholder="Enter the name of the email list here"
          helperText={
            <span>
              Enter the name of the email list here.{' '}
              <Link
                href="https://forum.pabbly.com/threads/verify-email.26310/"
                underline="always"
                onClick={() => console.log('Learn more clicked')}
              >
                Learn more
              </Link>
            </span>
          }
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            },
            mb: '24px',
          }}
        />
        <Autocomplete
          sx={{ mb: 3 }}
          options={folders}
          getOptionLabel={(option) => option} // Changed this line
          value={selectedFolder}
          onChange={handleFolderChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Folder"
              placeholder="Choose the folder where the list should be uploaded"
              helperText={
                <span>
                  Choose the folder where the list should be uploaded.{' '}
                  <Link
                    href="https://forum.pabbly.com/threads/verify-email.26310/"
                    underline="always"
                    onClick={() => console.log('Learn more clicked')}
                  >
                    Learn more
                  </Link>
                </span>
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                },
              }}
            />
          )}
        />
        <FileUpload
          uploadInformation="Upload File OR Drag and Drop file here (Only CSV files allowed). Download  Sample File here."
          allowedFileTypes={['text/csv']}
          fileName="sample_csv.csv"
          fileErrorMessage="Please upload CSV file only."
          setAlertState={setAlertState}
        />
      </Box>
      <Box
        sx={{
          mt: 3,
          px: 3,
          pb: 3,
          pt: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            minWidth: 120,
            borderRadius: 1,
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}

