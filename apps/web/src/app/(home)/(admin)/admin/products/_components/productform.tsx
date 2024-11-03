'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PictureModal from '../../_components/picturemodal';
import { ProductData } from '@/types/product';
import { getCategories } from '@/libs/action/home';
import { CategoryProductForm } from '@/types/category';
import { createProduct } from '@/libs/action/products';
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { createProductSchema } from '@/libs/schema';

export default function CreateProduct() {
  const [name, setName] = useState<string>('');
  const [categories, setCategories] = useState<
    CategoryProductForm['categories']
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [types, setTypes] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [modalHotImage, setModalHotImage] = useState(false);
  const [modalIcedImage, setModalIcedImage] = useState(false);
  const [hotUrl, setHotUrl] = useState<string | null>(null);
  const [icedUrl, setIcedUrl] = useState<string | null>(null);

  const initialValues: ProductData = {
    name: '',
    description: '',
    stock: 0,
  };

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
  const isFormDisabled = name.trim() === '';

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setTypes([]);
    setSizes([]);
    setPrices({});
  };

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

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory,
  );

  const onCreateProduct = async (
    data: ProductData,
    hotUrl: string | null,
    icedUrl: string | null,
    resetForm: () => void,
  ) => {
    try {
      const res = await createProduct(data, hotUrl, icedUrl);
      console.log(hotUrl);
      console.log(icedUrl);

      toast.success(res.msg);
      resetForm();
      setHotUrl(null);
      setIcedUrl(null);
    } catch (error) {
      toast.error('Failed creating product');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createProductSchema}
        onSubmit={(values, { resetForm }) => {
          if (hotUrl || icedUrl || (hotUrl && icedUrl)) {
            onCreateProduct(values, hotUrl, icedUrl, resetForm);
          }
        }}
      >
        {() => (
          <Form>
            <div className="p-6 w-full bg-transparent flex justify-center gap-20">
              <div className="w-[400px] space-y-10">
                <div className="flex flex-col">
                  <label className="text-gray-700">Name</label>
                  <Field
                    name="name"
                    type="string"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="border-b-2 p-2 outline-none"
                    placeholder="Product Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-700 text-sm font-semibold mt-1"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col">
                  <label className="text-gray-700">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="border-b-2 p-2 outline-none"
                    disabled={isFormDisabled}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Section */}
                {selectedCategoryData &&
                  (selectedCategoryData.hot_iced_variant ||
                    selectedCategoryData.cold_only) && (
                    <div className="flex flex-col">
                      <label className="text-gray-700">Type</label>
                      <div className="flex space-x-4">
                        {typeOptions.map((t) => (
                          <label key={t} className="flex items-center">
                            <input
                              type="checkbox"
                              value={t}
                              checked={types.includes(t)}
                              onChange={() => handleTypeChange(t)}
                              disabled={
                                selectedCategoryData.cold_only && t === 'Hot'
                              }
                              className="mr-2"
                            />
                            {t}
                          </label>
                        ))}
                      </div>
                      {selectedCategoryData.cold_only && (
                        <span className="text-gray-500 text-sm mt-1">
                          Only Iced available for this category
                        </span>
                      )}
                    </div>
                  )}

                {/* Size Section */}
                <div
                  className={`flex flex-col ${isFormDisabled || !((selectedCategoryData?.hot_iced_variant && types.length > 0) || selectedCategoryData?.cold_only) ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <label className="text-gray-700">Size</label>
                  <div className="flex space-x-4">
                    {sizeOptions.map((size) => (
                      <label key={size} className="flex items-center">
                        <input
                          type="checkbox"
                          value={size}
                          checked={sizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                          className="mr-2"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex flex-col">
                  <label className="text-gray-700">Price</label>
                  {sizes.length > 0 ? (
                    sizeOptions
                      .filter((size) => sizes.includes(size))
                      .map((size) => (
                        <input
                          key={size}
                          type="text"
                          placeholder={`${size} Size Price`}
                          value={prices[size] || ''}
                          onChange={(e) =>
                            handlePriceChange(size, e.target.value)
                          }
                          className="border-b-2 p-2 outline-none mt-2"
                          disabled={isFormDisabled}
                        />
                      ))
                  ) : (
                    <input
                      type="text"
                      placeholder="Price"
                      className="border-b-2 p-2 outline-none"
                      disabled={isFormDisabled}
                    />
                  )}
                </div>
              </div>

              <div className="w-[700px] space-y-10">
                {/* Image Section */}
                <div className="flex flex-col space-y-5">
                  <label className="text-gray-700">Image</label>
                  <div className="space-y-5 flex flex-col">
                    {types.includes('Hot') && (
                      <button
                        type="button"
                        className="bg-coffee p-2 w-48 rounded-full text-white font-semibold"
                        disabled={isFormDisabled}
                        onClick={() => setModalHotImage(true)}
                      >
                        Upload Hot Image
                      </button>
                    )}
                    {types.includes('Iced') && (
                      <button
                        type="button"
                        className="bg-coffee p-2 w-48 rounded-full text-white font-semibold"
                        disabled={isFormDisabled}
                        onClick={() => setModalIcedImage(true)}
                      >
                        Upload Iced Image
                      </button>
                    )}
                    {types.length === 0 && (
                      <button
                        className="bg-coffee p-2 w-48 rounded-full text-white font-semibold"
                        disabled={isFormDisabled}
                        type="button"
                        onClick={() => setModalHotImage(true)}
                      >
                        Upload Image
                      </button>
                    )}
                  </div>
                </div>

                {/* Stock Input */}
                <div className="flex flex-col">
                  <label className="text-gray-700">Stock</label>
                  <Field
                    name="stock"
                    type="number"
                    className="border-b-2 p-2 outline-none"
                    placeholder="Stock Quantity"
                    disabled={isFormDisabled}
                  />
                  <ErrorMessage
                  name='stock'
                  component='div'
                  className="text-red-700 text-sm font-semibold mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700">Description</label>
                  <Field
                    name="description"
                    as="textarea"
                    type="string"
                    className="border-b-2 p-2 outline-none resize-none"
                    rows={4}
                    placeholder="Product Description"
                    disabled={isFormDisabled}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-700 text-sm font-semibold mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="p-2 bg-coffee text-white rounded-full"
                >
                  Submit
                </button>
              </div>
            </div>
            {modalHotImage && (
              <PictureModal
                func={(imageDataUrl: string) => {
                  setHotUrl(imageDataUrl);
                  setModalHotImage(false);
                }}
                closeModal={() => setModalHotImage(false)}
              />
            )}
            {modalIcedImage && (
              <PictureModal
                func={(imageDataUrl: string) => {
                  setIcedUrl(imageDataUrl);
                  setModalIcedImage(false);
                }}
                closeModal={() => setModalIcedImage(false)}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
