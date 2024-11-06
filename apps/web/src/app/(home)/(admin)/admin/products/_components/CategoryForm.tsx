'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormControlLabel, FormHelperText, Checkbox, Switch, TextField, Typography } from '@mui/material';
import { CategoryForm } from '@/types/category';
import { createCategory } from '@/libs/action/category';
import { toast } from 'react-toastify';
import { dataURLtoFile } from '@/libs/urltofileconvert';
import PictureModal from '../../_components/PictureModal';

export default function CreateCategory({ closeModal }: { closeModal: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [coldVariant, setColdVariant] = useState(false);
  const [icedOnly, setIcedOnly] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [url, setUrl] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const sizes = ['Small', 'Medium', 'Large'];

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = event.target.value;
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handleColdVariantToggle = () => {
    setColdVariant((prev) => !prev);
    if (!coldVariant) setIcedOnly(false);
  };

  const handleIcedOnlyToggle = () => {
    setIcedOnly((prev) => !prev);
    if (!icedOnly) setColdVariant(false);
  };

  const isFormDisabled = name.trim() === '';

  const onCreateCategory = async () => {
    try {
      const data: CategoryForm = {
        name,
        image: dataURLtoFile(url!, 'image.png'),
        hot_iced_variant: coldVariant,
        cold_only: icedOnly,
        size_small: selectedSizes.includes('Small'),
        size_medium: selectedSizes.includes('Medium'),
        size_large: selectedSizes.includes('Large'),
      };
      const res = await createCategory(data);
      toast.success(res.msg);
      setUrl(null);
      setPreviewImage(null);
      closeModal();
    } catch (error) {
      toast.error('Failed creating category');
    }
  };

  return (
    <div className="w-full">
      <Box p={4}>
        <Typography variant="h6">Create Category</Typography>
        <TextField label="Category Name" value={name} onChange={handleNameChange} variant="outlined" fullWidth margin="normal" />
        <Box display="flex" alignItems="center" gap={2} marginY={2}>
          <Typography>Cold Variant</Typography>
          <Switch checked={coldVariant} onChange={handleColdVariantToggle} disabled={isFormDisabled || icedOnly} />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Iced Only</Typography>
          <Switch checked={icedOnly} onChange={handleIcedOnlyToggle} disabled={isFormDisabled || coldVariant} />
        </Box>
        <FormControl component="fieldset" margin="normal" disabled={isFormDisabled || (!coldVariant && !icedOnly)}>
          <Typography>Size</Typography>
          {sizes.map((size) => (
            <FormControlLabel
              key={size}
              control={<Checkbox checked={selectedSizes.includes(size)} onChange={handleSizeChange} value={size} />}
              label={size}
            />
          ))}
          <FormHelperText>Select sizes for the category</FormHelperText>
        </FormControl>
        <Box marginY={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{ textTransform: 'none' }}
            disabled={isFormDisabled}
          >
            Upload Image
          </Button>
        </Box>
        {previewImage && (
          <Box mt={2}>
            <Typography>Image Preview:</Typography>
            <img src={previewImage} alt="Preview" style={{ width: '100px', height: 'auto', marginTop: '8px' }} />
          </Box>
        )}
        <Box display="flex" justifyContent="center" pt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 'auto', maxWidth: '200px', textTransform: 'none' }}
            onClick={onCreateCategory}
            disabled={isFormDisabled}
          >
            Submit
          </Button>
        </Box>
        {modalOpen && (
          <PictureModal
            func={(url: string) => {
              setUrl(url);
              setModalOpen(false);
              setPreviewImage(url);
            }}
            closeModal={() => setModalOpen(false)}
          />
        )}
      </Box>
    </div>
  );
}
