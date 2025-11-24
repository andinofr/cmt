<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-[#007d79] rounded-lg flex items-center justify-center">
            <Building2 class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-slate-800">CMT PORTAL</h1>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-right">
            <p class="text-sm text-slate-500">Welcome,</p>
            <p class="font-semibold text-slate-800">{{ authStore.user?.name }}</p>
          </div>
          <Button variant="ghost" size="icon" class="rounded-full">
            <Bell class="w-5 h-5 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" class="rounded-full">
            <User class="w-5 h-5 text-slate-600" />
          </Button>
          <Button
            @click="handleLogout"
            variant="ghost"
            size="icon"
            class="rounded-full hover:bg-red-50 hover:text-red-600">
            <LogOut class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-16">
      <div class="text-center mb-16">
        <h2 class="text-5xl font-light text-slate-800 mb-4">Choose Your Workspace</h2>
        <p class="text-lg text-slate-500">Select a workspace to access contract management tools</p>
      </div>

      <div :class="gridClasses">
        <button
          v-for="workspace in availableWorkspaces"
          :key="workspace.id"
          @click="navigateToWorkspace(workspace.id)"
          class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-[#007d79]/30">
          <div class="p-8">
            <!-- Icon Section -->
            <div class="mb-6 flex justify-center">
              <div
                :class="`w-24 h-24 rounded-2xl bg-gradient-to-br ${workspace.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`">
                <component :is="workspace.icon" class="w-12 h-12 text-white" />
              </div>
            </div>

            <!-- Content -->
            <div class="text-center">
              <h3 class="text-2xl font-semibold text-slate-800 mb-2">{{ workspace.title }}</h3>
              <p class="text-slate-500 text-sm leading-relaxed">{{ workspace.description }}</p>
            </div>

            <!-- Sub-items -->
            <div class="mt-6 pt-6 border-t border-slate-100">
              <div class="space-y-2">
                <div
                  v-for="item in workspace.subItems"
                  :key="item"
                  class="text-sm text-slate-600 flex items-center justify-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#007d79]"></div>
                  {{ item }}
                </div>
              </div>
            </div>
          </div>

          <!-- Hover Effect -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-[#007d79]/0 to-[#007d79]/0 group-hover:from-[#007d79]/5 group-hover:to-[#007d79]/10 transition-all duration-300 pointer-events-none"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Button from "@/components/ui/button/Button.vue";
import { FileText, Settings, BarChart3, Building2, Bell, User, LogOut } from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();

interface Workspace {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  subItems: string[];
}

const workspaces: Workspace[] = [
  {
    id: "planning",
    title: "Planning",
    description: "Contract Catalogue & Planning Documents",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    subItems: ["Contract Catalogue", "Planning Documents"],
  },
  {
    id: "execution",
    title: "Execution",
    description: "Contract Diagnostic & Lifecycle Management",
    icon: Settings,
    color: "from-emerald-500 to-emerald-600",
    subItems: ["Contract Diagnostic", "Lifecycle Management"],
  },
  {
    id: "central-hub",
    title: "Internal",
    description: "Reports, Innovation & Central Dashboard",
    icon: BarChart3,
    color: "from-[#007d79] to-[#005b58]",
    subItems: ["Dashboard & Reports", "Innovation Centre"],
  },
];

const availableWorkspaces = computed(() => {
  return workspaces.filter((workspace) => {
    if (workspace.id === "central-hub") {
      return authStore.isCMTTeam;
    }
    return true;
  });
});

const gridClasses = computed(() => {
  const count = Math.min(availableWorkspaces.value.length, 3);

  if (count === 1) {
    return "grid grid-cols-1 max-w-md mx-auto";
  } else if (count === 2) {
    return "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto";
  } else if (count === 3) {
    return "grid grid-cols-1 md:grid-cols-3 gap-8";
  } else {
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8";
  }
});

const navigateToWorkspace = (workspaceId: string) => {
  router.push(`/${workspaceId}`);
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
