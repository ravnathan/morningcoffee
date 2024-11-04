'use client';

import ProductForm from './_components/productform';
import AppWrapper from '../_components/productwrapper';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function CreateProduct() {
  return (
    <div>
      <div className="w-[50%] mx-auto pt-10">
        <AppWrapper>
        <Link href={'/admin/products'}>
          <IconButton color="primary" aria-label="back">
            <ArrowBackIcon />
            <Typography variant="button" style={{ marginLeft: '8px' }}>
              Back
            </Typography>
          </IconButton>
        </Link>
          <ProductForm />
        </AppWrapper>
      </div>
    </div>
  );
}
