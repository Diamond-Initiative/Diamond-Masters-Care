import React from 'react'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'

const blogPosts = [
  {
    id: 1,
    title: 'Understanding STI Testing: What You Need to Know',
    excerpt: 'Learn about the importance of regular STI testing, different types of tests available, and how to prepare for your appointment.',
    content: `
Access to quality healthcare has never been more important. While hospitals and clinics play a vital role, more families are turning to home healthcare services as a preferred option for themselves and their loved ones. Home healthcare goes beyond convenience—it provides comfort, personalized attention, and often better outcomes.


What is Home Healthcare?

Home healthcare refers to medical or non-medical services delivered in the comfort of a patient’s home. It includes a wide range of care, such as nursing, physical therapy, medication management, chronic illness monitoring, and even companionship. This approach bridges the gap between hospital care and independent living.

Key Benefits of Home Healthcare
1. Comfort and Familiarity

There’s no place like home. Receiving care in a familiar environment reduces stress and promotes emotional well-being. Patients often recover faster at home compared to being in a hospital setting, surrounded by unfamiliar routines.

2. Personalized and One-on-One Care

Unlike busy hospitals, home healthcare allows for individualized attention. Caregivers can tailor their approach to suit the patient’s specific needs, ensuring a more personalized experience that enhances recovery and quality of life.

3. Cost-Effectiveness

Hospital stays can be expensive, especially for long-term conditions. Home healthcare is often a more affordable option while still providing high-quality care. Families save on hospital bills, travel, and other associated costs.

4. Independence and Dignity

Home healthcare supports patients in maintaining independence. Whether it’s helping with daily activities or medical support, the focus is on empowering patients to live with dignity in their own space.

5. Family Involvement and Peace of Mind

Families play a key role in home healthcare. They can be directly involved in the care process, stay informed, and provide emotional support. Knowing that a loved one is being cared for at home brings peace of mind.

6. Reduced Risk of Infections

Hospitals, despite their best efforts, can expose patients to infections. Being cared for at home minimizes this risk, especially for individuals with weakened immune systems or chronic illnesses.

Who Can Benefit from Home Healthcare?

Home healthcare is ideal for:

Seniors needing assistance with daily activities

Patients recovering from surgery or illness

Individuals managing chronic conditions such as diabetes or heart disease

People requiring physical or occupational therapy

Families needing respite care for their loved ones

Conclusion

Home healthcare is not just a service—it’s a compassionate approach to wellness. By bringing professional care into the comfort of home, patients receive support that is personal, dignified, and effective. Whether it’s short-term recovery or long-term assistance, home healthcare continues to be a vital solution for improving quality of life.
    `,
  
    author: 'Dr. Sarah Johnson',
    date: '2025-01-15',
    category: 'Health Education',
    image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    title: 'The Benefits of Home Healthcare Services',
    excerpt: 'Discover how home healthcare services can provide convenient, professional, and confidential medical care tailored to your needs.',
    content: 'Home healthcare services offer numerous advantages including privacy, convenience, and personalized care. Our team of licensed professionals brings medical expertise directly to your doorstep...',
    author: 'Nurse Patricia Williams',
    date: '2025-01-10',
    category: 'Healthcare Services',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    title: 'Maintaining Sexual Health: Prevention and Care',
    excerpt: 'Essential tips for maintaining sexual health, including prevention strategies, regular check-ups, and when to seek professional help.',
    content: 'Sexual health is an important aspect of overall well-being. This comprehensive guide covers prevention strategies, the importance of regular screenings, and available treatment options...',
    author: 'Dr. Michael Chen',
    date: '2025-01-05',
    category: 'Prevention',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 4,
    title: 'Confidentiality in Healthcare: Your Rights and Privacy',
    excerpt: 'Understanding your rights to medical privacy and how healthcare providers ensure confidential treatment and secure handling of your information.',
    content: 'Patient confidentiality is a cornerstone of healthcare. Learn about HIPAA regulations, your privacy rights, and how we protect your sensitive medical information...',
    author: 'Legal Team',
    date: '2025-01-01',
    category: 'Privacy & Rights',
    image: 'https://images.pexels.com/photos/6749771/pexels-photo-6749771.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]

const categories = ['All', 'Health Education', 'Healthcare Services', 'Prevention', 'Privacy & Rights']

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All')
  const [selectedPost, setSelectedPost] = React.useState<number | null>(null)

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost)
    if (!post) return null

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-blue-600 hover:text-blue-800"
          >
            ← Back to Blog
          </Button>
          
          <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <div className="flex items-center space-x-4 text-sm text-blue-600 mb-4">
                <span className="bg-blue-100 px-3 py-1 rounded-full">{post.category}</span>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-blue-900 mb-6">{post.title}</h1>
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Health & Wellness Blog
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Stay informed with the latest healthcare insights, tips, and expert advice 
            from our team of medical professionals.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedPost(post.id)}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-blue-900 mb-3 hover:text-blue-700 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-blue-600 font-medium text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}