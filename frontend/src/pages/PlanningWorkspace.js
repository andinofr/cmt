import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building2, Bell, User, LogOut, Home, Download, FileText, Folder, Upload as UploadIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CONTRACT_TEMPLATES, AREAS, getDocumentsFromStorage } from '../data/mockData';
import UploadModal from '../components/UploadModal';
import { toast } from '../hooks/use-toast';

const PlanningWorkspace = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('catalogue');
  const [selectedArea, setSelectedArea] = useState('Morowali');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDownload = (fileName) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${fileName}...`
    });
  };

  const getAreaDocuments = (area) => {
    const allDocs = getDocumentsFromStorage();
    return allDocs.filter(doc => doc.workspace === 'planning' && doc.area === area);
  };

  const groupDocumentsByCategory = (documents) => {
    const groups = {
      'Contract Request Forms': [],
      'Procurement Committee': [],
      'Submitted Docs': []
    };

    documents.forEach(doc => {
      if (doc.category === 'Contract Request Form') {
        groups['Contract Request Forms'].push(doc);
      } else if (doc.category === 'Procurement Request') {
        groups['Procurement Committee'].push(doc);
      } else {
        groups['Submitted Docs'].push(doc);
      }
    });

    return groups;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#007d79] rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">CMT PORTAL</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/workspace-selector')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-slate-500">Welcome,</p>
              <p className="font-semibold text-slate-800">{user?.name}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="w-5 h-5 text-slate-600" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-5 h-5 text-slate-600" />
            </Button>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-light text-slate-800 mb-2">Planning Phase</h2>
          <p className="text-slate-500">Contract Reference Library & Active Planning Documents</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm border border-slate-200">
            <TabsTrigger value="catalogue" className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Contract Catalogue
            </TabsTrigger>
            <TabsTrigger value="sharepoint" className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Planning SharePoint
            </TabsTrigger>
          </TabsList>

          {/* Contract Catalogue Tab */}
          <TabsContent value="catalogue" className="space-y-8">
            {/* Work Package - Pricing Catalogue */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Work Package - Pricing Catalogue</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONTRACT_TEMPLATES.pricingCatalogue.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {template.code} Cost Structure of {template.category}
                          </p>
                          <p className="text-sm text-slate-600">{template.workName}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(template.fileName)}
                        className="hover:bg-blue-200"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Package - Scope of Works */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Work Package - Scope of Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONTRACT_TEMPLATES.scopeOfWorks.map((template) => (
                    <div
                      key={template.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {template.code} Reference Scope of Works of {template.category}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(template.fileName)}
                        className="hover:bg-blue-200"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Planning SharePoint Tab */}
          <TabsContent value="sharepoint" className="space-y-6">
            {/* Area Tabs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-slate-800">Planning Documents by Area</h3>
                <Button
                  onClick={() => setUploadModalOpen(true)}
                  className="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2"
                >
                  <UploadIcon className="w-4 h-4" />
                  Upload Document
                </Button>
              </div>

              <Tabs value={selectedArea} onValueChange={setSelectedArea}>
                <TabsList className="w-full justify-start bg-slate-100 p-1">
                  {AREAS.map((area) => (
                    <TabsTrigger
                      key={area}
                      value={area}
                      className="data-[state=active]:bg-white px-6 py-2"
                    >
                      {area}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {AREAS.map((area) => {
                  const documents = getAreaDocuments(area);
                  const groupedDocs = groupDocumentsByCategory(documents);

                  return (
                    <TabsContent key={area} value={area} className="mt-6">
                      <div className="space-y-6">
                        {Object.entries(groupedDocs).map(([groupName, docs]) => (
                          <div key={groupName}>
                            <div className="flex items-center gap-3 mb-4">
                              <Folder className="w-5 h-5 text-[#007d79]" />
                              <h4 className="font-semibold text-lg text-slate-800">{groupName}</h4>
                              <span className="text-sm text-slate-500">({docs.length})</span>
                            </div>
                            {docs.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
                                {docs.map((doc) => (
                                  <div
                                    key={doc.id}
                                    className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                                  >
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <p className="font-medium text-slate-800 mb-1">
                                          {doc.fileName || doc.linkUrl}
                                        </p>
                                        <p className="text-sm text-slate-600 mb-2">{doc.description}</p>
                                        <div className="flex gap-2 flex-wrap">
                                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                            {doc.category}
                                          </span>
                                          <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                                            {new Date(doc.uploadDate).toLocaleDateString()}
                                          </span>
                                        </div>
                                      </div>
                                      <Button size="sm" variant="ghost">
                                        <Download className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                <Folder className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                <p className="text-slate-500">No documents in this category</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        workspace="planning"
        preSelectedArea={selectedArea}
      />
    </div>
  );
};

export default PlanningWorkspace;
