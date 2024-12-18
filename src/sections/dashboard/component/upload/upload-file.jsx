import { Box, Card, Divider, Tooltip, CardHeader, Typography, CardContent } from '@mui/material';

import FileUpload from 'src/components/upload/upload';

export default function Upload({ setAlertState }) {
  return (
    <Card>
      <CardHeader
        sx={{ pb: 3 }}
        title={
          <Box display="inline-block">
            <Tooltip
              title="Upload a list of email addresses in CSV format to check them all at once"
              arrow
              placement="top"
            >
              <Typography variant="h6">Upload CSV File for Email Verification </Typography>
            </Tooltip>
          </Box>
        }
      />
      <Divider />
      <CardContent>
        <FileUpload
          uploadInformation="Upload File OR Drag and Drop file here (Only CSV files allowed). Download  Sample File here."
          allowedFileTypes={['text/csv']}
          fileName="sample_csv.csv"
          fileErrorMessage="Please upload CSV file only."
          setAlertState={setAlertState}
        />
      </CardContent>
    </Card>
  );
}
