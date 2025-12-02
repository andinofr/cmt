<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#007d79] rounded-lg flex items-center justify-center">
              <Building2 class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-800">CMT PORTAL</h1>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            @click="router.push('/workspace-selector')"
            className="flex items-center gap-2">
            <Home class="w-4 h-4" />
            Home
          </Button>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-right">
            <p class="text-sm text-slate-500">Welcome,</p>
            <p class="font-semibold text-slate-800">{{ user?.name }}</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell class="w-5 h-5 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User class="w-5 h-5 text-slate-600" />
          </Button>
          <Button
            @click="handleLogout"
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-red-50 hover:text-red-600">
            <LogOut class="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-8">
      <div class="mb-8">
        <h2 class="text-4xl font-light text-slate-800 mb-2">Planning Phase</h2>
        <p class="text-slate-500">Contract Reference Library & Active Planning Documents</p>
      </div>

      <!-- Tabs -->
      <Tabs v-model="activeTab" class="space-y-6">
        <TabsList className="bg-white p-1 shadow-sm border border-slate-200">
          <TabsTrigger
            value="catalogue"
            className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Contract Catalogue
          </TabsTrigger>
          <TabsTrigger
            value="document"
            className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-8 py-2.5">
            Planning Documents
          </TabsTrigger>
          <TabsTrigger
            value="review"
            v-if="
              user?.role === UserRole.CONTRACT_MANAGEMENT_SENIOR_MANAGER ||
              user?.role === UserRole.CONTRACT_MANAGEMENT_SUPERVISOR
            "
            className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-6 py-2.5 flex items-center gap-2">
            Review Required
            <!-- Age-based badges in tab -->
            <div
              v-if="getPendingDocumentsOlderThan7Days().length > 0 || getPendingDocumentsWithin7Days().length > 0"
              class="flex items-center gap-1">
              <span
                v-if="getPendingDocumentsOlderThan7Days().length > 0"
                class="flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium cursor-help"
                :title="`Dokumen pending lebih dari 7 hari: ${getPendingDocumentsOlderThan7Days().length} document(s)`">
                {{ getPendingDocumentsOlderThan7Days().length }}
              </span>
              <span
                v-if="getPendingDocumentsWithin7Days().length > 0"
                class="flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help"
                :title="`Dokumen pending 7 hari atau kurang: ${getPendingDocumentsWithin7Days().length} document(s)`">
                {{ getPendingDocumentsWithin7Days().length }}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="submitted"
            v-if="user?.role === UserRole.CONTRACT_MANAGEMENT_ANALYST"
            className="data-[state=active]:bg-[#007d79] data-[state=active]:text-white px-6 py-2.5 flex items-center gap-2">
            Submitted Document
            <!-- Age-based badges in tab -->
            <div
              v-if="getPendingDocumentsOlderThan7Days().length > 0 || getPendingDocumentsWithin7Days().length > 0"
              class="flex items-center gap-1">
              <span
                v-if="getPendingDocumentsOlderThan7Days().length > 0"
                class="flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium cursor-help"
                :title="`Dokumen pending lebih dari 7 hari: ${getPendingDocumentsOlderThan7Days().length} document(s)`">
                {{ getPendingDocumentsOlderThan7Days().length }}
              </span>
              <span
                v-if="getPendingDocumentsWithin7Days().length > 0"
                class="flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium cursor-help"
                :title="`Dokumen pending 7 hari atau kurang: ${getPendingDocumentsWithin7Days().length} document(s)`">
                {{ getPendingDocumentsWithin7Days().length }}
              </span>
            </div>
          </TabsTrigger>
        </TabsList>

        <!-- Contract Catalogue Tab -->
        <TabsContent value="catalogue" className="space-y-4">
          <!-- Filter/Search Bar -->
          <div class="flex justify-between">
            <div class="relative w-full max-w-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search work packages, or documents..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#007d79] focus:border-[#007d79]" />
            </div>

            <!-- Upload Button -->
            <Button
              v-if="user?.role !== UserRole.USER"
              @click="uploadModalOpen = true"
              className="bg-[#007d79] hover:bg-[#006663] flex items-center gap-2">
              <UploadIcon class="w-4 h-4" />
              Upload Document
            </Button>
          </div>

          <!-- Work Package - Pricing Catalogue -->
          <Card class="shadow-lg border-0">
            <CardContent class="px-8 py-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-semibold text-slate-800">Work Package Pricing Catalogue</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="pricingCatalogueExpanded = !pricingCatalogueExpanded"
                  className="flex items-center gap-2 text-[#007d79] hover:bg-[#007d79] hover:text-white">
                  <span>{{ pricingCatalogueExpanded ? "Show Less" : "Show More" }}</span>
                  <ChevronDown v-if="!pricingCatalogueExpanded" class="w-4 h-4" />
                  <ChevronUp v-else class="w-4 h-4" />
                </Button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PricingCatalogueCard
                  v-for="item in pricingCatalogueExpanded
                    ? filteredPricingCatalogue
                    : filteredPricingCatalogue.slice(0, 4)"
                  :key="item.id"
                  :template="item"
                  :first-uploader-name="item.originalUploader"
                  :first-upload-date="item.originalUploadDate"
                  @download="handleDownload"
                  @show-history="handleShowHistory" />
              </div>
              <!-- Show remaining count when collapsed -->
              <div v-if="!pricingCatalogueExpanded && filteredPricingCatalogue.length > 4" class="text-center mt-4">
                <p class="text-sm text-slate-500">And {{ filteredPricingCatalogue.length - 4 }} more items...</p>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="pricingCatalogueExpanded = !pricingCatalogueExpanded"
                  className="flex items-center gap-2 mx-auto mt-2 text-[#007d79] hover:bg-[#007d79] hover:text-white">
                  <span>Show More</span>
                  <ChevronDown class="w-4 h-4" />
                </Button>
              </div>

              <!-- Show Less button when expanded -->
              <div v-if="pricingCatalogueExpanded && filteredPricingCatalogue.length > 4" class="text-center mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="pricingCatalogueExpanded = !pricingCatalogueExpanded"
                  className="flex items-center gap-2 mx-auto text-[#007d79] hover:bg-[#007d79] hover:text-white">
                  <span>Show Less</span>
                  <ChevronUp class="w-4 h-4" />
                </Button>
              </div>

              <!-- Show no results message when filtered and no results -->
              <div v-if="searchQuery.trim() && filteredPricingCatalogue.length === 0" class="text-center py-8">
                <FileText class="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p class="text-slate-500">No pricing catalogue items found matching "{{ searchQuery }}"</p>
              </div>
            </CardContent>
          </Card>

          <!-- Work Package - Scope of Works -->
          <Card class="shadow-lg border-0">
            <CardContent class="px-8 py-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-semibold text-slate-800">Work Package Scope of Works</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="scopeOfWorksExpanded = !scopeOfWorksExpanded"
                  className="flex items-center gap-2 text-[#007d79] hover:bg-[#007d79] hover:text-white">
                  <span>{{ scopeOfWorksExpanded ? "Show Less" : "Show More" }}</span>
                  <ChevronDown v-if="!scopeOfWorksExpanded" class="w-4 h-4" />
                  <ChevronUp v-else class="w-4 h-4" />
                </Button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ScopeOfWorksCard
                  v-for="template in scopeOfWorksExpanded ? filteredScopeOfWorks : filteredScopeOfWorks.slice(0, 4)"
                  :key="template.id"
                  :template="template"
                  :first-uploader-name="template.originalUploader"
                  :first-upload-date="template.originalUploadDate"
                  @download="handleDownload"
                  @show-history="handleShowHistory" />
              </div>
              <!-- Show remaining count when collapsed -->
              <div v-if="!scopeOfWorksExpanded && filteredScopeOfWorks.length > 4" class="text-center mt-4">
                <p class="text-sm text-slate-500">And {{ filteredScopeOfWorks.length - 4 }} more items...</p>

                <Button
                  variant="ghost"
                  size="sm"
                  @click="scopeOfWorksExpanded = !scopeOfWorksExpanded"
                  className="flex items-center gap-2 mx-auto mt-2 text-[#007d79] hover:bg-[#007d79] hover:text-white">
                  <span>Show More</span>
                  <ChevronDown class="w-4 h-4" />
                </Button>
              </div>

              <!-- Show Less button when expanded -->
              <div v-if="scopeOfWorksExpanded && filteredScopeOfWorks.length > 2" class="text-center mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="scopeOfWorksExpanded = !scopeOfWorksExpanded"
                  className="flex items-center gap-2 mx-auto text-[#007d79] hover:bg-[#007d79] hover:text-white">
                  <span>Show Less</span>
                  <ChevronUp class="w-4 h-4" />
                </Button>
              </div>

              <!-- Show no results message when filtered and no results -->
              <div v-if="searchQuery.trim() && filteredScopeOfWorks.length === 0" class="text-center py-8">
                <FileText class="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p class="text-slate-500">No scope of works items found matching "{{ searchQuery }}"</p>
              </div>
            </CardContent>
          </Card>

          <!-- Work Package Library -->
          <Card class="shadow-lg border-0">
            <CardContent class="px-8 py-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-2xl font-semibold text-slate-800">Work Package Library</h3>
                  <p class="text-slate-600">Archived versions of work package documents</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="workPackageLibraryExpanded = !workPackageLibraryExpanded"
                  className="flex items-center gap-2 text-[#007d79] hover:bg-[#007d79] hover:text-white">
                  <span>{{ workPackageLibraryExpanded ? "Show Less" : "Show More" }}</span>
                  <ChevronDown v-if="!workPackageLibraryExpanded" class="w-4 h-4" />
                  <ChevronUp v-else class="w-4 h-4" />
                </Button>
              </div>

              <div v-if="filteredWorkPackageLibrary.length > 0">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WorkPackageLibraryCard
                    v-for="template in workPackageLibraryExpanded
                      ? filteredWorkPackageLibrary
                      : filteredWorkPackageLibrary.slice(0, 4)"
                    :key="template.id"
                    :template="template"
                    @download="handleDownload" />
                </div>
                <!-- Show remaining count when collapsed -->
                <div
                  v-if="!workPackageLibraryExpanded && filteredWorkPackageLibrary.length > 4"
                  class="text-center mt-4">
                  <p class="text-sm text-slate-500">
                    And {{ filteredWorkPackageLibrary.length - 4 }} more archived documents...
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="workPackageLibraryExpanded = !workPackageLibraryExpanded"
                    className="flex items-center gap-2 mx-auto mt-2 text-[#007d79] hover:bg-[#007d79] hover:text-white">
                    <span>Show More</span>
                    <ChevronDown class="w-4 h-4" />
                  </Button>
                </div>

                <!-- Show Less button when expanded -->
                <div
                  v-if="workPackageLibraryExpanded && filteredWorkPackageLibrary.length > 4"
                  class="text-center mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    @click="workPackageLibraryExpanded = !workPackageLibraryExpanded"
                    className="flex items-center gap-2 mx-auto text-[#007d79] hover:bg-[#007d79] hover:text-white">
                    <span>Show Less</span>
                    <ChevronUp class="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <Folder class="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p class="text-slate-500">
                  {{
                    searchQuery.trim()
                      ? `No archived documents found matching "${searchQuery}"`
                      : "No archived documents in library"
                  }}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Planning Document Tab -->
        <TabsContent value="document" className="space-y-4 !-mt-9">
          <!-- Area Tabs -->
          <div class="flex justify-end">
            <Button
              @click="openLinkedGuide()"
              className="bg-[#007d79] hover:bg-[#006663] text-white flex items-center gap-2">
              <ExternalLink class="w-4 h-4" />
              Open Guide
            </Button>
          </div>

          <div class="bg-white rounded-lg shadow-lg p-6">
            <!-- Google Forms iframe -->
            <div class="w-full h-[700px]">
              <iframe
                src="https://andinofr.github.io/cmt/"
                width="100%"
                height="100%"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                title="Contract Request Form">
                Loading...
              </iframe>
            </div>
          </div>
        </TabsContent>

        <!-- Review Required Tab (CMT only) -->
        <TabsContent
          v-if="
            user?.role === UserRole.CONTRACT_MANAGEMENT_SENIOR_MANAGER ||
            user?.role === UserRole.CONTRACT_MANAGEMENT_SUPERVISOR
          "
          value="review"
          className="space-y-4">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-4">
                <h3 class="text-2xl font-semibold text-slate-800">Documents Pending Review</h3>
                <!-- Age-based badges -->
                <div class="flex items-center gap-2">
                  <div
                    class="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    <Clock class="w-3 h-3" />
                    > 7 hari: {{ getPendingDocumentsOlderThan7Days().length }}
                  </div>
                  <div
                    class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <Clock class="w-3 h-3" />
                    ≤ 7 hari: {{ getPendingDocumentsWithin7Days().length }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <!-- Sort Button -->
                <Button
                  variant="ghost"
                  size="sm"
                  @click="toggleReviewSortOrder"
                  className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 hover:bg-slate-50">
                  <ArrowUpDown class="w-4 h-4" />
                  Date
                  <ArrowDown v-if="reviewSortOrder === 'desc'" class="w-3 h-3" />
                  <ArrowUp v-else class="w-3 h-3" />
                </Button>
                <span class="text-sm text-slate-500">
                  {{ filteredPendingReviewDocuments.length }} document(s) pending review
                </span>
              </div>
            </div>

            <div v-if="filteredPendingReviewDocuments.length > 0" class="space-y-4">
              <div
                v-for="doc in filteredPendingReviewDocuments"
                class="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                        PENDING REVIEW
                      </span>
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {{ doc.category }}
                      </span>
                      <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                        {{ doc.area }}
                      </span>
                      <span class="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">
                        {{ new Date(doc.uploadDate).toLocaleDateString() }}
                      </span>
                    </div>

                    <p class="font-medium text-slate-800 mb-1">
                      <a
                        v-if="doc.linkUrl"
                        :href="doc.linkUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer">
                        {{ doc.linkUrl }}
                        <span class="text-xs ml-1">🔗</span>
                      </a>
                      <span v-else>{{ doc.fileName }}</span>
                    </p>
                    <p class="text-sm text-slate-600 mb-3">{{ doc.description }}</p>

                    <!-- Metadata Display -->
                    <div v-if="doc.metadata && Object.keys(doc.metadata).length > 0" class="mb-3">
                      <div class="text-xs text-slate-500 mb-1">Metadata:</div>
                      <div class="flex gap-1 flex-wrap">
                        <span
                          v-for="[key, value] in Object.entries(doc.metadata)"
                          :key="key"
                          class="text-xs px-1 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {{ key }}: {{ value }}
                        </span>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2 mt-3">
                      <Button size="sm" variant="primary" @click="handleApproveDocument(doc.id)">✓ Approve</Button>
                      <Button size="sm" variant="destructive" @click="openReviseNoteModal(doc)">✗ Revise</Button>
                      <Button size="sm" variant="default">
                        <Download class="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <Folder class="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h4 class="text-lg font-medium text-slate-600 mb-2">
                {{
                  searchQuery.trim() ? `No Documents Found Matching "${searchQuery}"` : "No Documents Pending Review"
                }}
              </h4>
              <p class="text-slate-500">
                {{
                  searchQuery.trim()
                    ? "No pending review documents match your search criteria."
                    : "All documents have been reviewed or no documents have been submitted yet."
                }}
              </p>
            </div>
          </div>
        </TabsContent>

        <!-- Submitted Document Tab (CMT Analyst only) -->
        <TabsContent value="submitted" className="space-y-4" v-if="user?.role === UserRole.CONTRACT_MANAGEMENT_ANALYST">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-4">
                <h3 class="text-2xl font-semibold text-slate-800">All Pending Documents</h3>
                <!-- Age-based badges -->
                <div class="flex items-center gap-2">
                  <div
                    class="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    <Clock class="w-3 h-3" />
                    > 7 hari: {{ getPendingDocumentsOlderThan7Days().length }}
                  </div>
                  <div
                    class="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <Clock class="w-3 h-3" />
                    ≤ 7 hari: {{ getPendingDocumentsWithin7Days().length }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <!-- Sort Button -->
                <Button
                  variant="ghost"
                  size="sm"
                  @click="toggleSubmittedSortOrder"
                  className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 hover:bg-slate-50">
                  <ArrowUpDown class="w-4 h-4" />
                  Date
                  <ArrowDown v-if="submittedSortOrder === 'desc'" class="w-3 h-3" />
                  <ArrowUp v-else class="w-3 h-3" />
                </Button>
                <span class="text-sm text-slate-500">
                  {{ filteredSubmittedDocuments.length }} document(s) pending submission
                </span>
              </div>
            </div>

            <div v-if="filteredSubmittedDocuments.length > 0" class="space-y-4">
              <div
                v-for="doc in filteredSubmittedDocuments"
                class="border border-amber-200 bg-amber-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                        PENDING SUBMISSION
                      </span>
                      <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {{ doc.category }}
                      </span>
                      <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                        {{ doc.area }}
                      </span>
                      <span class="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">
                        {{ new Date(doc.uploadDate).toLocaleDateString() }}
                      </span>
                    </div>

                    <p class="font-medium text-slate-800 mb-1">
                      <a
                        v-if="doc.linkUrl"
                        :href="doc.linkUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer">
                        {{ doc.fileName || doc.linkUrl }}
                        <span class="text-xs ml-1">🔗</span>
                      </a>
                      <span v-else>{{ doc.fileName }}</span>
                    </p>
                    <p class="text-sm text-slate-600 mb-3">{{ doc.description }}</p>

                    <!-- Metadata Display -->
                    <div v-if="doc.metadata && Object.keys(doc.metadata).length > 0" class="mb-3">
                      <div class="text-xs text-slate-500 mb-1">Metadata:</div>
                      <div class="flex gap-1 flex-wrap">
                        <span
                          v-for="[key, value] in Object.entries(doc.metadata)"
                          :key="key"
                          class="text-xs px-1 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {{ key }}: {{ value }}
                        </span>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2 mt-3">
                      <Button size="sm" variant="default" @click="handleDownload(doc.fileName || 'document')">
                        <Download class="w-4 h-4" />
                        Download
                      </Button>
                      <Button @click="uploadModalOpen = true" variant="primary">
                        <UploadIcon class="w-4 h-4" />
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <Folder class="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h4 class="text-lg font-medium text-slate-600 mb-2">
                {{ searchQuery.trim() ? `No Documents Found Matching "${searchQuery}"` : "No Pending Documents" }}
              </h4>
              <p class="text-slate-500">
                {{
                  searchQuery.trim()
                    ? "No pending documents match your search criteria."
                    : "There are currently no pending documents."
                }}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>

    <UploadModal
      :open="uploadModalOpen"
      @close="uploadModalOpen = false"
      workspace="planning"
      :preSelectedArea="selectedArea" />

    <HistoryModal :is-open="historyModalOpen" :document-info="selectedDocumentForHistory" @close="closeHistoryModal" />

    <!-- Revise Note Modal -->
    <div v-if="reviseNoteModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-slate-800 mb-4">Revision Note Required</h3>

        <div class="mb-4">
          <p class="text-sm text-slate-600 mb-2">Please provide a note explaining why this document needs revision:</p>
          <textarea
            v-model="reviseNote"
            rows="4"
            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007d79] focus:border-[#007d79] resize-none"
            placeholder="Enter your revision note here..."
            ref="reviseNoteTextarea"></textarea>
        </div>

        <div class="flex gap-3 justify-end">
          <Button variant="ghost" @click="closeReviseNoteModal" className="hover:bg-slate-100">Cancel</Button>
          <Button @click="confirmReviseWithNote" className="bg-red-600 hover:bg-red-700 text-white">
            Send for Revision
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore, UserRole } from "@/stores/auth";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Tabs from "@/components/ui/tabs/Tabs.vue";
import TabsList from "@/components/ui/tabs/TabsList.vue";
import TabsTrigger from "@/components/ui/tabs/TabsTrigger.vue";
import TabsContent from "@/components/ui/tabs/TabsContent.vue";
import UploadModal from "@/components/UploadModal.vue";
import PricingCatalogueCard from "@/components/PricingCatalogueCard.vue";
import ScopeOfWorksCard from "@/components/ScopeOfWorksCard.vue";
import WorkPackageLibraryCard from "@/components/WorkPackageLibraryCard.vue";
import HistoryModal from "@/components/HistoryModal.vue";
import {
  Building2,
  Bell,
  User,
  LogOut,
  Home,
  Download,
  FileText,
  Folder,
  Upload as UploadIcon,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-vue-next";
import {
  CONTRACT_TEMPLATES,
  WORK_PACKAGE_LIBRARY,
  AREAS,
  getDocumentsFromStorage,
  approveDocument,
  rejectDocument,
  type Document,
  type CatalogueItem,
  Category,
} from "@/data/mockData";

import { useToast } from "@/composables/useToast";

const router = useRouter();
const authStore = useAuthStore();
const { toast } = useToast();

const user = computed(() => authStore.user);
const activeTab = ref("catalogue");
const selectedArea = ref("all"); // Default to "all" areas
const uploadModalOpen = ref(false);
const searchQuery = ref("");
const historyModalOpen = ref(false);
const selectedDocumentForHistory = ref<CatalogueItem | null>(null);
const reviseNoteModalOpen = ref(false);
const selectedDocumentForRevise = ref<Document | null>(null);
const reviseNote = ref("");

// Sorting states
const reviewSortOrder = ref<"asc" | "desc">("desc"); // Default: newest first
const submittedSortOrder = ref<"asc" | "desc">("desc"); // Default: newest first

// Expand/collapse state for each section
const pricingCatalogueExpanded = ref(false);
const scopeOfWorksExpanded = ref(false);
const workPackageLibraryExpanded = ref(false);

// All areas including "All Areas" option
const allAreaOptions = ["all", ...AREAS];

const contractCatalogue = computed(() => {
  const approvedItems = CONTRACT_TEMPLATES.filter(
    (el) => el.category == Category.PRICING_CATALOGUE && el.status === "approved",
  );

  // Group by fileType to track both oldest and most recent items
  const groupedByFileType = new Map();

  approvedItems.forEach((item) => {
    const fileType = item.fileType;
    const currentApprovedDate = new Date(item.approvedDate || item.uploadDate);

    if (!groupedByFileType.has(fileType)) {
      groupedByFileType.set(fileType, {
        latest: item,
        oldest: item,
      });
    } else {
      const group = groupedByFileType.get(fileType);
      const latestItem = group.latest;
      const oldestItem = group.oldest;
      const latestApprovedDate = new Date(latestItem.approvedDate || latestItem.uploadDate);
      const oldestUploadDate = new Date(oldestItem.uploadDate);
      const currentUploadDate = new Date(item.uploadDate);

      // Keep the item with the most recent approved date as latest
      if (currentApprovedDate > latestApprovedDate) {
        group.latest = item;
      }

      // Keep the item with the oldest upload date as oldest
      if (currentUploadDate < oldestUploadDate) {
        group.oldest = item;
      }
    }
  });

  // Return latest items with additional originalUploader field from oldest items
  return Array.from(groupedByFileType.values()).map((group) => ({
    ...group.latest,
    originalUploader: group.oldest.uploaderName,
    originalUploadDate: group.oldest.uploadDate,
  }));
});

const scopeOfWorksCatalogue = computed(() => {
  const approvedItems = CONTRACT_TEMPLATES.filter(
    (el) => el.category == Category.SCOPE_OF_WORKS && el.status === "approved",
  );

  // Group by fileType to track both oldest and most recent items
  const groupedByFileType = new Map();

  approvedItems.forEach((item) => {
    const fileType = item.fileType;
    const currentApprovedDate = new Date(item.approvedDate || item.uploadDate);

    if (!groupedByFileType.has(fileType)) {
      groupedByFileType.set(fileType, {
        latest: item,
        oldest: item,
      });
    } else {
      const group = groupedByFileType.get(fileType);
      const latestItem = group.latest;
      const oldestItem = group.oldest;
      const latestApprovedDate = new Date(latestItem.approvedDate || latestItem.uploadDate);
      const oldestUploadDate = new Date(oldestItem.uploadDate);
      const currentUploadDate = new Date(item.uploadDate);

      // Keep the item with the most recent approved date as latest
      if (currentApprovedDate > latestApprovedDate) {
        group.latest = item;
      }

      // Keep the item with the oldest upload date as oldest
      if (currentUploadDate < oldestUploadDate) {
        group.oldest = item;
      }
    }
  });

  // Return latest items with additional originalUploader field from oldest items
  return Array.from(groupedByFileType.values()).map((group) => ({
    ...group.latest,
    originalUploader: group.oldest.uploaderName,
    originalUploadDate: group.oldest.uploadDate,
  }));
});

// Filter functions
const filteredPricingCatalogue = computed(() => {
  const catalogue = contractCatalogue.value;
  if (!searchQuery.value.trim()) {
    return catalogue;
  }
  const query = searchQuery.value.toLowerCase();
  return catalogue.filter(
    (el) =>
      el.category.toLowerCase().includes(query) ||
      (el.fileType && el.fileType.toLowerCase().includes(query)) ||
      el.fileName.toLowerCase().includes(query),
  );
});

const filteredScopeOfWorks = computed(() => {
  const catalogue = scopeOfWorksCatalogue.value;
  if (!searchQuery.value.trim()) {
    return catalogue;
  }
  const query = searchQuery.value.toLowerCase();
  return catalogue.filter(
    (el) =>
      el.category.toLowerCase().includes(query) ||
      (el.fileType && el.fileType.toLowerCase().includes(query)) ||
      el.fileName.toLowerCase().includes(query),
  );
});

const filteredWorkPackageLibrary = computed<CatalogueItem[]>(() => {
  if (!searchQuery.value.trim()) {
    return WORK_PACKAGE_LIBRARY.map((el) => {
      return {
        id: el.id,
        fileName: el.fileName,
        fileType: el.fileName,
        category: el.category,
        status: "approved",
        uploadDate: el.uploadDate,
        uploaderName: "User",
      };
    });
  }
  const query = searchQuery.value.toLowerCase();

  return WORK_PACKAGE_LIBRARY.filter(
    (template) =>
      template.code.toLowerCase().includes(query) ||
      template.category.toLowerCase().includes(query) ||
      (template.fileType && template.fileType.toLowerCase().includes(query)) ||
      template.fileName.toLowerCase().includes(query),
  ).map((el) => {
    return {
      id: el.id,
      fileName: el.fileName,
      fileType: el.fileName,
      category: el.category,
      status: "approved",
      uploadDate: el.uploadDate,
      uploaderName: "User",
    };
  });
});

const filteredPlanningDocuments = computed(() => {
  if (!searchQuery.value.trim()) {
    return getAreaDocuments(selectedArea.value);
  }
  const query = searchQuery.value.toLowerCase();
  return getAreaDocuments(selectedArea.value).filter(
    (doc) =>
      (doc.fileName && doc.fileName.toLowerCase().includes(query)) ||
      doc.description.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query) ||
      doc.area.toLowerCase().includes(query) ||
      (doc.linkUrl && doc.linkUrl.toLowerCase().includes(query)),
  );
});

const filteredPendingReviewDocuments = computed(() => {
  let documents = getPendingReviewDocuments();

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    documents = documents.filter(
      (doc) =>
        (doc.fileName && doc.fileName.toLowerCase().includes(query)) ||
        doc.description.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.area.toLowerCase().includes(query) ||
        (doc.linkUrl && doc.linkUrl.toLowerCase().includes(query)),
    );
  }

  // Apply sorting by upload date - create a new array to avoid mutation
  return [...documents].sort((a, b) => {
    const dateA = new Date(a.uploadDate).getTime();
    const dateB = new Date(b.uploadDate).getTime();
    return reviewSortOrder.value === "desc" ? dateB - dateA : dateA - dateB;
  });
});

