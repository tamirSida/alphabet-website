'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/lib/cms/admin-context';

interface CloudinaryFile {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  bytes: number;
  created_at: string;
}

export default function AdminFilesPage() {
  const { isAdminMode } = useAdmin();
  const [files, setFiles] = useState<CloudinaryFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFilename, setNewFilename] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!isAdminMode) {
      window.location.href = '/';
    }
  }, [isAdminMode]);

  // Load files from Cloudinary
  const loadFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/files');
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminMode) {
      loadFiles();
    }
  }, [isAdminMode]);

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('folder', 'alpha-bet/admin-files');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSelectedFile(null);
        await loadFiles(); // Refresh the file list
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Handle file delete
  const handleDelete = async (publicId: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return;

    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (response.ok) {
        await loadFiles(); // Refresh the file list
      } else {
        const error = await response.json();
        alert(`Delete failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed');
    }
  };

  // Handle file rename
  const handleRename = async (publicId: string) => {
    if (!newFilename.trim()) return;

    try {
      const response = await fetch('/api/upload', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId, newFilename: newFilename.trim() }),
      });

      if (response.ok) {
        setRenamingFile(null);
        setNewFilename('');
        await loadFiles(); // Refresh the file list
      } else {
        const error = await response.json();
        alert(`Rename failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Rename error:', error);
      alert('Rename failed');
    }
  };

  // Copy URL to clipboard
  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isAdminMode) {
    return <div>Access denied</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-cloud text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Black Ops One', cursive" }}>
                File Manager
              </h1>
              <p className="text-gray-400">Manage Cloudinary files for Alpha-Bet CMS</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Admin
            </a>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-upload"></i>
            Upload New File
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select File
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                accept="*/*"
              />
            </div>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner animate-spin"></i>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt"></i>
                  Upload
                </>
              )}
            </button>
          </div>
          
          {selectedFile && (
            <div className="mt-3 text-sm text-gray-300">
              Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
            </div>
          )}
        </div>

        {/* Files List */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <i className="fas fa-files"></i>
              Uploaded Files ({files.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <i className="fas fa-spinner animate-spin text-white text-2xl mb-4"></i>
              <p className="text-gray-300">Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="p-8 text-center">
              <i className="fas fa-folder-open text-gray-500 text-4xl mb-4"></i>
              <p className="text-gray-400">No files uploaded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-4 text-gray-300 font-medium">File</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Size</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Format</th>
                    <th className="text-left p-4 text-gray-300 font-medium">URL</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => (
                    <tr key={file.public_id} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <i className="fas fa-file text-blue-400"></i>
                          </div>
                          <div className="flex-1">
                            {renamingFile === file.public_id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={newFilename}
                                  onChange={(e) => setNewFilename(e.target.value)}
                                  className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm flex-1"
                                  placeholder="New filename"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleRename(file.public_id);
                                    } else if (e.key === 'Escape') {
                                      setRenamingFile(null);
                                      setNewFilename('');
                                    }
                                  }}
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleRename(file.public_id)}
                                  className="w-6 h-6 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center"
                                  title="Save"
                                >
                                  <i className="fas fa-check text-xs"></i>
                                </button>
                                <button
                                  onClick={() => {
                                    setRenamingFile(null);
                                    setNewFilename('');
                                  }}
                                  className="w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded flex items-center justify-center"
                                  title="Cancel"
                                >
                                  <i className="fas fa-times text-xs"></i>
                                </button>
                              </div>
                            ) : (
                              <div>
                                <div className="text-white font-medium">
                                  {file.original_filename || file.public_id.split('/').pop()}
                                </div>
                                <div className="text-gray-400 text-sm">
                                  {new Date(file.created_at).toLocaleDateString()}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">
                        {formatFileSize(file.bytes)}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs uppercase">
                          {file.format}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <code className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded max-w-xs truncate">
                            {file.secure_url}
                          </code>
                          <button
                            onClick={() => copyUrl(file.secure_url)}
                            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center justify-center transition-colors"
                            title="Copy URL"
                          >
                            <i className={`fas ${copiedUrl === file.secure_url ? 'fa-check' : 'fa-copy'} text-xs`}></i>
                          </button>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={file.secure_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded flex items-center justify-center transition-colors"
                            title="Open file"
                          >
                            <i className="fas fa-external-link-alt text-xs"></i>
                          </a>
                          <button
                            onClick={() => {
                              setRenamingFile(file.public_id);
                              setNewFilename(file.original_filename || file.public_id.split('/').pop() || '');
                            }}
                            className="w-8 h-8 bg-yellow-600 hover:bg-yellow-700 text-white rounded flex items-center justify-center transition-colors"
                            title="Rename file"
                          >
                            <i className="fas fa-edit text-xs"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(file.public_id, file.original_filename || 'file')}
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center transition-colors"
                            title="Delete file"
                          >
                            <i className="fas fa-trash text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-900/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <i className="fas fa-info-circle"></i>
            How to Use
          </h3>
          <div className="text-gray-300 space-y-2 text-sm">
            <p>• Upload files here to make them available for download in your CMS</p>
            <p>• Click the copy button next to any file URL to copy it to your clipboard</p>
            <p>• Use these URLs in your CMS forms where you need downloadable files</p>
            <p>• Files are stored securely in Cloudinary and accessible without authentication</p>
          </div>
        </div>

        {/* Copy confirmation */}
        {copiedUrl && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
            <i className="fas fa-check mr-2"></i>
            URL copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}