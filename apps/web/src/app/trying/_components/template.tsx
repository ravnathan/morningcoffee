'use client'

import { useEffect, useState } from 'react';
import { ProductData } from '@/types/product';
import { getCategories } from '@/libs/action/home';
import { CategoryProductForm } from '@/types/category';
import { createProduct, dataURLtoFile } from '@/libs/action/products';
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
import PictureModal from '@/app/(home)/(admin)/admin/_components/picturemodal';

export default function TryingCreate() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [categories, setCategories] = useState<
    CategoryProductForm['categories']
  >([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(''); // Stores ID
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(''); // Stores name
  const [types, setTypes] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [modalHotImage, setModalHotImage] = useState(false);
  const [modalIcedImage, setModalIcedImage] = useState(false);
  const [hotUrl, setHotUrl] = useState<string | null>(null);
  const [icedUrl, setIcedUrl] = useState<string | null>(null);

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
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
    setSizes([]);
  };

  const handleSizeChange = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
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
      setSelectedCategoryId(selectedId); // Set the ID
      setSelectedCategoryName(selectedCategoryData.name); // Set the name
    }
  };

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  const onCreateProduct = async () => {
    if (!name || !description || stock < 0 || !selectedCategoryName) {
      toast.error('Please fill in all fields correctly.');
      return;
    }

    try {
      const data: ProductData = {
        name,
        category_name: selectedCategoryName,
        stock,
        description,
        medium: prices['Medium'] ? Number(prices['Medium']) : undefined,
        iced_small: prices['Small'] ? Number(prices['Small']) : undefined,
        iced_medium: prices['Medium'] ? Number(prices['Medium']) : undefined,
        iced_large: prices['Large'] ? Number(prices['Large']) : undefined,
        image_hot: hotUrl ? dataURLtoFile(hotUrl, 'image_hot.png') : undefined,
        image_cold: icedUrl ? dataURLtoFile(icedUrl, 'image_cold.png') : undefined,
      };
      const res = await createProduct(data);
      toast.success(res.msg);
      setName('');
      setDescription('');
      setStock(0);
      setHotUrl(null);
      setIcedUrl(null);
    } catch (error) {
      toast.error('Failed creating product');
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h6">Create Product</Typography>

      <TextField
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      {/* Category Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategoryId} // Use ID for selection
          onChange={handleCategoryChange}
          disabled={isFormDisabled}
        >
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {selectedCategoryData?.cold_only &&
            'Only Iced available for this category'}
        </FormHelperText>
      </FormControl>

      {/* Type Section */}
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
                    disabled={selectedCategoryData.cold_only && t === 'Hot'}
                  />
                }
                label={t}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Size Section */}
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
                  disabled={isFormDisabled || !types.length}
                />
              }
              label={size}
            />
          ))}
        </Box>
      </Box>

      {/* Price Section */}
      <Box margin="normal">
        <Typography>Price</Typography>
        {sizes.length > 0 ? (
          sizeOptions
            .filter((size) => sizes.includes(size))
            .map((size) => (
              <TextField
                key={size}
                label={`${size} Size Price`}
                type="text"
                value={prices[size] || ''}
                onChange={(e) => handlePriceChange(size, e.target.value)}
                fullWidth
                margin="normal"
                disabled={isFormDisabled}
              />
            ))
        ) : (
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            disabled={isFormDisabled}
          />
        )}
      </Box>

      {/* Image Section */}
      <Box margin="normal">
        <Typography>Image</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {types.includes('Hot') && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalHotImage(true)}
            >
              Upload Hot Image
            </Button>
          )}
          {types.includes('Iced') && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalIcedImage(true)}
            >
              Upload Iced Image
            </Button>
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

      <TextField
        label="Stock Quantity"
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onCreateProduct}
        disabled={isFormDisabled}
      >
        Create Product
      </Button>

      {/* Picture Modal for Hot Image */}
      {modalHotImage && (
        <PictureModal
          func={(url: string) => {
            setHotUrl(url);
            setModalHotImage(false);
          }}
          closeModal={() => setModalHotImage(false)}
        />
      )}

      {/* Picture Modal for Iced Image */}
      {modalIcedImage && (
        <PictureModal
          func={(url: string) => {
            setIcedUrl(url);
            setModalIcedImage(false);
          }}
          closeModal={() => setModalIcedImage(false)}
        />
      )}
    </Box>
  );
}
