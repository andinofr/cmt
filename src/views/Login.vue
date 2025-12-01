<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
    <!-- Header -->
    <div class="bg-[#007d79] text-white py-6 px-8 shadow-lg">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <Building2 class="w-7 h-7" />
        </div>
        <div>
          <h1 class="text-2xl font-bold tracking-tight">CMT PORTAL</h1>
          <p class="text-sm text-white/80">Contract Management System</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center p-8">
      <Card class="w-full max-w-2xl shadow-xl border-0">
        <CardContent class="p-12">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-semibold text-slate-800 mb-2">Sign In</h2>
            <p class="text-slate-500 mb-6">Choose your authentication method</p>
          </div>

          <!-- Authentication Method Tabs -->
          <div class="flex space-x-1 mb-8 bg-slate-100 p-1 rounded-lg overflow-hidden">
            <button
              @click="selectedAuthMethod = 'application'"
              :class="`flex-1 py-3 px-2 sm:px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedAuthMethod === 'application'
                  ? 'bg-white text-[#007d79] shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`">
              <Shield class="w-4 h-4 flex-shrink-0" />
              <span class="hidden sm:inline">Application Login</span>
            </button>
            <button
              @click="selectedAuthMethod = 'frontgate'"
              :class="`flex-1 py-3 px-2 sm:px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedAuthMethod === 'frontgate'
                  ? 'bg-white text-[#007d79] shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`">
              <Key class="w-4 h-4 flex-shrink-0" />
              <span class="hidden sm:inline">Frontgate Login</span>
            </button>
            <button
              @click="selectedAuthMethod = 'windows'"
              :class="`flex-1 py-3 px-2 sm:px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedAuthMethod === 'windows'
                  ? 'bg-white text-[#007d79] shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`">
              <Monitor class="w-4 h-4 flex-shrink-0" />
              <span class="hidden sm:inline">Windows Auth</span>
            </button>
          </div>

          <!-- Application Login Form -->
          <div v-if="selectedAuthMethod === 'application'" class="space-y-6">
            <div class="space-y-4">
              <div>
                <Label for="app-username" className="text-base mb-2 block">Username</Label>
                <Input
                  id="app-username"
                  type="text"
                  placeholder="Enter username"
                  v-model="appLogin.username"
                  class="h-12 text-base" />
              </div>
              <div>
                <Label for="app-password" className="text-base mb-2 block">Password</Label>
                <Input
                  id="app-password"
                  type="password"
                  placeholder="Enter password"
                  v-model="appLogin.password"
                  class="h-12 text-base" />
              </div>
            </div>

            <Button
              @click="handleApplicationLogin"
              :disabled="!appLogin.username.trim() || !appLogin.password.trim()"
              className="w-full h-14 text-lg bg-[#007d79] hover:bg-[#006663] transition-colors">
              Sign In with Application Account
            </Button>
          </div>

          <!-- Frontgate Login Form -->
          <div v-if="selectedAuthMethod === 'frontgate'" class="space-y-6">
            <div class="space-y-4">
              <div>
                <Label for="frontgate-username" className="text-base mb-2 block">Username</Label>
                <Input
                  id="frontgate-username"
                  type="text"
                  placeholder="Enter username"
                  v-model="frontgateLogin.username"
                  class="h-12 text-base" />
              </div>
              <div>
                <Label for="frontgate-password" className="text-base mb-2 block">Password</Label>
                <Input
                  id="frontgate-password"
                  type="password"
                  placeholder="Enter password"
                  v-model="frontgateLogin.password"
                  class="h-12 text-base" />
              </div>
            </div>

            <Button
              @click="handleFrontgateLogin"
              :disabled="!frontgateLogin.username.trim() || !frontgateLogin.password.trim()"
              className="w-full h-14 text-lg bg-[#007d79] hover:bg-[#006663] transition-colors">
              Sign In with Frontgate Account
            </Button>
          </div>

          <!-- Windows Authentication -->
          <div v-if="selectedAuthMethod === 'windows'" class="space-y-6">
            <div class="text-center">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor class="w-10 h-10 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold text-slate-800 mb-2">Windows Authentication</h3>
              <p class="text-slate-500 mb-4 pb-7">Sign in using your Windows credentials</p>

              <Button
                @click="handleWindowsAuth"
                :disabled="!selectedAppUser.trim()"
                className="w-full h-14 text-lg bg-[#007d79] hover:bg-[#006663] transition-colors">
                Sign In with Windows Authentication
              </Button>
            </div>
          </div>

          <!-- User Selection - Available for all methods -->
          <div v-if="allowSelectUser" class="mt-8">
            <Label className="text-xl text-bold mb-4 block text-center">Select User</Label>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                v-for="user in authStore.mockUsers.filter((u) => u.authProvider === 'application')"
                :key="user.id"
                @click="selectUser(user)"
                :class="`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedAppUser === user.username
                    ? 'border-[#007d79] bg-[#007d79]/5 shadow-lg'
                    : 'border-slate-200 hover:border-[#007d79]/50 hover:bg-slate-50'
                }`">
                <div class="min-w-0">
                  <p class="font-semibold text-slate-800 truncate text-sm">{{ user.name }}</p>
                  <p class="text-xs text-slate-600 truncate">{{ authStore.getRoleDisplayName(user.role) }}</p>
                </div>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, type User } from "@/stores/auth";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { Shield, Key, Monitor } from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();
const allowSelectUser = true;

const selectedAuthMethod = ref<"application" | "frontgate" | "windows">("application");

// Selected users for each authentication method
const selectedAppUser = ref("");

// Form data for different authentication methods
const appLogin = ref({
  username: "",
  password: "",
});

const frontgateLogin = ref({
  username: "",
  password: "",
});

// Get user info for selected users
const selectedAppUserInfo = computed(() => {
  return authStore.mockUsers.find((u) => u.username === selectedAppUser.value) || null;
});

// Handle user selection from button grid
const selectUser = (user: User) => {
  selectedAppUser.value = user.username;
  appLogin.value.username = user.username;
  appLogin.value.password = "password"; // In real app, this would be handled differently

  frontgateLogin.value.username = user.username;
  frontgateLogin.value.password = "password"; // Same password as application (unified credentials)
};

// Handle application login
const handleApplicationLogin = () => {
  if (appLogin.value.username.trim() && appLogin.value.password.trim()) {
    const user = authStore.findUser(appLogin.value.username.trim(), "application");
    if (user) {
      // In a real application, you would validate password here
      authStore.login(user);
      router.push("/workspace-selector");
    } else {
      alert("Invalid credentials. Please select a valid user from the list.");
    }
  }
};

// Handle frontgate login
const handleFrontgateLogin = () => {
  if (frontgateLogin.value.username.trim() && frontgateLogin.value.password.trim()) {
    const user = authStore.findUser(frontgateLogin.value.username.trim(), "frontgate");
    if (user) {
      // In a real application, you would validate Frontgate password here
      authStore.login(user);
      router.push("/workspace-selector");
    } else {
      alert("Invalid credentials. Please select a valid user from the list.");
    }
  }
};

// Handle Windows authentication
const handleWindowsAuth = () => {
  if (selectedAppUser.value.trim()) {
    const user = authStore.findUser(selectedAppUser.value.trim(), "windows");
    if (user) {
      // In a real application, you would validate Windows credentials here
      authStore.login(user);
      router.push("/workspace-selector");
    } else {
      alert("Invalid credentials. Please use your username and password from Application or Frontgate login.");
    }
  }
};
</script>
