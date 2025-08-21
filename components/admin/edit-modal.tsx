'use client';

import { useState, useCallback, useEffect } from 'react';
import { X, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'url' | 'number' | 'radio';
  required?: boolean;
  placeholder?: string;
  value?: string;
  options?: { label: string; value: string | boolean }[];
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
  
  // Undo/Redo state
  const [formHistory, setFormHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && fields.length > 0) {
      const initData: any = {};
      
      // First, set all field values from initialData or defaults
      fields.forEach(field => {
        initData[field.key] = initialData?.[field.key] || field.value || '';
      });
      
      // Then set the standard fields
      initData.isVisible = initialData?.isVisible ?? true;
      initData.order = initialData?.order ?? 1;
      
      console.log('Initializing form data with:', initData, 'from initialData:', initialData);
      setFormData(initData);
      
      // Initialize history with the initial state
      setFormHistory([initData]);
      setHistoryIndex(0);
    }
  }, [isOpen, fields.length, initialData?.id]);

  // Reset form data when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({});
      setFormHistory([]);
      setHistoryIndex(0);
    }
  }, [isOpen]);

  // Enhanced form data setter that tracks history
  const updateFormData = useCallback((newData: any) => {
    setFormData(newData);
    
    // Add to history (remove any future history if we're not at the end)
    const newHistory = formHistory.slice(0, historyIndex + 1);
    newHistory.push(newData);
    setFormHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [formHistory, historyIndex]);

  // Undo function
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setFormData(formHistory[prevIndex]);
    }
  }, [historyIndex, formHistory]);

  // Redo function
  const redo = useCallback(() => {
    if (historyIndex < formHistory.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setFormData(formHistory[nextIndex]);
    }
  }, [historyIndex, formHistory]);

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
          
          {/* Undo/Redo Controls */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={saving || historyIndex === 0}
              className="flex items-center gap-1"
            >
              <Undo className="h-4 w-4" />
              Undo
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={saving || historyIndex >= formHistory.length - 1}
              className="flex items-center gap-1"
            >
              <Redo className="h-4 w-4" />
              Redo
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
              disabled={saving}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
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
                    onChange={(e) => updateFormData({
                      ...formData,
                      [field.key]: e.target.value
                    })}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className="w-full"
                  />
                ) : field.type === 'radio' ? (
                  <div className="flex gap-4">
                    {field.options?.map((option) => (
                      <label key={String(option.value)} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={field.key}
                          value={String(option.value)}
                          checked={String(formData[field.key]) === String(option.value)}
                          onChange={(e) => updateFormData({
                            ...formData,
                            [field.key]: option.value
                          })}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <Input
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => updateFormData({
                      ...formData,
                      [field.key]: e.target.value
                    })}
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
                  onChange={(e) => setFormData((prev: any) => ({
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
                  onChange={(e) => setFormData((prev: any) => ({
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