"use client";
import {
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  Settings,
  Activity,
  Calendar,
  FileText,
  Bell,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartPieDonutText } from "@/components/chats/pie-donut-chart";
import {
  ChartBarHorizontal,
  ChartBarLabelCustom,
} from "@/components/chats/bar-horizontal-chart";
import { ChartLineLinear } from "@/components/chats/chart-line-linear";
import ScatterCharts from "@/components/chats/scatter-chart";
import { ChartRadialStacked } from "@/components/chats/chart-radial-stacked";
import { ChartBarMultiple } from "@/components/chats/chart-bar-multiple";
import { ChartBar } from "@/components/chats/chart-bar";
interface DashProps {
barTopItems :{ item:string , total_spent :string}[]
bartopsuppliers:{ supplier:string , total_spent :string}[]
}
 
const Dashboard = ({barTopItems,bartopsuppliers}:DashProps) => {
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
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Calendar className="h-5 w-5" />
              </button>
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
              {/* <TabsTrigger
                value="analytics"
                className="py-4 px-1 border-b-2 border-transparent font-medium text-sm flex items-center space-x-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
*/}
            </TabsList>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6 py-8">
          <TabsContent
            value="overview"
            className="grid items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            <>
              <ChartBarLabelCustom barTopItems={barTopItems} />
              <ChartBarHorizontal bartopsuppliers={bartopsuppliers} />
              <ChartPieDonutText />
              <ChartLineLinear />
              <ChartRadialStacked />
              <ChartBarMultiple />
              <ChartBar />
              <ScatterCharts />
            </>
          </TabsContent>

          {/* <TabsContent value="analytics" className="mt-0">
            {analyticsContent}
          </TabsContent>

    
		  */}
        </main>
      </Tabs>
    </div>
  );
};

export default Dashboard;
