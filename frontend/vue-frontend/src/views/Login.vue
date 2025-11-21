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
          <div class="text-center mb-10">
            <h2 class="text-4xl font-light text-slate-800 mb-2">Sign In</h2>
            <p class="text-slate-500">Select your role to access the portal</p>
          </div>

          <!-- Name Input -->
          <div class="mb-8">
            <Label for="name" class="text-base mb-2 block">Your Name {{ name }}</Label>
            <Input id="name" type="text" placeholder="Enter your name" v-model="name" class="h-12 text-base" />
          </div>

          <!-- Role Selection -->
          <div class="mb-10">
            <Label class="text-base mb-4 block">Select Role</Label>
            <div class="grid grid-cols-2 gap-6">
              <button
                @click="selectedRole = 'CMT_TEAM'"
                :class="`p-8 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === 'CMT_TEAM'
                    ? 'border-[#007d79] bg-[#007d79]/5 shadow-lg'
                    : 'border-slate-200 hover:border-[#007d79]/50 hover:bg-slate-50'
                }`">
                <div class="flex flex-col items-center gap-3">
                  <div
                    :class="`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedRole === 'CMT_TEAM' ? 'bg-[#007d79]' : 'bg-slate-200'
                    }`">
                    <Building2 :class="`w-8 h-8 ${selectedRole === 'CMT_TEAM' ? 'text-white' : 'text-slate-600'}`" />
                  </div>
                  <div class="text-center">
                    <p class="font-semibold text-lg text-slate-800">Contract Management</p> 
                    <p class="text-sm text-slate-500">Team</p>
                  </div>
                </div>
              </button>

              <button
                @click="selectedRole = 'GENERAL_USER'"
                :class="`p-8 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === 'GENERAL_USER'
                    ? 'border-[#007d79] bg-[#007d79]/5 shadow-lg'
                    : 'border-slate-200 hover:border-[#007d79]/50 hover:bg-slate-50'
                }`">
                <div class="flex flex-col items-center gap-3">
                  <div
                    :class="`w-16 h-16 rounded-full flex items-center justify-center ${
                      selectedRole === 'GENERAL_USER' ? 'bg-[#007d79]' : 'bg-slate-200'
                    }`">
                    <Users :class="`w-8 h-8 ${selectedRole === 'GENERAL_USER' ? 'text-white' : 'text-slate-600'}`" />
                  </div>
                  <div class="text-center">
                    <p class="font-semibold text-lg text-slate-800">User Area</p>
                    <p class="text-sm text-slate-500">General Access</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Sign In Button -->
          <div>{{ selectedRole }}</div>
          <div>{{ name }}</div>
          <Button
            @click="handleLogin"
            :disabled="!selectedRole || !name.trim()"
            class="w-full h-14 text-lg bg-[#007d79] hover:bg-[#006663] transition-colors">
            Sign In to Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { Building2, Users } from "lucide-vue-next";

const router = useRouter();
const authStore = useAuthStore();

const selectedRole = ref<"CMT_TEAM" | "GENERAL_USER" | null>(null);
const name = ref("");

const handleLogin = () => {
  if (selectedRole.value && name.value.trim()) {
    authStore.login(selectedRole.value, name.value.trim());
    router.push("/workspace-selector");
  }
};
</script>
