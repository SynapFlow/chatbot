"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentUpload = DocumentUpload;
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
const outline_1 = require("@heroicons/react/24/outline");
const api_1 = require("@/lib/api");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
function DocumentUpload() {
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const [uploadProgress, setUploadProgress] = (0, react_1.useState)(0);
    const onDrop = async (acceptedFiles) => {
        for (const file of acceptedFiles) {
            setUploading(true);
            setUploadProgress(0);
            try {
                await api_1.documentsApi.uploadDocument(file, (progress) => {
                    setUploadProgress(progress);
                });
                react_hot_toast_1.default.success(`${file.name} uploaded successfully`);
            }
            catch (error) {
                react_hot_toast_1.default.error(`Failed to upload ${file.name}`);
            }
            finally {
                setUploading(false);
                setUploadProgress(0);
            }
        }
    };
    const { getRootProps, getInputProps, isDragActive } = (0, react_dropzone_1.useDropzone)({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt'],
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        multiple: true,
        disabled: uploading,
    });
    return (<div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Upload Documents</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload documents to make them searchable in chat conversations.
        </p>
      </div>

      <div {...getRootProps()} className={`
          relative rounded-lg border-2 border-dashed p-12 text-center transition-colors
          ${isDragActive
            ? 'border-primary-400 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}>
        <input {...getInputProps()}/>
        
        <outline_1.CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400"/>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900">
            {isDragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PDF, DOC, DOCX, TXT, CSV, XLS, XLSX up to 50MB each
          </p>
        </div>
        
        {uploading && (<div className="mt-4">
            <div className="bg-gray-200 rounded-full h-2 w-full max-w-xs mx-auto">
              <div className="bg-primary-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}/>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Uploading... {uploadProgress}%
            </p>
          </div>)}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Supported Formats</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          {[
            { ext: 'PDF', desc: 'Portable Document Format' },
            { ext: 'DOC/DOCX', desc: 'Microsoft Word' },
            { ext: 'TXT', desc: 'Plain Text' },
            { ext: 'CSV', desc: 'Comma Separated Values' },
            { ext: 'XLS/XLSX', desc: 'Microsoft Excel' },
        ].map((format) => (<div key={format.ext} className="flex items-center gap-x-2">
              <outline_1.DocumentTextIcon className="h-4 w-4 text-gray-400"/>
              <span>
                <strong>{format.ext}</strong> - {format.desc}
              </span>
            </div>))}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=DocumentUpload.js.map