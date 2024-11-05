'use client';

import { useEffect, useState } from 'react';
import { ProductData } from '@/types/product';
import { getCategories } from '@/libs/action/home';
import { CategoryProductForm } from '@/types/category';
import { createProduct } from '@/libs/action/products';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import PictureModal from '../../../_components/picturemodal';
import { dataURLtoFile } from '@/libs/urltofileconvert';
import { navigate } from '@/libs/action/server';

export default function ProductForm() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryProductForm['categories']>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');
  const [types, setTypes] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [modalHotImage, setModalHotImage] = useState(false);
  const [modalIcedImage, setModalIcedImage] = useState(false);
  const [hotUrl, setHotUrl] = useState<string | null>(null);
  const [icedUrl, setIcedUrl] = useState<string | null>(null);
  const [mediumPrice, setMediumPrice] = useState<string>('');
  const [previewHotImage, setPreviewHotImage] = useState<string | null>(null);
  const [previewIcedImage, setPreviewIcedImage] = useState<string | null>(null);
  const [stockIced, setStockIced] = useState<number>(0);
  const [icedDescription, setIcedDescription] = useState('');

  const isFormDisabled = name.trim() === '';

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategories();
        setCategories(res.categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const typeOptions = ['Hot', 'Iced'];
  const sizeOptions = ['Small', 'Medium', 'Large'];

  const handleTypeChange = (type: string) => {
    if (selectedCategoryData?.cold_only) {
      // If cold_only is true, only allow Iced type to be selected
      if (type === 'Iced') {
        setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
        setSizes([]); // Reset sizes when toggling type
      }
    } else {
      // If both variants are allowed
      setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
      if (type === 'Iced') {
        setSizes([]); // Reset sizes when toggling Iced
      }
    }
  };

  const handleSizeChange = (size: string) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const handlePriceChange = (size: string, value: string) => {
    setPrices((prev) => ({
      ...prev,
      [size]: value,
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const selectedCategoryData = categories.find((cat) => cat.id === selectedId);
    if (selectedCategoryData) {
      setSelectedCategoryId(selectedId);
      setSelectedCategoryName(selectedCategoryData.name);
    }
  };

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategoryId);

  const onCreateProduct = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || !nameRegex.test(name)) {
      toast.error('Product name must only contain alphabets and spaces.');
      return;
    }

    try {
      const data: ProductData = {
        name,
        category_name: selectedCategoryName,
        stock: stock ? Number(stock) : undefined,
        stock_iced: stockIced,
        description_iced: icedDescription,
        description: description ? description : undefined,
        medium: mediumPrice ? Number(mediumPrice) : undefined,
        iced_small: prices['Small'] ? Number(prices['Small']) : undefined,
        iced_medium: prices['Medium'] ? Number(prices['Medium']) : undefined,
        iced_large: prices['Large'] ? Number(prices['Large']) : undefined,
        image_1: hotUrl ? dataURLtoFile(hotUrl, 'image_1.png') : undefined,
        image_cold: icedUrl ? dataURLtoFile(icedUrl, 'image_cold.png') : undefined,
      };
      const res = await createProduct(data);
      toast.success(res.msg);
      setName('');
      setDescription('');
      setStock(0);
      setHotUrl(null);
      setIcedUrl(null);
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed creating product');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h6">Create Product</Typography>
      <TextField label="Product Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" fullWidth margin="normal" />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategoryId} onChange={handleCategoryChange} disabled={isFormDisabled}>
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{selectedCategoryData?.cold_only && 'Only Iced available for this category'}</FormHelperText>
      </FormControl>
      {selectedCategoryData && (
        <Box margin="normal">
          <Typography>Type</Typography>
          <Box display="flex" gap={2}>
            {typeOptions.map((t) => (
              <FormControlLabel
                key={t}
                control={
                  <Checkbox
                    checked={types.includes(t)}
                    onChange={() => handleTypeChange(t)}
                    disabled={
                      (!selectedCategoryData?.hot_iced_variant && !selectedCategoryData?.cold_only) ||
                      (selectedCategoryData?.cold_only && t === 'Hot')
                    }
                  />
                }
                label={t}
              />
            ))}
          </Box>
        </Box>
      )}
      <Box margin="normal">
        <Typography>Size</Typography>
        <Box display="flex" gap={2}>
          {sizeOptions.map((size) => (
            <FormControlLabel
              key={size}
              control={
                <Checkbox
                  checked={sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  disabled={isFormDisabled || !types.includes('Iced')}
                />
              }
              label={size}
            />
          ))}
        </Box>
      </Box>

      <Box margin="normal">
        <Typography>Price</Typography>
        {selectedCategoryData?.cold_only ? (
          sizes.length > 0 ? (
            sizeOptions
              .filter((size) => sizes.includes(size))
              .map((size) => (
                <TextField
                  key={size}
                  label={`Iced ${size} Price`}
                  type="text"
                  value={prices[size] || ''}
                  onChange={(e) => handlePriceChange(size, e.target.value)}
                  fullWidth
                  margin="normal"
                  disabled={isFormDisabled}
                />
              ))
          ) : (
            <TextField label="Price" fullWidth margin="normal" disabled={isFormDisabled} />
          )
        ) : (
          <>
            <TextField
              label="Medium Price"
              type="text"
              value={mediumPrice}
              onChange={(e) => setMediumPrice(e.target.value)}
              fullWidth
              margin="normal"
              disabled={isFormDisabled}
            />
            {sizes.length > 0 &&
              sizeOptions
                .filter((size) => sizes.includes(size))
                .map((size) => (
                  <TextField
                    key={size}
                    label={`Iced ${size} Price`}
                    type="text"
                    value={prices[size] || ''}
                    onChange={(e) => handlePriceChange(size, e.target.value)}
                    fullWidth
                    margin="normal"
                    disabled={isFormDisabled}
                  />
                ))}
          </>
        )}
      </Box>
      <Box margin="normal">
        <Typography>Image</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalHotImage(true)}
            disabled={
              (!selectedCategoryData?.hot_iced_variant && !selectedCategoryData?.cold_only && types.length > 0) ||
              (types.length === 0 && selectedCategoryData?.cold_only) ||
              (types.length === 0 && selectedCategoryData?.hot_iced_variant)
            }
            sx={{ width: 'auto', maxWidth: '150px', textTransform: 'none' }}
          >
            {
              selectedCategoryData?.hot_iced_variant
                ? types.includes('Hot')
                  ? 'Upload Hot Image'
                  : ''
                : selectedCategoryData?.cold_only
                  ? types.includes('Iced')
                    ? 'Upload Iced Image'
                    : ''
                  : 'Upload Image' // Display this when both hot_iced_variant and cold_only are false
            }
          </Button>

          {types.includes('Iced') && types.includes('Hot') && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalIcedImage(true)}
              disabled={(!selectedCategoryData?.hot_iced_variant && !selectedCategoryData?.cold_only) || types.length === 0}
              sx={{ width: 'auto', maxWidth: '150px', textTransform: 'none' }}
            >
              Upload Iced Image
            </Button>
          )}
          {previewHotImage && (
            <Box mt={2}>
              <Typography>Hot Image Preview:</Typography>
              <img src={previewHotImage} alt="Hot Image Preview" style={{ width: '100px', height: 'auto', marginTop: '8px' }} />
            </Box>
          )}
          {previewIcedImage && (
            <Box mt={2}>
              <Typography>Iced Image Preview:</Typography>
              <img src={previewIcedImage} alt="Iced Image Preview" style={{ width: '100px', height: 'auto', marginTop: '8px' }} />
            </Box>
          )}
        </Box>
      </Box>

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {types.includes('Iced') && (
        <TextField
          label="Iced Description"
          value={icedDescription}
          onChange={(e) => setIcedDescription(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      )}
      <TextField
        label="Stock Quantity"
        type="text"
        value={stock}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          const inputValue = target.value.replace(/[^0-9]/g, '');
          setStock(Number(inputValue) || 0);
          target.value = inputValue;
        }}
        variant="outlined"
        fullWidth
        margin="normal"
        inputProps={{
          min: 0,
          pattern: '[0-9]*',
        }}
      />

      <TextField
        label="Stock Iced Quantity"
        type="text"
        value={stockIced}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          const inputValue = target.value.replace(/[^0-9]/g, '');
          setStockIced(Number(inputValue) || 0);
          target.value = inputValue;
        }}
        variant="outlined"
        fullWidth
        margin="normal"
        disabled={isFormDisabled || !types.includes('Iced')}
        inputProps={{
          min: 0,
          pattern: '[0-9]*',
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onCreateProduct}
        disabled={isFormDisabled}
        sx={{ width: 'auto', maxWidth: '200px', textTransform: 'none' }}
      >
        Create Product
      </Button>
      {modalHotImage && (
        <PictureModal
          func={(url: string) => {
            setHotUrl(url);
            setModalHotImage(false);
            setPreviewHotImage(url);
          }}
          closeModal={() => setModalHotImage(false)}
        />
      )}
      {modalIcedImage && (
        <PictureModal
          func={(url: string) => {
            setIcedUrl(url);
            setModalIcedImage(false);
            setPreviewIcedImage(url);
          }}
          closeModal={() => setModalIcedImage(false)}
        />
      )}
    </Box>
  );
}
