import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Upload, FileText, Link as LinkIcon } from 'lucide-react';
import { AREAS, CONTRACTS, DOCUMENT_CATEGORIES, addDocument } from '../data/mockData';
import { toast } from '../hooks/use-toast';

const UploadModal = ({ open, onClose, workspace, preSelectedArea }) => {
  const [documentType, setDocumentType] = useState('file');
  const [area, setArea] = useState(preSelectedArea || '');
  const [contract, setContract] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    if (!area || !category || !description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    if (documentType === 'file' && !fileName) {
      toast({
        title: 'No File Selected',
        description: 'Please select a file to upload.',
        variant: 'destructive'
      });
      return;
    }

    if (documentType === 'link' && !linkUrl) {
      toast({
        title: 'No Link Provided',
        description: 'Please provide a link URL.',
        variant: 'destructive'
      });
      return;
    }

    const newDocument = {
      documentType,
      area,
      contractId: contract || null,
      category,
      description,
      fileName: documentType === 'file' ? fileName : null,
      linkUrl: documentType === 'link' ? linkUrl : null,
      workspace
    };

    addDocument(newDocument);

    toast({
      title: 'Document Uploaded',
      description: `${documentType === 'file' ? fileName : 'Link'} has been uploaded successfully.`
    });

    // Reset form
    setDocumentType('file');
    setArea(preSelectedArea || '');
    setContract('');
    setCategory('');
    setDescription('');
    setFileName('');
    setLinkUrl('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Upload Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Document Type */}
          <div>
            <Label className="mb-3 block">Document Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setDocumentType('file')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  documentType === 'file'
                    ? 'border-[#007d79] bg-[#007d79]/5'
                    : 'border-slate-200 hover:border-[#007d79]/50'
                }`}
              >
                <FileText className="w-6 h-6 mx-auto mb-2 text-[#007d79]" />
                <p className="font-medium">File Upload</p>
              </button>
              <button
                onClick={() => setDocumentType('link')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  documentType === 'link'
                    ? 'border-[#007d79] bg-[#007d79]/5'
                    : 'border-slate-200 hover:border-[#007d79]/50'
                }`}
              >
                <LinkIcon className="w-6 h-6 mx-auto mb-2 text-[#007d79]" />
                <p className="font-medium">Link</p>
              </button>
            </div>
          </div>

          {/* File/Link Input */}
          {documentType === 'file' ? (
            <div>
              <Label htmlFor="file-upload" className="mb-2 block">Select File *</Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#007d79] transition-colors cursor-pointer">
                <Upload className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <p className="text-sm text-slate-600 mb-1">
                    {fileName || 'Click to browse or drag and drop'}
                  </p>
                  <p className="text-xs text-slate-400">PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
                </label>
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="link-url" className="mb-2 block">Link URL *</Label>
              <Input
                id="link-url"
                type="url"
                placeholder="https://example.com/document"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
            </div>
          )}

          {/* Area Select */}
          <div>
            <Label className="mb-2 block">Area *</Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {AREAS.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contract Select (Optional) */}
          {workspace === 'execution' && (
            <div>
              <Label className="mb-2 block">Related Contract (Optional)</Label>
              <Select value={contract} onValueChange={setContract}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {CONTRACTS.filter(c => !area || c.area === area).map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.id} - {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Category Select */}
          <div>
            <Label className="mb-2 block">Document Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="mb-2 block">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter document description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-[#007d79] hover:bg-[#006663]">
            Upload Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
