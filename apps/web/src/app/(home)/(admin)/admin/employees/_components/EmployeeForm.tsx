'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';;
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CashierData } from '@/types/user';
import { toast } from 'react-toastify';
import { createCashierSchema } from '@/libs/schema';
import PictureModal from '../../_components/PictureModal';
import { createCashier } from '@/libs/action/admin';

export default function EmployeeForm({ closeModal }: { closeModal: () => void }) {
  const [openModal, setOpenModal] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleCreateCashier = async (values: CashierData) => {
    if (!dataUrl) {
      toast.error('Please select an avatar image.');
      return;
    }

    try {
      const res = await createCashier(values, dataUrl);
      toast.success(res.msg);
      setPreviewImage(null);
      closeModal();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="w-full h-full mx-5">
      <Formik initialValues={{ fullname: '', password: '' }} validationSchema={createCashierSchema} onSubmit={handleCreateCashier}>
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={2}>
              <Field
                name="fullname"
                as={TextField}
                label="Full Name"
                variant="outlined"
                fullWidth
                error={touched.fullname && Boolean(errors.fullname)}
                helperText={touched.fullname && errors.fullname}
              />

              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} sx={{ textTransform: 'none' }}>
                Upload Portrait
              </Button>
            </Box>

            {previewImage && (
              <Box mt={2}>
                <Typography>Image Preview:</Typography>
                <img src={previewImage} alt="Preview" style={{ width: '100px', height: 'auto', marginTop: '8px' }} />
              </Box>
            )}

            <Box display="flex" justifyContent="center" pt={4}>
              <Button variant="contained" color="secondary" fullWidth sx={{ textTransform: 'none' }} type="submit">
                Submit
              </Button>
            </Box>

            {openModal && (
              <PictureModal
                func={(imageDataUrl: string) => {
                  setDataUrl(imageDataUrl);
                  setPreviewImage(imageDataUrl);
                  setOpenModal(false);
                }}
                closeModal={() => setOpenModal(false)}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