const filteredSubmittedDocuments = computed(() => {
  let documents = getAllPendingDocuments();

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    documents = documents.filter(
      (doc) =>
        (doc.fileName && doc.fileName.toLowerCase().includes(query)) ||
        doc.description.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.area.toLowerCase().includes(query) ||
        (doc.linkUrl && doc.linkUrl.toLowerCase().includes(query)),
    );
  }

  // Apply sorting by upload date - create a new array to avoid mutation
  return [...documents].sort((a, b) => {
    const dateA = new Date(a.uploadDate).getTime();
    const dateB = new Date(b.uploadDate).getTime();
    return submittedSortOrder.value === "desc" ? dateB - dateA : dateA - dateB;
  });
});

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

const handleDownload = (fileName: string) => {
  toast({
    title: "Download Started",
    description: `Downloading ${fileName}...`,
  });
};

const handleShowHistory = (template: CatalogueItem) => {
  selectedDocumentForHistory.value = template;
  historyModalOpen.value = true;
};

const closeHistoryModal = () => {
  historyModalOpen.value = false;
  selectedDocumentForHistory.value = null;
};

const getAreaDocuments = (area: string): Document[] => {
  const allDocs = getDocumentsFromStorage();

  if (area === "all") {
    // Return all approved planning documents regardless of area
    return allDocs.filter((doc) => doc.workspace === "planning" && doc.status === "approved");
  } else {
    // Return approved documents for specific area
    return allDocs.filter((doc) => doc.workspace === "planning" && doc.area === area && doc.status === "approved");
  }
};

