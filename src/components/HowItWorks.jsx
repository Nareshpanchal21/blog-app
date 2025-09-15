import React from "react";

export default function HowItWorks() {
  const features = [
    {
      title: "Search Blogs",
      description: "Easily find blogs on topics you love using our smart search.",
      icon: "🔍",
    },
    {
      title: "Create Your Blog",
      description: "Share your knowledge by creating your own blog posts after login.",
      icon: "✍️",
    },
    {
      title: "Read & Learn",
      description: "Read detailed blogs written by experts and enhance your skills.",
      icon: "📖",
    },
    {
      title: "Interactive Community",
      description: "Engage with other users and comment on their blogs (coming soon).",
      icon: "🤝",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <div className="text-4xl mb-4 animate-bounce">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-orange-500 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
