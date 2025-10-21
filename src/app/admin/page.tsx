"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system';
import { FaShoppingCart, FaCheckCircle, FaClock, FaDollarSign } from 'react-icons/fa';

export default function AdminDashboard() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Orders',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: FaShoppingCart,
      color: 'text-blue-500'
    },
    {
      title: 'Completed Orders',
      value: '18',
      change: '+8%',
      changeType: 'positive',
      icon: FaCheckCircle,
      color: 'text-green-500'
    },
    {
      title: 'Pending Orders',
      value: '6',
      change: '-2%',
      changeType: 'negative',
      icon: FaClock,
      color: 'text-yellow-500'
    },
    {
      title: 'Total Revenue',
      value: 'Rp 45.2M',
      change: '+15%',
      changeType: 'positive',
      icon: FaDollarSign,
      color: 'text-emerald-500'
    }
  ];

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Overview of your Soulcode business
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                      {stat.value}
                    </p>
                    <p className={`text-sm mt-1 ${
                      stat.changeType === 'positive' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-100">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'ORD-001', customer: 'John Doe', amount: 'Rp 2.5M', status: 'Completed' },
                { id: 'ORD-002', customer: 'Jane Smith', amount: 'Rp 1.8M', status: 'Pending' },
                { id: 'ORD-003', customer: 'Bob Johnson', amount: 'Rp 3.2M', status: 'In Progress' },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">{order.id}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{order.amount}</p>
                    <p className={`text-sm ${
                      order.status === 'Completed' ? 'text-green-600 dark:text-green-400' :
                      order.status === 'Pending' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-100">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                <div className="font-medium">View All Orders</div>
                <div className="text-sm">Manage and track all orders</div>
              </button>
              <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="font-medium">Add New Service</div>
                <div className="text-sm">Create new service packages</div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <div className="font-medium">Generate Report</div>
                <div className="text-sm">Export business analytics</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
