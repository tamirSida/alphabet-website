'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Home, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Phone,
  BarChart3,
  Settings,
  Eye
} from 'lucide-react';

const quickActions = [
  {
    title: 'Edit Hero Section',
    description: 'Update the main headline and call-to-action',
    href: '/admin/hero',
    icon: Home,
    color: 'bg-blue-500'
  },
  {
    title: 'Manage Content',
    description: 'Edit mission, curriculum, and other sections',
    href: '/admin/content',
    icon: BookOpen,
    color: 'bg-green-500'
  },
  {
    title: 'Team Members',
    description: 'Add or edit team member profiles',
    href: '/admin/team',
    icon: Users,
    color: 'bg-purple-500'
  },
  {
    title: 'View Live Site',
    description: 'See how your changes look on the public site',
    href: '/',
    icon: Eye,
    color: 'bg-gray-500'
  }
];

const stats = [
  { name: 'Hero Sections', value: '1', change: '+0%' },
  { name: 'Content Sections', value: '5', change: '+0%' },
  { name: 'Team Members', value: '0', change: '+0%' },
  { name: 'Testimonials', value: '0', change: '+0%' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Manage your Alpha-Bet website content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg ${action.color} mr-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <Link href={action.href}>
                      <Button variant="outline" size="sm">
                        {action.title.startsWith('View') ? 'View' : 'Manage'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest changes to your website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">Content changes will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}