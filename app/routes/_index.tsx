// app/routes/_index.tsx
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";
import { Brain, Zap, BarChart3, Users } from "lucide-react";

export default function Index() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full backdrop-blur-sm bg-white/75 dark:bg-gray-900/75 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                AI-Compass
              </Link>
            </div>
            
            <div className="hidden sm:flex sm:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Features
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Pricing
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              AI-Powered Expert Discovery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Streamline your consultation process with context-aware AI. Connect with qualified leads while you focus on what matters most.
            </p>
            <div className="flex justify-center gap-4">
              <SignUpButton mode="modal">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </SignUpButton>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AI-Compass?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines AI intelligence with your expertise to create perfect matches.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Start for free, upgrade as you grow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <p className="text-4xl font-bold mb-6">${tier.price}<span className="text-lg font-normal text-gray-600">/mo</span></p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-2" /> {feature}
                    </li>
                  ))}
                </ul>
                <SignUpButton mode="modal">
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">&copy; 2024 AI-Compass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    icon: <Brain className="w-6 h-6 text-blue-600" />,
    title: "AI Context Understanding",
    description: "Our AI learns your expertise and consultation style to represent you accurately."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Smart Qualification",
    description: "Automatically qualify leads based on your criteria and expertise."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
    title: "Insightful Analytics",
    description: "Track performance and optimize your consultation funnel."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Expert Directory",
    description: "Join our curated directory of verified industry experts."
  }
];

const PRICING_TIERS = [
  {
    name: "Free",
    price: "0",
    features: [
      "3 leads/month",
      "Basic expert profile",
      "Standard form template"
    ]
  },
  {
    name: "Professional",
    price: "10",
    features: [
      "20 leads/month",
      "Enhanced AI understanding",
      "Custom form styling",
      "Analytics dashboard"
    ]
  },
  {
    name: "Business",
    price: "20",
    features: [
      "Unlimited leads",
      "White-label forms",
      "Priority AI processing",
      "Team collaboration",
      "API access"
    ]
  }
];

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      {...props}
    >
      <path 
        fillRule="evenodd" 
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}