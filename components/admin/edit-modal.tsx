'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'url' | 'number';
  required?: boolean;
  placeholder?: string;
  value?: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  title: string;
  fields: FormField[];
  initialData?: any;
  loading?: boolean;
}

export default function EditModal({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  fields,
  initialData = {},
  loading = false
}: EditModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  // Initialize form data when modal opens
  if (isOpen && Object.keys(formData).length === 0) {
    const initData: any = {
      isVisible: true,
      order: 1,
      ...initialData
    };
    
    fields.forEach(field => {
      if (initData[field.key] === undefined) {
        initData[field.key] = field.value || '';
      }
    });
    
    setFormData(initData);
  }

  // Reset form data when modal closes
  if (!isOpen && Object.keys(formData).length > 0) {
    setFormData({});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={saving}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <Textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [field.key]: e.target.value
                    }))}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full"
                  />
                ) : (
                  <Input
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [field.key]: e.target.value
                    }))}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full"
                  />
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <Input
                  type="number"
                  value={formData.order || 1}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    order: parseInt(e.target.value) || 1
                  }))}
                  min="1"
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={formData.isVisible !== false}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    isVisible: e.target.checked
                  }))}
                  className="rounded"
                />
                <label htmlFor="isVisible" className="text-sm font-medium text-gray-700">
                  Visible on website
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saving || loading}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}