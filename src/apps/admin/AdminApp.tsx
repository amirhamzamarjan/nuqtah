import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout, AdminTab } from './AdminLayout';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminProductsTab } from './AdminProductsTab';
import { AdminInventoryTab } from './AdminInventoryTab';
import { AdminCategoriesTab } from './AdminCategoriesTab';
import { AdminOffersTab } from './AdminOffersTab';
import { AdminOrdersTab } from './AdminOrdersTab';
import { AdminScreenTab } from './AdminScreenTab';
import { AdminInstituteTab } from './AdminInstituteTab';
import { AdminSettingsTab } from './AdminSettingsTab';

export const AdminApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && <AdminOverviewTab setActiveTab={setActiveTab} />}
      {activeTab === 'products' && <AdminProductsTab />}
      {activeTab === 'inventory' && <AdminInventoryTab />}
      {activeTab === 'categories' && <AdminCategoriesTab />}
      {activeTab === 'offers' && <AdminOffersTab />}
      {activeTab === 'orders' && <AdminOrdersTab />}
      {activeTab === 'screen' && <AdminScreenTab />}
      {activeTab === 'institute' && <AdminInstituteTab />}
      {activeTab === 'settings' && <AdminSettingsTab />}
    </AdminLayout>
  );
};
