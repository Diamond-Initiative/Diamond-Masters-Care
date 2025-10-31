import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Users, Calendar, FileText, Clock, LogOut } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { supabase } from '../lib/supabase'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

export function NurseDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [nurse, setNurse] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [stats, setStats] = useState({
    assignedPatients: 0,
    todayAppointments: 0,
    completedVisits: 0
  })
  const navigate = useNavigate()

  const animatedPatients = useAnimatedCounter(stats.assignedPatients)
  const animatedToday = useAnimatedCounter(stats.todayAppointments)
  const animatedCompleted = useAnimatedCounter(stats.completedVisits)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      navigate('/login')
      return
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()

    if (profileData?.role !== 'nurse') {
      navigate('/')
      return
    }

    const { data: nurseData } = await supabase
      .from('nurses')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (nurseData?.status !== 'approved') {
      navigate('/nurse-application-pending')
      return
    }

    setUser(user)
    setProfile(profileData)
    setNurse(nurseData)
    await loadDashboardData(user.id, nurseData.id)
  }

  const loadDashboardData = async (userId: string, nurseId: string) => {
    const today = new Date().toISOString().split('T')[0]

    const [appointmentsRes, linksRes] = await Promise.all([
      supabase
        .from('appointments')
        .select('*')
        .eq('nurse_id', userId)
        .order('appointment_date', { ascending: true }),
      supabase
        .from('nurse_patient_links')
        .select('*', { count: 'exact' })
        .eq('nurse_id', nurseId)
    ])

    const todayAppts = appointmentsRes.data?.filter(
      apt => apt.appointment_date === today && apt.status === 'scheduled'
    ).length || 0

    const completed = appointmentsRes.data?.filter(
      apt => apt.status === 'completed'
    ).length || 0

    setStats({
      assignedPatients: linksRes.count || 0,
      todayAppointments: todayAppts,
      completedVisits: completed
    })

    setAppointments(appointmentsRes.data || [])
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (!profile || !nurse) {
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
              <span className="text-xl font-bold text-blue-900">DMC</span>
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
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {nurse.full_name}!
          </h1>
          <p className="text-sm text-gray-600">Nurse Dashboard • {nurse.specialization}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assigned Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{animatedPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{animatedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Visits</p>
                  <p className="text-2xl font-bold text-gray-900">{animatedCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hours This Week</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.slice(0, 5).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{appointment.service_type}</p>
                      <p className="text-sm text-gray-600">
                        {appointment.appointment_date} at {appointment.appointment_time}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : appointment.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No appointments scheduled.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  View Patient List
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Update Treatment Notes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  Log Hours
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
