'use client';

import { deleteProduct, getProduct } from '@/libs/action/products';
import { ProductTable } from '@/types/product';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import { getCategories } from '@/libs/action/home';
import { CategoryProductForm } from '@/types/category';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/confirmationmodal';
import { formatToRupiah } from '@/libs/formatrupiah';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState<ProductTable | null>(null);
  const [categories, setCategories] = useState<CategoryProductForm['categories']>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [deleteProd, setDeleteProd] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchProducts = async () => {
    try {
      const res = await getProduct();
      setProducts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryFromURL = searchParams.get('category') || 'All';
    const searchFromURL = searchParams.get('search') || '';

    setSelectedCategory(categoryFromURL);
    setSearchQuery(searchFromURL);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    router.replace(`?${params.toString()}`);
  }, [selectedCategory, searchQuery, router]);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id: string) => {
    setDeleteProd(id);
    setDeleteConfirmation(true);
  };

  const confirmDeleteProd = async () => {
    if (deleteProd !== null) {
      try {
        const res = await deleteProduct(deleteProd);
        await fetchProducts();
        toast.success(res.msg);
      } catch (error) {
        toast.error('Failed deleting data');
      } finally {
        setDeleteConfirmation(false);
        setDeleteProd(null);
      }
    }
  };

  const filteredProducts = products?.products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || selectedCategory === '' ? true : product.category_name === selectedCategory;
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="w-full">
      <TableContainer component={Paper} sx={{ backgroundColor: '#F9F8FB' }}>
        <div className="flex justify-between items-center mt-10">
          <FormControl margin="normal" style={{ width: '200px', paddingTop: '8px' }}>
            {' '}
            <InputLabel shrink>Filter by Category</InputLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange} displayEmpty>
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" style={{ width: '400px' }}>
            <TextField
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                marginBottom: '1rem',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '9999px',
                },
              }}
            />
          </FormControl>
        </div>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderTop: '2px solid black',
                borderBottom: '2px solid black',
              }}
            >
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Name</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Category</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Medium Price</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Iced Small</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Iced Medium</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Iced Large</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Stock</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Stock Iced</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Description</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Description Iced</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Image 1</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Image 2</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} sx={{ textAlign: 'center', fontWeight: '600' }}>
                  No search results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts?.map((product, index) => (
                <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{product.name}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{product.category_name}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                    {product.medium == null || product.medium === 0 ? '-' : formatToRupiah(product.medium)}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                    {product.iced_small == null || product.iced_small === 0 ? '-' : formatToRupiah(product.iced_small)}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                    {product.iced_medium == null || product.iced_medium === 0 ? '-' : formatToRupiah(product.iced_medium)}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                    {product.iced_large == null || product.iced_large === 0 ? '-' : formatToRupiah(product.iced_large)}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{product.stock}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{product.stock_iced ?? '-'}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{product.description}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>{product.description_iced ?? '-'}</TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                    {product.image_1 ? <Image src={product.image_1} alt={`${product.name} hot`} width={50} height={50} /> : '-'}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0' }}>
                    {product.image_2 ? <Image src={product.image_2} alt={`${product.name} iced`} width={50} height={50} /> : '-'}
                  </TableCell>
                  <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                    <div className="flex">
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <EditIcon
                          sx={{ cursor: 'pointer', color: 'blue'}}
                        />
                      </Link>
                      <DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(product.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {deleteConfirmation && (
          <ConfirmationModal
            isOpen={deleteConfirmation}
            onClose={() => setDeleteConfirmation(false)}
            onConfirm={confirmDeleteProd}
            header="Confirm Deletion"
            message="Are you sure you want to delete this product?"
          />
        )}
      </TableContainer>
    </div>
  );
}
