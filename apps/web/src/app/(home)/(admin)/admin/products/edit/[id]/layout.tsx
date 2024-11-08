'use client';

import Link from 'next/link';
import AppWrapper from '../../_components/ProductWrapper';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EditProductLayout({ children }: { children: React.ReactNode }) {
  return (
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
        {children}
      </AppWrapper>
    </div>
  );
}
