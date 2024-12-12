import { Box } from '@mui/material';

import FileUpload from 'src/components/upload/upload';
import { CustomDialog } from 'src/components/custom-dialog/custom-dialog';

export default function UploadDialog({ addDialogOpen, handleDialogClose, action }) {
  return (
    <CustomDialog
      open={addDialogOpen}
      onClose={handleDialogClose}
      title="Upload CSV File for Email Verification"
      content={
        <Box display="flex" flexDirection="column" gap={2}>
          <FileUpload
            uploadInformation="Upload File OR Drag and Drop file here (Only CSV files allowed). Download  Sample File here."
            allowedFileTypes={['text/csv']}
            fileName="sample_csv.csv"
            fileErrorMessage="Please upload CSV file only."
          />
        </Box>
      }
      action={action}
    />
  );
}
