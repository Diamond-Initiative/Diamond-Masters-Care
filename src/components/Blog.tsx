import React from 'react'

const blogPosts = [
  {
    title: 'Understanding STI Testing: A Complete Guide',
    image: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=600',
    categories: ['HEALTH', 'TESTING']
  },
  {
    title: 'Benefits of Home Healthcare Services',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
    categories: ['HEALTHCARE', 'HOME CARE']
  },
  {
    title: 'Maintaining Sexual Health and Wellness',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    categories: ['WELLNESS', 'PREVENTION']
  }
]

export function Blog() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">
            Health & Wellness Blog
          </h2>
          <p className="text-blue-700 max-w-2xl mx-auto">
            Stay informed with expert insights, health tips, and the latest information 
            about sexual health and wellness from our medical professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300 border border-blue-200"
            >
              <div className="aspect-w-16 aspect-h-10 bg-blue-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {post.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-200"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}