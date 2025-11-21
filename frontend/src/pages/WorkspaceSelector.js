import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { FileText, Settings, BarChart3, Building2, Bell, User, LogOut } from 'lucide-react';

const WorkspaceSelector = () => {
  const { user, isCMTTeam, logout } = useAuth();
  const navigate = useNavigate();

  const workspaces = [
    {
      id: 'planning',
      title: 'Planning',
      description: 'Contract Catalogue & Planning SharePoint',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      available: true
    },
    {
      id: 'execution',
      title: 'Execution',
      description: 'Contract Diagnostic & Lifecycle Management',
      icon: Settings,
      color: 'from-emerald-500 to-emerald-600',
      available: true
    },
    {
      id: 'central-hub',
      title: 'Internal',
      description: 'Reports, Innovation & Central Dashboard',
      icon: BarChart3,
      color: 'from-[#007d79] to-[#005b58]',
      available: isCMTTeam
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#007d79] rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">CMT PORTAL</h1>
            </div>
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
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-slate-800 mb-4">Choose Your Workspace</h2>
          <p className="text-lg text-slate-500">Select a workspace to access contract management tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workspaces.map((workspace) => {
            if (!workspace.available) return null;

            const Icon = workspace.icon;

            return (
              <button
                key={workspace.id}
                onClick={() => navigate(`/${workspace.id}`)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-[#007d79]/30"
              >
                <div className="p-8">
                  {/* Icon Section */}
                  <div className="mb-6 flex justify-center">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${workspace.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-slate-800 mb-2">{workspace.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{workspace.description}</p>
                  </div>

                  {/* Sub-items */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="space-y-2">
                      {workspace.id === 'planning' && (
                        <>
                          <div className="text-sm text-slate-600 flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#007d79]"></div>
                            Contract Catalogue
                          </div>
                          <div className="text-sm text-slate-600 flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#007d79]"></div>
                            Planning SharePoint
                          </div>
                        </>
                      )}
                      {workspace.id === 'execution' && (
                        <>
                          <div className="text-sm text-slate-600 flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#007d79]"></div>
                            Contract Diagnostic
                          </div>
                          <div className="text-sm text-slate-600 flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#007d79]"></div>
                            Lifecycle Management
                          </div>
                        </>
                      )}
                      {workspace.id === 'central-hub' && (
                        <>
                          <div className="text-sm text-slate-600 flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#007d79]"></div>
                            Dashboard & Reports
                          </div>
                          <div className="text-sm text-slate-600 flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#007d79]"></div>
                            Innovation Centre
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#007d79]/0 to-[#007d79]/0 group-hover:from-[#007d79]/5 group-hover:to-[#007d79]/10 transition-all duration-300 pointer-events-none"></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSelector;
