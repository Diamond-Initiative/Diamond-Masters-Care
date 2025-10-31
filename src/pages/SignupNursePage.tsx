import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { supabase } from '../lib/supabase'

export function SignupNursePage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    specialization: '',
    experienceYears: ''
  })
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      })

      if (authError) throw authError

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            role: 'nurse'
          })

        if (profileError) throw profileError

        let licenseUrl = null

        if (licenseFile) {
          const fileExt = licenseFile.name.split('.').pop()
          const fileName = `${authData.user.id}-license.${fileExt}`
          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('nurse-licenses')
            .upload(fileName, licenseFile)

          if (uploadError) {
            console.error('File upload error:', uploadError)
          } else {
            const { data: publicUrlData } = supabase.storage
              .from('nurse-licenses')
              .getPublicUrl(fileName)

            licenseUrl = publicUrlData.publicUrl
          }
        }

        const { error: nurseError } = await supabase
          .from('nurses')
          .insert({
            user_id: authData.user.id,
            full_name: formData.fullName,
            specialization: formData.specialization,
            experience_years: parseInt(formData.experienceYears),
            license_url: licenseUrl,
            status: 'pending'
          })

        if (nurseError) throw nurseError
      }

      setSuccess('Your application has been submitted for review. You will receive an email once approved.')
      setTimeout(() => {
        navigate('/nurse-application-pending')
      }, 2000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-900">
            Nurse Application
          </CardTitle>
          <p className="text-center text-gray-600 text-sm mt-2">
            Apply to join our healthcare team
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-blue-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Jane Smith"
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                placeholder="Create a strong password"
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-blue-700 mb-1">
                Specialization
              </label>
              <Input
                type="text"
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                required
                placeholder="e.g., Registered Nurse, Pediatric Care"
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="experienceYears" className="block text-sm font-medium text-blue-700 mb-1">
                Years of Experience
              </label>
              <Input
                type="number"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="5"
                className="border-blue-200 focus-visible:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="license" className="block text-sm font-medium text-blue-700 mb-1">
                Nursing License (Optional)
              </label>
              <div className="mt-1 flex items-center justify-center px-6 py-4 border-2 border-blue-200 border-dashed rounded-lg hover:border-blue-300 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-8 w-8 text-blue-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="license"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="license"
                        name="license"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    {licenseFile ? licenseFile.name : 'PDF, JPG, PNG up to 10MB'}
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting Application...' : 'Submit Application'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-blue-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-700 hover:text-blue-900 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
