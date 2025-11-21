import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building2, Bell, User, LogOut, Home, DollarSign, FileText, AlertTriangle, Upload as UploadIcon, TrendingUp, Folder } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CONTRACTS, AREAS, getContractExpiryStatus, getDocumentsFromStorage } from '../data/mockData';
import UploadModal from '../components/UploadModal';

const CentralHub = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Calculate metrics
  const getTotalCostAvoidance = () => {
    // Simulate cost avoidance calculation (5% of total contract value)
    const totalValue = CONTRACTS.reduce((sum, contract) => sum + contract.value, 0);
    return Math.round(totalValue * 0.05);
  };

  const getActiveContractsCount = () => {
    return CONTRACTS.filter(c => c.status === 'Active').length;
  };

  const getExpiringContractsCount = () => {
    return CONTRACTS.filter(contract => {
      const status = getContractExpiryStatus(contract.endDate);
      return status === 'warning' || status === 'critical';
    }).length;
  };

  const getCentralDocuments = (area) => {
    const allDocs = getDocumentsFromStorage();
    return allDocs.filter(doc => {
      if (doc.workspace !== 'central-hub') return false;
      if (area === 'All Areas') return true;
      return doc.area === area;
    });
  };

  const groupDocumentsByCategory = (documents) => {
    const groups = {
      'Reports': [],
      'Innovation Centre': []
    };

    documents.forEach(doc => {
      if (doc.category === 'Compliance Report' || doc.category === 'Technical Specification') {
        groups['Reports'].push(doc);
      } else {
        groups['Innovation Centre'].push(doc);
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
          <h2 className="text-4xl font-light text-slate-800 mb-2">Central Hub</h2>
          <p className="text-slate-500">Dashboard Metrics & Central Repository</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm border border-slate-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="sharepoint" className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
              Central SharePoint
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Cost Avoidance */}
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-10 h-10" />
                    <TrendingUp className="w-6 h-6 opacity-70" />
                  </div>
                  <p className="text-sm opacity-90 mb-1">Total Cost Avoidance</p>
                  <p className="text-3xl font-bold">${getTotalCostAvoidance().toLocaleString()}</p>
                </div>
              </Card>

              {/* Active Contracts */}
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-10 h-10" />
                  </div>
                  <p className="text-sm opacity-90 mb-1">Active Contracts</p>
                  <p className="text-3xl font-bold">{getActiveContractsCount()}</p>
                </div>
              </Card>

              {/* Expiring Contracts */}
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <AlertTriangle className="w-10 h-10" />
                  </div>
                  <p className="text-sm opacity-90 mb-1">Expiring Soon</p>
                  <p className="text-3xl font-bold">{getExpiringContractsCount()}</p>
                </div>
              </Card>
            </div>

            {/* Contract Value by Area */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Contract Value by Area</h3>
                <div className="space-y-4">
                  {AREAS.map((area) => {
                    const areaContracts = CONTRACTS.filter(c => c.area === area);
                    const totalValue = areaContracts.reduce((sum, c) => sum + c.value, 0);
                    const percentage = (totalValue / CONTRACTS.reduce((sum, c) => sum + c.value, 0)) * 100;

                    return (
                      <div key={area}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-slate-800">{area}</span>
                            <span className="text-sm text-slate-500">({areaContracts.length} contracts)</span>
                          </div>
                          <span className="font-semibold text-slate-800">${totalValue.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#007d79] to-[#009d95] h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Request Process Status */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">Request Process Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { status: 'Pending Review', count: 8, color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
                    { status: 'In Progress', count: 12, color: 'bg-blue-100 text-blue-700 border-blue-300' },
                    { status: 'Approved', count: 24, color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
                    { status: 'Completed', count: 45, color: 'bg-slate-100 text-slate-700 border-slate-300' }
                  ].map((item) => (
                    <div key={item.status} className={`p-6 rounded-lg border-2 ${item.color}`}>
                      <p className="text-sm font-medium mb-2">{item.status}</p>
                      <p className="text-3xl font-bold">{item.count}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Central SharePoint Tab */}
          <TabsContent value="sharepoint" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-800 mb-2">Central Repository</h3>
                    <p className="text-slate-500">Reports & Innovation Centre Documents</p>
                  </div>
                  <Button
                    onClick={() => setUploadModalOpen(true)}
                    className="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2"
                  >
                    <UploadIcon className="w-4 h-4" />
                    Upload Document
                  </Button>
                </div>

                {/* Area Filter */}
                <div className="mb-6">
                  <Tabs value={selectedArea} onValueChange={setSelectedArea}>
                    <TabsList className="w-full justify-start bg-slate-100 p-1">
                      <TabsTrigger value="All Areas" className="data-[state=active]:bg-white px-6 py-2">
                        All Areas
                      </TabsTrigger>
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
                  </Tabs>
                </div>

                {/* Documents */}
                {(() => {
                  const documents = getCentralDocuments(selectedArea);
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
                                      <div className="flex gap-2 flex-wrap">
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                          {doc.category}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                                          {doc.area}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded">
                                          {new Date(doc.uploadDate).toLocaleDateString()}
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

                      {documents.length === 0 && (
                        <div className="text-center py-12">
                          <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                          <p className="text-slate-500 text-lg">No documents available</p>
                          <p className="text-slate-400 text-sm">Upload documents to get started</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        workspace="central-hub"
        preSelectedArea={selectedArea !== 'All Areas' ? selectedArea : ''}
      />
    </div>
  );
};

export default CentralHub;
