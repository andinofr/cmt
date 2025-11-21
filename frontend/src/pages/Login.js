import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Building2, Users } from 'lucide-react';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedRole && name.trim()) {
      login(selectedRole, name.trim());
      navigate('/workspace-selector');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-[#007d79] text-white py-6 px-8 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">CMT PORTAL</h1>
            <p className="text-sm text-white/80">Contract Management System</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl shadow-xl border-0">
          <CardContent className="p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-light text-slate-800 mb-2">Sign In</h2>
              <p className="text-slate-500">Select your role to access the portal</p>
            </div>

            {/* Name Input */}
            <div className="mb-8">
              <Label htmlFor="name" className="text-base mb-2 block">Your Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            {/* Role Selection */}
            <div className="mb-10">
              <Label className="text-base mb-4 block">Select Role</Label>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setSelectedRole('CMT_TEAM')}
                  className={`p-8 rounded-xl border-2 transition-all duration-200 ${
                    selectedRole === 'CMT_TEAM'
                      ? 'border-[#007d79] bg-[#007d79]/5 shadow-lg'
                      : 'border-slate-200 hover:border-[#007d79]/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedRole === 'CMT_TEAM' ? 'bg-[#007d79]' : 'bg-slate-200'
                    }`}>
                      <Building2 className={`w-8 h-8 ${
                        selectedRole === 'CMT_TEAM' ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg text-slate-800">Contract Management</p>
                      <p className="text-sm text-slate-500">Team</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedRole('GENERAL_USER')}
                  className={`p-8 rounded-xl border-2 transition-all duration-200 ${
                    selectedRole === 'GENERAL_USER'
                      ? 'border-[#007d79] bg-[#007d79]/5 shadow-lg'
                      : 'border-slate-200 hover:border-[#007d79]/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedRole === 'GENERAL_USER' ? 'bg-[#007d79]' : 'bg-slate-200'
                    }`}>
                      <Users className={`w-8 h-8 ${
                        selectedRole === 'GENERAL_USER' ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-lg text-slate-800">User Area</p>
                      <p className="text-sm text-slate-500">General Access</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              onClick={handleLogin}
              disabled={!selectedRole || !name.trim()}
              className="w-full h-14 text-lg bg-[#007d79] hover:bg-[#006663] transition-colors"
            >
              Sign In to Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
