import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">
                Welcome back! Here&apos;s what&apos;s happening today.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6">
            <TabsList className="h-auto p-0 bg-transparent space-x-8">
              <TabsTrigger
                value="overview"
                className="py-4 px-1 border-b-2 border-transparent font-medium text-sm flex items-center space-x-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="py-4 px-1 border-b-2 border-transparent font-medium text-sm flex items-center space-x-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6">
          <TabsContent value="overview">
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-4 w-36 mb-2" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="mb-4">
                    <Skeleton className="h-5 w-40 mb-1" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-4 flex-1 max-w-48" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-3" />
                  </div>
                </div>

                {/* Center Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="flex justify-center mb-4">
                    <Skeleton className="h-48 w-48 rounded-full" />
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-3" />
                  </div>
                </div>

                {/* Right Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="mb-4">
                    <Skeleton className="h-5 w-36 mb-1" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center space-x-1 mb-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-3" />
                    </div>
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Table */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border">
                  {/* Table Header */}
                  <div className="grid grid-cols-7 gap-4 p-4 border-b bg-gray-50">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  {/* Table Rows */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-7 gap-4 p-4 border-b"
                    >
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>

                {/* Right Side Panel */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-16" />
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <Skeleton className="h-4 w-28 mb-2" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-4 w-36 mb-2" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="mb-4">
                    <Skeleton className="h-5 w-40 mb-1" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-4 flex-1 max-w-48" />
                        </div>
                        <Skeleton className="h-3 w-16" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center space-x-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-3" />
                  </div>
                </div>

                {/* Center Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="flex justify-center mb-4">
                    <Skeleton className="h-48 w-48 rounded-full" />
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-3" />
                  </div>
                </div>

                {/* Right Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="mb-4">
                    <Skeleton className="h-5 w-36 mb-1" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center space-x-1 mb-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-3" />
                    </div>
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Table */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border">
                  {/* Table Header */}
                  <div className="grid grid-cols-7 gap-4 p-4 border-b bg-gray-50">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  {/* Table Rows */}
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-7 gap-4 p-4 border-b"
                    >
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>

                {/* Right Side Panel */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-16" />
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <Skeleton className="h-4 w-28 mb-2" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
