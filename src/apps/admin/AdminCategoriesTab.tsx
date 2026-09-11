import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { store } from '../../lib/store';
import { Category, Collection, DepartmentId } from '../../types';

export const AdminCategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedDept, setSelectedDept] = useState<DepartmentId>('women');

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDept, setCatDept] = useState<DepartmentId>('women');
  const [catDesc, setCatDesc] = useState('');

  // Collection Modal State
  const [isColModalOpen, setIsColModalOpen] = useState(false);
  const [editingCol, setEditingCol] = useState<Collection | null>(null);
  const [colName, setColName] = useState('');
  const [colSlug, setColSlug] = useState('');
  const [colDesc, setColDesc] = useState('');

  useEffect(() => {
    const update = () => {
      setCategories(store.getAllCategories());
      setCollections(store.getAllCollections());
    };
    update();
    return store.subscribe(update);
  }, []);

  const openCreateCategory = () => {
    setEditingCategory(null);
    setCatName('');
    setCatSlug('');
    setCatDept(selectedDept);
    setCatDesc('');
    setIsCategoryModalOpen(true);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatDept(cat.departmentId);
    setCatDesc(cat.description || '');
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const catToSave: Category = {
      id: editingCategory ? editingCategory.id : `cat-${catDept}-${Date.now()}`,
      departmentId: catDept,
      name: catName,
      slug: catSlug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: catDesc,
      active: true,
      order: editingCategory ? editingCategory.order : categories.length + 1,
    };
    store.saveCategory(catToSave);
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      store.deleteCategory(id);
    }
  };

  const openCreateCollection = () => {
    setEditingCol(null);
    setColName('');
    setColSlug('');
    setColDesc('');
    setIsColModalOpen(true);
  };

  const openEditCollection = (col: Collection) => {
    setEditingCol(col);
    setColName(col.name);
    setColSlug(col.slug);
    setColDesc(col.description);
    setIsColModalOpen(true);
  };

  const handleSaveCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const colToSave: Collection = {
      id: editingCol ? editingCol.id : `col-${Date.now()}`,
      name: colName,
      slug: colSlug || colName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: colDesc,
      featured: true,
      active: true,
    };
    store.saveCollection(colToSave);
    setIsColModalOpen(false);
  };

  const filteredCategories = categories.filter((c) => c.departmentId === selectedDept);

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <span className="text-xs uppercase tracking-widest text-[#B58B47] font-mono font-semibold">
          Taxonomy & Structure
        </span>
        <h1 className="text-3xl font-serif text-[#24201C] mt-1 font-semibold">Categories & Collections</h1>
        <p className="text-xs text-[#5D554C] font-light">
          Customize department labels, Women luxury naming (Noor, Haya, Zahra Edit), Kids edits, and editorial collections.
        </p>
      </div>

      {/* 1. Department Category Manager */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24201C]/[0.08] pb-3">
          {/* Department Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto text-xs font-mono">
            {(['women', 'men', 'kids', 'attar', 'organic-food'] as DepartmentId[]).map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-sm uppercase tracking-wider transition-all ${
                  selectedDept === dept
                    ? 'bg-[#24201C] text-[#FAF8F3] font-bold shadow-sm'
                    : 'bg-white text-[#5D554C] hover:text-[#24201C] border border-[#24201C]/10 shadow-sm'
                }`}
              >
                {dept === 'women' ? 'Women (Luxury)' : dept.replace('-', ' ')}
              </button>
            ))}
          </div>

          <button
            onClick={openCreateCategory}
            className="px-4 py-2 bg-[#FAF6EF] hover:bg-[#F4EFE6] text-[#24201C] border border-[#24201C]/10 rounded-sm text-xs font-mono uppercase tracking-widest flex items-center space-x-1.5 transition-colors font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#B58B47]" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAF6EF] text-[#5D554C] uppercase tracking-wider border-b border-[#24201C]/[0.08] font-semibold">
              <tr>
                <th className="p-4">Category Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#24201C]/[0.06]">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#FAF6EF]/50">
                  <td className="p-4 font-semibold text-[#24201C]">{cat.name}</td>
                  <td className="p-4 text-[#5D554C]">{cat.slug}</td>
                  <td className="p-4 text-[#5D554C]">{cat.description || 'None'}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditCategory(cat)}
                      className="p-1 hover:text-[#B58B47]"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1 hover:text-red-600"
                      title="Delete Category"
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

      {/* 2. Collections Manager */}
      <div className="space-y-4 pt-6 border-t border-[#24201C]/[0.08]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-serif font-semibold text-[#24201C]">Editorial Collections</h3>
            <p className="text-xs text-[#5D554C] font-light">Cross-departmental thematic edits.</p>
          </div>

          <button
            onClick={openCreateCollection}
            className="px-4 py-2 bg-[#FAF6EF] hover:bg-[#F4EFE6] text-[#24201C] border border-[#24201C]/10 rounded-sm text-xs font-mono uppercase tracking-widest flex items-center space-x-1.5 transition-colors font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#B58B47]" />
            <span>Add Collection</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {collections.map((col) => (
            <div
              key={col.id}
              className="p-5 surface-card bg-white rounded-sm border border-[#24201C]/[0.08] shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B58B47] font-semibold">
                  Collection
                </span>
                <h4 className="text-lg font-serif font-semibold text-[#24201C]">{col.name}</h4>
                <p className="text-xs text-[#5D554C] font-light">{col.description}</p>
              </div>

              <div className="pt-2 border-t border-[#24201C]/[0.06] flex justify-end space-x-2">
                <button
                  onClick={() => openEditCollection(col)}
                  className="p-1 text-[#5D554C] hover:text-[#B58B47]"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => store.deleteCollection(col.id)}
                  className="p-1 text-[#5D554C] hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="surface-card bg-white rounded-sm p-6 max-w-md w-full border border-[#24201C]/10 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
              <h3 className="text-lg font-serif font-semibold text-[#24201C]">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)}>
                <X className="w-4 h-4 text-[#5D554C]" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Department</label>
                <select
                  value={catDept}
                  onChange={(e) => setCatDept(e.target.value as DepartmentId)}
                  className="w-full px-3 py-2 bg-white border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                >
                  <option value="women">Women (Luxury)</option>
                  <option value="men">Men</option>
                  <option value="kids">Kids</option>
                  <option value="attar">Attar</option>
                  <option value="organic-food">Organic Food</option>
                </select>
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Category Label</label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Noor, Haya, or Zahra Edit"
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Description</label>
                <input
                  type="text"
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#24201C]/[0.08] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Collection Modal */}
      {isColModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="surface-card bg-white rounded-sm p-6 max-w-md w-full border border-[#24201C]/10 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-[#24201C]/[0.08] pb-3">
              <h3 className="text-lg font-serif font-semibold text-[#24201C]">
                {editingCol ? 'Edit Collection' : 'Create Collection'}
              </h3>
              <button onClick={() => setIsColModalOpen(false)}>
                <X className="w-4 h-4 text-[#5D554C]" />
              </button>
            </div>

            <form onSubmit={handleSaveCollection} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Collection Title</label>
                <input
                  type="text"
                  required
                  value={colName}
                  onChange={(e) => setColName(e.target.value)}
                  placeholder="e.g. The Heritage Edit"
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[#5D554C] font-semibold block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={colDesc}
                  onChange={(e) => setColDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F3] border border-[#24201C]/15 rounded text-[#24201C] focus:border-[#B58B47] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#24201C]/[0.08] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsColModalOpen(false)}
                  className="px-4 py-2 text-[#5D554C] hover:text-[#24201C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#24201C] hover:bg-[#3A342E] text-[#FAF8F3] font-bold rounded shadow-sm"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
