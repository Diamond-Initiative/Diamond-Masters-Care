import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Users, UserCheck, Calendar, FileText, LogOut } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { supabase } from '../lib/supabase'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

export function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [pendingNurses, setPendingNurses] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalNurses: 0,
    totalPatients: 0,
    totalAppointments: 0,
    pendingApplications: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const animatedNurses = useAnimatedCounter(stats.totalNurses)
  const animatedPatients = useAnimatedCounter(stats.totalPatients)
  const animatedAppointments = useAnimatedCounter(stats.totalAppointments)
  const animatedPending = useAnimatedCounter(stats.pendingApplications)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      navigate('/login-admin')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (profile?.role !== 'admin') {
      navigate('/')
      return
    }

    setUser(user)
    await loadDashboardData()
  }

  const loadDashboardData = async () => {
    setIsLoading(true)

    const [nursesRes, patientsRes, appointmentsRes, pendingRes] = await Promise.all([
      supabase.from('nurses').select('*', { count: 'exact' }),
      supabase.from('patients').select('*', { count: 'exact' }),
      supabase.from('appointments').select('*', { count: 'exact' }),
      supabase.from('nurses').select('*').eq('status', 'pending')
    ])

    setStats({
      totalNurses: nursesRes.count || 0,
      totalPatients: patientsRes.count || 0,
      totalAppointments: appointmentsRes.count || 0,
      pendingApplications: pendingRes.data?.length || 0
    })

    setPendingNurses(pendingRes.data || [])
    setIsLoading(false)
  }

  const handleApproveNurse = async (nurseId: string, userEmail: string) => {
    try {
      const { error } = await supabase
        .from('nurses')
        .update({ status: 'approved' })
        .eq('id', nurseId)

      if (error) throw error

      await supabase.functions.invoke('send-nurse-decision-email', {
        body: { email: userEmail, decision: 'approved' }
      })

      await loadDashboardData()
    } catch (error) {
      console.error('Error approving nurse:', error)
    }
  }

  const handleRejectNurse = async (nurseId: string, userEmail: string) => {
    try {
      const { error } = await supabase
        .from('nurses')
        .update({ status: 'rejected' })
        .eq('id', nurseId)

      if (error) throw error

      await supabase.functions.invoke('send-nurse-decision-email', {
        body: { email: userEmail, decision: 'rejected' }
      })

      await loadDashboardData()
    } catch (error) {
      console.error('Error rejecting nurse:', error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-blue-900">DMC Admin</span>
            </Link>

            <Button variant="ghost" onClick={handleSignOut} className="text-blue-600 hover:text-blue-800">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Manage your healthcare platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Nurses</p>
                  <p className="text-2xl font-bold text-gray-900">{animatedNurses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{animatedPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{animatedAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{animatedPending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Pending Nurse Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingNurses.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pending applications</p>
            ) : (
              <div className="space-y-4">
                {pendingNurses.map((nurse) => (
                  <div
                    key={nurse.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{nurse.full_name}</h3>
                      <p className="text-sm text-gray-600">
                        {nurse.specialization} • {nurse.experience_years} years experience
                      </p>
                      {nurse.license_url && (
                        <a
                          href={nurse.license_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View License
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveNurse(nurse.id, nurse.user_id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50"
                        onClick={() => handleRejectNurse(nurse.id, nurse.user_id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
