import Image from "next/image";
import ImageToPdf from '@/components/ImageToPdf';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">ImageToPDF</h1>
            </div>
            <nav>
              <ul className="flex space-x-8">
                <li><a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it works</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Convert Your Images to PDF
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, fast and free tool to convert your images to PDF documents in seconds.
              No registration required, and your files never leave your computer.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <ImageToPdf />
          </div>
        </section>

        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Bulk Conversion</h3>
              <p className="text-gray-600">Convert multiple images at once and arrange them in any order you want.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-gray-600">Your files never leave your computer. All processing happens right in your browser.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Get your PDFs in seconds. No waiting for uploads or downloads.</p>
            </div>
          </div>
        </section>
        
        <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mx-auto">
                  1
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-blue-300"></div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Upload Images</h3>
              <p className="text-gray-600">Drag & drop your images or click to browse your files</p>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mx-auto">
                  2
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full border-t-2 border-dashed border-blue-300"></div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Preview & Arrange</h3>
              <p className="text-gray-600">Review your images and remove any you don't want</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">Convert & Download</h3>
              <p className="text-gray-600">Click the convert button and save your PDF</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-sm">
                P
              </div>
              <span className="ml-2 text-xl font-semibold">ImageToPDF</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {new Date().getFullYear()} ImageToPDF. All rights reserved.</p>
              <p className="text-gray-400 text-sm mt-1">Convert images to PDF easily and securely.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
