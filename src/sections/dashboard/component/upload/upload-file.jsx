import { useState } from 'react';

import { Box, Link, TextField, Autocomplete } from '@mui/material';

import FileUpload from 'src/components/upload/upload';

export default function Upload({ setAlertState }) {
  const [listName, setListName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Home');

  const folders = [
    'Home (0)',
    'Magnet Brains (2)',
    'Pabbly Hook (5)',
    'Pabbly Connect (10)',
    'Pabbly Subcription Billing (0)',
    'Pabbly Admin (50)',
    'Pabbly Chatflow (2)',
    'Pabbly Form Builder (0)',
    'Pabbly Email Marketing (2)',
    'Pabbly Plus (4)',
    'Trash',
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
                target="_blank"
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
                    target="_blank"
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
        {/* <FileUpload
          uploadInformation="Upload File OR Drag and Drop file here (Only CSV files allowed). Download  Sample File here."
          allowedFileTypes={['text/csv']}
          fileName="sample_csv.csv"
          fileErrorMessage="Upload Error: Please ensure you upload a valid CSV file. You can download a sample file here."
          setAlertState={setAlertState}
        /> */}
        <FileUpload
          uploadInformation="Upload File OR Drag and Drop file here (Only CSV files allowed). Download Sample File here."
          allowedFileTypes={['text/csv']}
          fileName="sample_csv.csv"
          fileErrorMessage="Upload Error: Please ensure you upload a valid CSV file. You can download a sample file here."
          setAlertState={setAlertState}
          onSampleFileClick={() => {
            // Handle sample file download here
            // e.g., window.open('/path/to/sample.csv', '_blank');
          }}
        />
      </Box>
      
    </Box>
  );
}
