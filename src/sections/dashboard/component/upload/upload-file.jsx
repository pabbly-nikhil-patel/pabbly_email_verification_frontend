import {
  Box,
  Card,
  Link,
  Divider,
  Tooltip,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

import FileUpload from 'src/components/upload/upload';

export default function Upload({ setAlertState }) {
  return (
    <Card>
      <CardHeader
        sx={{ pb: 3 }}
        title={
          <Box display="inline-block">
            <Tooltip title="Verify multiple emails here with a CSV file." arrow placement="top">
              <Typography variant="h6">
                Verify Bulk Emails (Upload CSV File for Email Verification){' '}
              </Typography>
            </Tooltip>
          </Box>
        }
        subheader={
          <>
            Only CSV files allowed. Download{' '}
            <Tooltip title="Click to download the sample file." arrow placement="top">
              <Link
                href="/src/assets/sample-files/sample_csv.csv"
                download
                style={{ color: '#078DEE' }}
              >
                Sample File
              </Link>{' '}
            </Tooltip>
            here.
          </>
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
