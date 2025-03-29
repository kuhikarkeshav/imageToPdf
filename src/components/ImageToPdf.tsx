'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import { FiUploadCloud, FiTrash2, FiDownload, FiX, FiImage } from 'react-icons/fi';

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

const ImageToPdf = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | '' }>({
    message: '',
    type: '',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const validFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) {
      showNotification('Please upload valid image files', 'error');
      return;
    }

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }));

    setImages(prev => [...prev, ...newImages]);
    showNotification(`${validFiles.length} image${validFiles.length > 1 ? 's' : ''} added successfully`, 'success');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    }
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const clearAllImages = () => {
    images.forEach(image => URL.revokeObjectURL(image.preview));
    setImages([]);
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      showNotification('Please add at least one image', 'error');
      return;
    }

    setConverting(true);
    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // Create an image object for dimensions
        const img = new Image();
        img.src = image.preview;
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            // If not the first page, add a new page
            if (!isFirstPage) {
              pdf.addPage();
            }
            isFirstPage = false;

            // Calculate dimensions to fit in PDF while maintaining aspect ratio
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const widthRatio = pdfWidth / img.width;
            const heightRatio = pdfHeight / img.height;
            
            // Use the smaller ratio to ensure image fits on page
            const ratio = Math.min(widthRatio, heightRatio) * 0.9; // 0.9 to add some margin
            
            const imgWidth = img.width * ratio;
            const imgHeight = img.height * ratio;
            
            // Center the image on the page
            const x = (pdfWidth - imgWidth) / 2;
            const y = (pdfHeight - imgHeight) / 2;
            
            pdf.addImage(image.preview, 'JPEG', x, y, imgWidth, imgHeight);
            resolve();
          };
        });
      }

      // Save the PDF
      pdf.save(`images-to-pdf-${new Date().toISOString().slice(0, 10)}.pdf`);
      showNotification('PDF generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      showNotification('Error generating PDF. Please try again.', 'error');
    } finally {
      setConverting(false);
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Notification */}
      <AnimatePresence>
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-6 p-4 rounded-lg text-white text-center ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Upload area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4"
          >
            <FiUploadCloud className="w-10 h-10 text-blue-500" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Drag & Drop Your Images Here</h3>
          <p className="text-gray-500 mb-4">or click to browse your files</p>
          <p className="text-sm text-gray-400">Supported formats: JPG, PNG, GIF, WEBP</p>
        </div>
      </div>
      
      {/* Image preview */}
      {images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Selected Images ({images.length})</h3>
            <button
              onClick={clearAllImages}
              className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium"
            >
              <FiTrash2 className="mr-1" /> Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className="relative group rounded-lg overflow-hidden shadow-md"
              >
                <div className="relative pb-[75%]">
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <FiX className="text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs truncate px-2 py-1">
                  {image.file.name}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={convertToPdf}
              disabled={converting || images.length === 0}
              className={`flex items-center px-6 py-3 rounded-lg text-white font-medium 
              ${converting || images.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
            >
              {converting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating PDF...
                </>
              ) : (
                <>
                  <FiDownload className="mr-2" /> Convert to PDF
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageToPdf; 