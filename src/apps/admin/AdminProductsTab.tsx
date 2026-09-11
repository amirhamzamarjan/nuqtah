import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Search, Upload, Link as LinkIcon, Image as ImageIcon, Check } from 'lucide-react';
import { store } from '../../lib/store';
import { Product, DepartmentId, Category, ProductBadge } from '../../types';
import { formatPrice } from '../../lib/discount';
import { APP_CONFIG } from '../../lib/config';
import { uploadImageFile } from '../../lib/storageHelper';

export const AdminProductsTab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formDept, setFormDept] = useState<DepartmentId>('men');
  const [formCatId, setFormCatId] = useState('');
  const [formPrice, setFormPrice] = useState<number>(2500);
  const [formOldPrice, setFormOldPrice] = useState<number | undefined>();
  const [formStock, setFormStock] = useState<number>(5);
  const [formImage, setFormImage] = useState('');
  const [formGalleryImages, setFormGalleryImages] = useState<string[]>([]);
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formBadge, setFormBadge] = useState<ProductBadge | ''>('');
  const [formActive, setFormActive] = useState<boolean>(true);

  // Image Upload Controls
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const mainFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const update = () => {
      setProducts(store.getAllProducts());
      setCategories(store.getAllCategories());
    };
    update();
    return store.subscribe(update);
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSlug('');
    setFormSku(`NQT-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormDept('men');
    setFormCatId(categories[0]?.id || '');
    setFormPrice(2500);
    setFormOldPrice(undefined);
    setFormStock(5);
    setFormImage('https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80');
    setFormGalleryImages([]);
    setFormShortDesc('Hand-tailored premium piece.');
    setFormDesc('Crafted with utmost care from fine natural fibers.');
    setFormBadge('New');
    setFormActive(true);
    setImageInputMode('upload');
    setIsCreating(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormSlug(prod.slug);
    setFormSku(prod.sku);
    setFormDept(prod.departmentId);
    setFormCatId(prod.categoryId);
    setFormPrice(prod.price);
    setFormOldPrice(prod.oldPrice);
    setFormStock(prod.totalStock);
    setFormImage(prod.mainImage);
    setFormGalleryImages(prod.galleryImages || [prod.mainImage]);
    setFormShortDesc(prod.shortDescription);
    setFormDesc(prod.description);
    setFormBadge(prod.badge || '');
    setFormActive(prod.active);
    setImageInputMode(prod.mainImage.startsWith('data:') ? 'upload' : 'url');
    setIsCreating(true);
  };

  // Main Image Upload Handler
  const handleMainFileSelect = async (file: File) => {
    if (!file) return;
    setIsUploadingMain(true);
    try {
      const url = await uploadImageFile(file, `products/${formDept}`);
      setFormImage(url);
    } catch (err) {
      console.error('Failed to process image file:', err);
    } finally {
      setIsUploadingMain(false);
    }
  };

  const handleMainFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleMainFileSelect(e.target.files[0]);
    }
  };

  const handleMainFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleMainFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Gallery Multiple Files Upload Handler
  const handleGalleryFilesSelect = async (files: FileList) => {
    setIsUploadingGallery(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const u = await uploadImageFile(files[i], `products/${formDept}/gallery`);
        urls.push(u);
      }
      setFormGalleryImages((prev) => [...prev, ...urls]);
    } catch (err) {
      console.error('Failed to upload gallery images:', err);
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleAddGalleryUrl = () => {
    if (galleryUrlInput.trim()) {
      setFormGalleryImages((prev) => [...prev, galleryUrlInput.trim()]);
      setGalleryUrlInput('');
    }
  };

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setFormGalleryImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const productToSave: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      slug: formSlug || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: formName,
      shortDescription: formShortDesc,
      description: formDesc,
      departmentId: formDept,
      categoryId: formCatId || categories[0]?.id || 'cat-general',
      sku: formSku,
      price: Number(formPrice),
      oldPrice: formOldPrice ? Number(formOldPrice) : undefined,
      discountType: formOldPrice && formOldPrice > formPrice ? 'sale_price' : undefined,
      salePrice: formOldPrice && formOldPrice > formPrice ? Number(formPrice) : undefined,
      mainImage: formImage || 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80',
      galleryImages: formGalleryImages.length > 0 ? formGalleryImages : [formImage],
      featured: editingProduct?.featured || false,
      badge: formBadge ? (formBadge as ProductBadge) : undefined,
      active: formActive,
      available: formStock > 0,
      totalStock: Number(formStock),
      tags: editingProduct?.tags || [formDept, 'premium'],
      variants: editingProduct?.variants || [
        {
          id: `var-${Date.now()}-default`,
          productId: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
          sku: `${formSku}-STD`,
          name: 'Standard Piece',
          attributes: {},
          stock: Number(formStock),
          active: true,
        },
      ],
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.saveProduct(productToSave);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      store.deleteProduct(id);
    }
  };

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24201C]/[0.08] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
            Commerce Catalog
          </span>
          <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Product Management</h1>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-[#B58B47]" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="w-full px-4 py-2.5 pl-10 bg-white border border-[#24201C]/15 rounded-sm text-xs text-[#24201C] placeholder-[#5D554C]/50 focus:border-[#B58B47] focus:outline-none font-mono shadow-sm"
          />
          <Search className="w-4 h-4 text-[#8A8075] absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Products Table */}
      <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Department</th>
                <th className="p-4">Price</th>
                <th className="p-4">Total Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24201C]/[0.06]">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAF6EF]/50 transition-colors">
                  <td className="p-4 flex items-center space-x-3">
                    <img
                      src={prod.mainImage}
                      alt={prod.name}
                      className="w-10 h-12 object-cover rounded bg-[#F4EFE6] border border-[#24201C]/10 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[#24201C] font-semibold block truncate max-w-xs">{prod.name}</span>
                      {prod.badge && <span className="text-[10px] text-[#B58B47] font-semibold block">{prod.badge}</span>}
                    </div>
                  </td>
                  <td className="p-4 text-[#5D554C]">{prod.sku}</td>
                  <td className="p-4 capitalize text-[#24201C]">{prod.departmentId}</td>
                  <td className="p-4 text-[#B58B47] font-bold">
                    {formatPrice(prod.price, APP_CONFIG.currencySymbol)}
                    {prod.oldPrice && (
                      <span className="text-[10px] text-[#8A8075] line-through block font-normal">
                        {formatPrice(prod.oldPrice, APP_CONFIG.currencySymbol)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        prod.totalStock <= 0
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : prod.totalStock <= 3
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {prod.totalStock} units
                    </span>
                  </td>
                  <td className="p-4">
                    {prod.active ? (
                      <span className="text-emerald-700 font-semibold">Active</span>
                    ) : (
                      <span className="text-[#8A8075]">Inactive</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 hover:text-[#B58B47] transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-1.5 hover:text-red-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal with Direct File Upload & URL Support */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="surface-card bg-white rounded-sm p-6 sm:p-8 border border-[#24201C]/10 max-w-3xl w-full max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-4">
              <h3 className="text-xl font-serif text-[#24201C] font-semibold">
                {editingProduct ? 'Edit Product' : 'Create New Product'}
              </h3>
              <button
                onClick={() => setIsCreating(false)}
                className="p-1.5 text-[#5D554C] hover:text-[#24201C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs font-mono">
              {/* Product Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                    placeholder="e.g. Royal Taif Rose Attar"
                  />
                </div>

                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                    placeholder="NQT-MEN-001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Department</label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value as DepartmentId)}
                    className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women (Luxury)</option>
                    <option value="kids">Kids</option>
                    <option value="attar">Attar</option>
                    <option value="organic-food">Organic Food</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Old Price (Optional ৳)</label>
                  <input
                    type="number"
                    value={formOldPrice || ''}
                    onChange={(e) => setFormOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Leave empty if no sale"
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Initial Stock Count</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#5D554C] font-semibold block mb-1">Badge Tag</label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value as ProductBadge | '')}
                    className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  >
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Featured">Featured</option>
                    <option value="Sale">Sale</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Limited">Limited</option>
                  </select>
                </div>
              </div>

              {/* ==================================================================== */}
              {/* PRIMARY PRODUCT IMAGE (DIRECT FILE UPLOAD OR URL LINK) */}
              {/* ==================================================================== */}
              <div className="p-4 bg-[#FAF6EF] rounded-sm border border-[#24201C]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#24201C] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
                    <ImageIcon className="w-4 h-4 text-[#B58B47]" />
                    <span>Primary Product Image</span>
                  </span>

                  {/* Mode Selector */}
                  <div className="flex items-center space-x-1 bg-white p-0.5 rounded border border-[#24201C]/10">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('upload')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors flex items-center space-x-1 ${
                        imageInputMode === 'upload'
                          ? 'bg-[#24201C] text-[#FAF8F3]'
                          : 'text-[#5D554C] hover:text-[#24201C]'
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Direct Upload</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors flex items-center space-x-1 ${
                        imageInputMode === 'url'
                          ? 'bg-[#24201C] text-[#FAF8F3]'
                          : 'text-[#5D554C] hover:text-[#24201C]'
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>URL Link</span>
                    </button>
                  </div>
                </div>

                {imageInputMode === 'upload' ? (
                  <div className="space-y-2">
                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleMainFileDrop}
                      onClick={() => mainFileInputRef.current?.click()}
                      className={`p-6 border-2 border-dashed rounded-sm text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-[#B58B47] bg-[#B58B47]/10'
                          : 'border-[#24201C]/20 hover:border-[#B58B47] bg-white'
                      }`}
                    >
                      <input
                        ref={mainFileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        className="hidden"
                        onChange={handleMainFileInputChange}
                      />
                      <Upload className="w-6 h-6 text-[#B58B47] mx-auto mb-2" />
                      <p className="text-xs font-semibold text-[#24201C]">
                        {isUploadingMain ? 'Uploading & Processing...' : 'Click to Browse or Drag Image Here'}
                      </p>
                      <p className="text-[10px] text-[#8A8075] mt-1">
                        Supports PNG, JPG, JPEG, WEBP (Max 10MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[#5D554C] font-semibold block mb-1">Image URL Link</label>
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                      placeholder="https://images.unsplash.com/... or cloud storage URL"
                    />
                  </div>
                )}

                {/* Main Image Live Preview */}
                {formImage && (
                  <div className="flex items-center space-x-3 p-2 bg-white rounded border border-[#24201C]/10">
                    <img
                      src={formImage}
                      alt="Primary Preview"
                      className="w-14 h-16 object-cover rounded bg-[#F4EFE6] border border-[#24201C]/10 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-semibold text-[#24201C] block truncate">
                        Selected Primary Image
                      </span>
                      <span className="text-[10px] text-[#8A8075] font-mono truncate block">
                        {formImage.startsWith('data:') ? 'Uploaded Device File (Base64 Data)' : formImage}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormImage('')}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* ==================================================================== */}
              {/* GALLERY IMAGES (DIRECT FILE UPLOAD OR URL LINK) */}
              {/* ==================================================================== */}
              <div className="p-4 bg-[#FAF6EF] rounded-sm border border-[#24201C]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#24201C] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
                    <ImageIcon className="w-4 h-4 text-[#B58B47]" />
                    <span>Gallery Alternate Images ({formGalleryImages.length})</span>
                  </span>

                  {/* Multiple file upload trigger */}
                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    className="px-2.5 py-1 bg-[#24201C] hover:bg-[#3A342E] text-white rounded text-[11px] font-semibold flex items-center space-x-1"
                  >
                    <Upload className="w-3 h-3 text-[#B58B47]" />
                    <span>Upload Gallery Files</span>
                  </button>
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) handleGalleryFilesSelect(e.target.files);
                    }}
                  />
                </div>

                {/* Add via URL Link */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={galleryUrlInput}
                    onChange={(e) => setGalleryUrlInput(e.target.value)}
                    placeholder="Or enter gallery image URL and click Add..."
                    className="flex-1 px-3 py-1.5 bg-white border border-[#24201C]/15 rounded text-xs text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryUrl}
                    className="px-3 py-1.5 bg-[#FAF8F3] hover:bg-white text-[#24201C] border border-[#24201C]/20 rounded text-xs font-semibold"
                  >
                    Add URL
                  </button>
                </div>

                {isUploadingGallery && (
                  <p className="text-[11px] text-[#B58B47] font-semibold">Uploading gallery images...</p>
                )}

                {/* Gallery Thumbnails List */}
                {formGalleryImages.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1">
                    {formGalleryImages.map((imgUrl, gIdx) => (
                      <div key={gIdx} className="relative group aspect-[3/4] bg-white rounded border border-[#24201C]/10 overflow-hidden">
                        <img src={imgUrl} alt={`Gallery ${gIdx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(gIdx)}
                          className="absolute top-1 right-1 p-1 bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove from gallery"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Full Editorial Description</label>
                <textarea
                  rows={3}
                  required
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-[#24201C]/[0.08] flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-[#24201C]/15 rounded text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
