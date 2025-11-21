import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building2, Bell, User, LogOut, Home, Upload as UploadIcon, FileText, Folder, AlertTriangle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AREAS, CONTRACTS, getContractExpiryStatus, getDocumentsFromStorage } from '../data/mockData';
import UploadModal from '../components/UploadModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const ExecutionWorkspace = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('lifecycle');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getFilteredContracts = () => {
    if (selectedArea === 'All Areas') return CONTRACTS;
    return CONTRACTS.filter(c => c.area === selectedArea);
  };

  const getExpiringContracts = () => {
    return CONTRACTS.filter(contract => {
      const status = getContractExpiryStatus(contract.endDate);
      return status === 'warning' || status === 'critical';
    }).sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
  };

  const getAreaDocuments = (area) => {
    const allDocs = getDocumentsFromStorage();
    return allDocs.filter(doc => {
      if (doc.workspace !== 'execution') return false;
      if (area === 'All Areas') return true;
      return doc.area === area;
    });
  };

  const groupDocumentsByCategory = (documents) => {
    const groups = {
      'Administration Management': [],
      'Deviation Management': []
    };

    documents.forEach(doc => {
      if (doc.category === 'Administration Document' || doc.category === 'Minutes of Meeting') {
        groups['Administration Management'].push(doc);
      } else if (doc.category === 'Deviation Form') {
        groups['Deviation Management'].push(doc);
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
          <h2 className="text-4xl font-light text-slate-800 mb-2">Execution Phase</h2>
          <p className="text-slate-500">Contract Lifecycle Management & Monitoring</p>
        </div>

        {/* Area Filter */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">Filter by Area:</label>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Areas">All Areas</SelectItem>
              {AREAS.map((area) => (
                <SelectItem key={area} value={area}>{area}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm border border-slate-200">
            <TabsTrigger value="lifecycle" className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Contract Lifecycle
            </TabsTrigger>
            <TabsTrigger value="reminders" className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Expiry Reminders
            </TabsTrigger>
          </TabsList>

          {/* Contract Lifecycle Tab */}
          <TabsContent value="lifecycle" className="space-y-6">
            {/* Active Contracts */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-slate-800">Active Contracts</h3>
                  <Button
                    onClick={() => setUploadModalOpen(true)}
                    className="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2"
                  >
                    <UploadIcon className="w-4 h-4" />
                    Upload Document
                  </Button>
                </div>

                <div className="space-y-4">
                  {getFilteredContracts().map((contract) => {
                    const expiryStatus = getContractExpiryStatus(contract.endDate);
                    const statusColors = {
                      normal: 'border-l-[#007d79] bg-slate-50',
                      warning: 'border-l-yellow-500 bg-yellow-50',
                      critical: 'border-l-red-500 bg-red-50'
                    };

                    return (
                      <div
                        key={contract.id}
                        className={`border-l-4 ${statusColors[expiryStatus]} p-4 rounded-lg hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-semibold text-lg text-slate-800">{contract.id}</p>
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {contract.area}
                              </span>
                              {expiryStatus !== 'normal' && (
                                <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
                                  expiryStatus === 'critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {expiryStatus === 'critical' ? <AlertCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                  {expiryStatus === 'critical' ? 'Expiring Soon' : 'Warning'}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-700 mb-1">{contract.title}</p>
                            <p className="text-sm text-slate-600 mb-2">{contract.vendorName}</p>
                            <div className="flex gap-4 text-sm">
                              <span className="text-slate-600">
                                <strong>Value:</strong> ${contract.value.toLocaleString()}
                              </span>
                              <span className="text-slate-600">
                                <strong>Start:</strong> {new Date(contract.startDate).toLocaleDateString()}
                              </span>
                              <span className="text-slate-600">
                                <strong>End:</strong> {new Date(contract.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Document Management */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Contract Documents</h3>
                {(() => {
                  const documents = getAreaDocuments(selectedArea);
                  const groupedDocs = groupDocumentsByCategory(documents);

                  return (
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
                                  <div className="flex items-start gap-3">
                                    <FileText className="w-5 h-5 text-[#007d79] mt-1" />
                                    <div className="flex-1">
                                      <p className="font-medium text-slate-800 mb-1">
                                        {doc.fileName || doc.linkUrl}
                                      </p>
                                      <p className="text-sm text-slate-600 mb-2">{doc.description}</p>
                                      {doc.contractId && (
                                        <p className="text-xs text-slate-500 mb-2">
                                          Related: {doc.contractId}
                                        </p>
                                      )}
                                      <div className="flex gap-2 flex-wrap">
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                          {doc.category}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                                          {doc.area}
                                        </span>
                                      </div>
                                    </div>
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
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expiry Reminders Tab */}
          <TabsContent value="reminders">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Contract Expiry Reminders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Contract ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Title</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Vendor</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Area</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">End Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getExpiringContracts().map((contract) => {
                        const status = getContractExpiryStatus(contract.endDate);
                        const rowColor = status === 'critical' ? 'bg-red-100' : 'bg-yellow-100';

                        return (
                          <tr key={contract.id} className={`${rowColor} border-b border-slate-200`}>
                            <td className="py-3 px-4 font-medium text-slate-800">{contract.id}</td>
                            <td className="py-3 px-4 text-slate-700">{contract.title}</td>
                            <td className="py-3 px-4 text-slate-700">{contract.vendorName}</td>
                            <td className="py-3 px-4">
                              <span className="text-xs px-2 py-1 bg-white rounded">{contract.area}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-700">
                              {new Date(contract.endDate).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`flex items-center gap-1 text-sm font-medium ${
                                status === 'critical' ? 'text-red-700' : 'text-yellow-700'
                              }`}>
                                {status === 'critical' ? (
                                  <><AlertCircle className="w-4 h-4" /> Critical (&lt;3 months)</>
                                ) : (
                                  <><AlertTriangle className="w-4 h-4" /> Warning (&lt;6 months)</>
                                )}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {getExpiringContracts().length === 0 && (
                    <div className="text-center py-12">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                      <p className="text-slate-500">No contracts nearing expiration</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        workspace="execution"
        preSelectedArea={selectedArea !== 'All Areas' ? selectedArea : ''}
      />
    </div>
  );
};

export default ExecutionWorkspace;
