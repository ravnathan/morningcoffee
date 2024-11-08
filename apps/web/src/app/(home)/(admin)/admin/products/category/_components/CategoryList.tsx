import { getCategories } from '@/libs/action/home';
import { CategoryProductForm } from '@/types/category';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/confirmationmodal';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { deleteCategory } from '@/libs/action/category';

export default function CategoryList() {
  const [data, setData] = useState<CategoryProductForm | null>(null);
  const [deleteCat, setdeleteCat] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getCategories();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    setdeleteCat(id);
    setDeleteConfirmation(true);
  };

  const confirmdeleteCat = async () => {
    if (deleteCat !== null) {
      try {
        const res = await deleteCategory(deleteCat)
        toast.success('Category has been deleted');
        await fetchData();
      } catch (error) {
        toast.error('Failed deleting category');
      } finally {
        setDeleteConfirmation(false);
        setdeleteCat(null);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#F9F8FB' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ borderTop: '2px solid black', borderBottom: '2px solid black' }}>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600' }}>Name</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Image</TableCell> {/* Added Image column */}
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Hot/Iced Variant</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Cold Only</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Size Small</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Size Medium</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Size Large</TableCell>
            <TableCell sx={{ border: '1px solid #e0e0e0', fontWeight: '600', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.categories.map((category, index) => (
            <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
              <TableCell sx={{ border: '1px solid #e0e0e0' }}>{category.name}</TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                <Image src={category.image || '/default-image.jpg'} alt="Category Image" width={50} height={50} style={{ objectFit: 'cover', borderRadius: '50%' }} />
              </TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                {category.hot_iced_variant ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
              </TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                {category.cold_only ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
              </TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                {category.size_small ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
              </TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                {category.size_medium ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
              </TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                {category.size_large ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: 'red' }} />}
              </TableCell>
              <TableCell sx={{ border: '1px solid #e0e0e0', textAlign: 'center' }}>
                <DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(category.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deleteConfirmation && (
        <ConfirmationModal
          isOpen={deleteConfirmation}
          onClose={() => setDeleteConfirmation(false)}
          onConfirm={confirmdeleteCat}
          header="Confirm Deletion"
          message="Are you sure you want to delete this category?"
        />
      )}
    </TableContainer>
  );
}
