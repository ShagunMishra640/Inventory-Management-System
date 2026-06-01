import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { createUser, updateUser } from '../controllers/userController';

const normalizeRole = (role = '') => {
  const normalized = String(role).toLowerCase().trim();

  if (normalized === 'manager' || normalized === 'inventory') {
    return 'inventory-manager';
  }

  return normalized || 'cashier';
};

export default function AddUserModal({ isOpen, onClose, user, onSaved }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'cashier',
    status: 'Active',
  });

  useEffect(() => {
    if (!isOpen) return;

    setError('');
    setSuccess('');
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      role: normalizeRole(user?.role),
      status: user?.status || 'Active',
    });
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!formData.name.trim()) {
      setError('Full name is required');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setIsSubmitting(false);
      return;
    }

    if (!user && !formData.password.trim()) {
      setError('Password is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        role: formData.role,
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      const response = user
        ? await updateUser(user._id || user.id, payload)
        : await createUser(payload);

      setSuccess(`User "${formData.name}" ${user ? 'updated' : 'added'} successfully!`);
      onSaved?.(response?.data?.user);

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'cashier',
          status: 'Active',
        });
        setSuccess('');
        onClose();
      }, 800);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to save user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-blue-50">
          <h2 className="font-bold text-lg text-slate-900">{user ? 'Edit User' : 'Add New User'}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 items-start">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mx-6 mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex gap-3 items-start">
            <CheckCircle size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-emerald-700 font-medium">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-sm font-bold text-slate-900 block mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 text-slate-900"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-900 block mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 text-slate-900"
            />
          </div>

          {!user && (
            <div>
              <label className="text-sm font-bold text-slate-900 block mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Set a temporary password"
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 text-slate-900"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-slate-900 block mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 text-slate-900 cursor-pointer"
              >
                <option value="cashier">Cashier</option>
                <option value="inventory-manager">Inventory Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-900 block mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-slate-50 text-slate-900 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-100 text-slate-900 rounded-2xl hover:bg-slate-200 font-bold transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : (user ? 'Update User' : 'Add User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