const getAllPlanningDocuments = (): Document[] => {
  const allDocs = getDocumentsFromStorage();
  return allDocs.filter((doc) => doc.workspace === "planning" && doc.status === "approved");
};

const getPendingReviewDocuments = (): Document[] => {
  const allDocs = getDocumentsFromStorage();
  return allDocs.filter((doc) => doc.status === "pending_review");
};

const getAllPendingDocuments = (): Document[] => {
  const allDocs = getDocumentsFromStorage();
  return allDocs.filter((doc) => doc.status === "pending_review");
};

// Helper function to calculate days difference
const getDaysSinceUpload = (uploadDate: string): number => {
  const now = new Date();
  const upload = new Date(uploadDate);
  const diffTime = Math.abs(now.getTime() - upload.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Functions to get pending documents by age
const getPendingDocumentsOlderThan7Days = (): Document[] => {
  const pendingDocs = getPendingReviewDocuments();
  return pendingDocs.filter((doc) => getDaysSinceUpload(doc.uploadDate) > 7);
};

const getPendingDocumentsWithin7Days = (): Document[] => {
  const pendingDocs = getPendingReviewDocuments();
  return pendingDocs.filter((doc) => getDaysSinceUpload(doc.uploadDate) <= 7);
};

// Approval functions
const handleApproveDocument = (documentId: string, reviewNotes?: string) => {
  if (approveDocument(documentId, user.value?.name || "CMT Admin", reviewNotes)) {
    toast({
      title: "Document Approved",
      description: "Document has been approved and moved to Planning Documents.",
    });
  } else {
    toast({
      title: "Error",
      description: "Failed to approve document.",
      variant: "destructive",
    });
  }
};

const handleRejectDocument = (documentId: string, reviewNotes?: string) => {
  if (rejectDocument(documentId, user.value?.name || "CMT Admin", reviewNotes)) {
    toast({
      title: "Document Rejected",
      description: "Document has been rejected.",
    });
  } else {
    toast({
      title: "Error",
      description: "Failed to reject document.",
      variant: "destructive",
    });
  }
};

// Functions for handling revise with note
const openReviseNoteModal = (document: Document) => {
  selectedDocumentForRevise.value = document;
  reviseNote.value = "";
  reviseNoteModalOpen.value = true;
};

const closeReviseNoteModal = () => {
  reviseNoteModalOpen.value = false;
  selectedDocumentForRevise.value = null;
  reviseNote.value = "";
};

const confirmReviseWithNote = () => {
  if (!selectedDocumentForRevise.value) return;

  if (!reviseNote.value.trim()) {
    toast({
      title: "Note Required",
      description: "Please provide a note for the revision request.",
      variant: "destructive",
    });
    return;
  }

  if (rejectDocument(selectedDocumentForRevise.value.id, user.value?.name || "CMT Admin", reviseNote.value.trim())) {
    toast({
      title: "Revision Requested",
      description: "Document has been sent back for revision with note.",
    });
    closeReviseNoteModal();
  } else {
    toast({
      title: "Error",
      description: "Failed to process revision request.",
      variant: "destructive",
    });
  }
};

// Sorting toggle functions
const toggleReviewSortOrder = () => {
  reviewSortOrder.value = reviewSortOrder.value === "desc" ? "asc" : "desc";
};

const toggleSubmittedSortOrder = () => {
  submittedSortOrder.value = submittedSortOrder.value === "desc" ? "asc" : "desc";
};

const groupDocumentsByCategory = (documents: Document[]) => {
  const groups = {
    "Contract Request Forms": [] as Document[],
    "Procurement Committee": [] as Document[],
    "Submitted Docs": [] as Document[],
  };

  documents.forEach((doc) => {
    if (doc.category === "Contract Request Form") {
      groups["Contract Request Forms"].push(doc);
    } else if (doc.category === "Procurement Request") {
      groups["Procurement Committee"].push(doc);
    } else {
      groups["Submitted Docs"].push(doc);
    }
  });

  return groups;
};

// Function to get filtered documents for planning documents section
const getFilteredPlanningDocuments = (area: string) => {
  const documents = area === "all" ? getAllPlanningDocuments() : getAreaDocuments(area);
  if (!searchQuery.value.trim()) {
    return documents;
  }
  const query = searchQuery.value.toLowerCase();
  return documents.filter(
    (doc) =>
      (doc.fileName && doc.fileName.toLowerCase().includes(query)) ||
      doc.description.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query) ||
      doc.area.toLowerCase().includes(query) ||
      (doc.linkUrl && doc.linkUrl.toLowerCase().includes(query)),
  );
};

const openLinkedGuide = () => {
  window.open("https://andinofr.github.io/cmt/", "_blank");
};
</script>
