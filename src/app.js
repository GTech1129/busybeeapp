const { useState, useEffect, useRef } = React;
const { Search, Home, ShoppingCart, Book, User, Award, Scan, Bell, MessageCircle, TrendingUp, ExternalLink, Sparkles, ChevronRight, BarChart3, Calendar, Mic, Send, ChevronDown, ChevronUp } = lucide;

export default function BusyDoctorBeeApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [drBExpanded, setDrBExpanded] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const cubeRef = useRef(null);
  const sphereRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    let rotation = 0;
    const interval = setInterval(() => {
      rotation += 1;
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateY(${rotation}deg) rotateX(${rotation * 0.5}deg)`;
      }
      if (sphereRef.current) {
        sphereRef.current.style.transform = `rotateY(${rotation * 1.5}deg) rotateZ(${rotation * 0.3}deg)`;
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const ingredients = [
    { name: 'Phthalates', danger: 'Heart disease, hormonal disruption', found: 'Plastic bottles, fragrances, vinyl' },
    { name: 'BPA (Bisphenol A)', danger: 'Cancer, infertility, brain development', found: 'Plastic containers, can linings' },
    { name: 'PFAS (Forever Chemicals)', danger: 'Cancer, immune issues, thyroid problems', found: 'Non-stick cookware, food packaging' },
    { name: 'Parabens', danger: 'Hormone disruption, breast cancer link', found: 'Cosmetics, lotions, shampoos' },
    { name: 'Triclosan', danger: 'Antibiotic resistance, hormone issues', found: 'Antibacterial soaps, toothpaste' },
    { name: 'Formaldehyde', danger: 'Cancer, respiratory issues, allergies', found: 'Pressed wood, cleaners, cosmetics' },
    { name: 'Synthetic Fragrances', danger: 'Allergies, asthma, hormone disruption', found: 'Perfumes, air fresheners, cleaners' }
  ];

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const todayIngredient = ingredients[dayOfYear % ingredients.length];

  const blogPosts = [
    { title: 'The Hidden Dangers in Your Kitchen', date: '2 days ago', image: '🍳', excerpt: 'Non-stick pans release toxic PFAS chemicals...' },
    { title: 'Why Your Shampoo Might Be Harming You', date: '5 days ago', image: '🧴', excerpt: 'Sulfates and parabens damage more than hair...' },
    { title: 'Microplastics: The Invisible Threat', date: '1 week ago', image: '🔬', excerpt: 'We inhale 74,000 particles daily...' }
  ];

  const tips = [
    { id: 1, title: 'Switch to Bamboo Toothbrushes', category: 'Bathroom', icon: '🦷' },
    { id: 2, title: 'Try Refillable Cleaning Products', category: 'Kitchen', icon: '🧼' },
    { id: 3, title: 'Choose Glass Over Plastic', category: 'Storage', icon: '🫙' },
    { id: 4, title: 'Eco-Friendly Laundry Detergent', category: 'Laundry', icon: '👕' }
  ];

  const products = [
    { name: 'Eco Dish Soap', rating: 4.8, safe: true },
    { name: 'Natural Shampoo', rating: 4.6, safe: true },
    { name: 'Bamboo Paper Towels', rating: 4.9, safe: true },
    { name: 'Plant-Based Cleaner', rating: 4.7, safe: true }
  ];

  const askDrB = async (question) => {
    if (!question.trim()) return;
    
    const userMsg = { role: 'user', text: question };
    setChatMessages(prev => [...prev, userMsg]);
    setUserQuestion('');
    setLoadingAI(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are Dr. Bee (Dr. Shikha Bhattacharyya), a pharmacist and health & sustainability coach with 20+ years of experience. You help people avoid toxic chemicals in everyday products and live healthier lives. Answer this question in a warm, knowledgeable, and actionable way (2-4 sentences): "${question}". If relevant, mention specific product swaps or ingredient warnings. Sign off as "- Dr. B 🐝"`
          }],
          tools: [{
            type: "web_search_20250305",
            name: "web_search"
          }]
        })
      });
      
      const data = await response.json();
      let aiResponse = '';
      
      if (data.content) {
        for (const block of data.content) {
          if (block.type === 'text') {
            aiResponse += block.text + '\n';
          }
        }
      }
      
      const drBMsg = { 
        role: 'assistant', 
        text: aiResponse.trim() || "I'm here to help! Could you ask me about toxic ingredients, safe product alternatives, or healthy living tips?" 
      };
      setChatMessages(prev => [...prev, drBMsg]);
    } catch (err) {
      const errorMsg = { 
        role: 'assistant', 
        text: "I'm having trouble connecting right now. Please try again! - Dr. B 🐝" 
      };
      setChatMessages(prev => [...prev, errorMsg]);
    }
    setLoadingAI(false);
  };

  const renderHome = () => (
    <div className="space-y-6 pb-20">
      {/* Hero Section with 3D Elements - Smaller with Stats */}
      <div className="relative bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 rounded-3xl p-5 text-white shadow-lg overflow-hidden">
        {/* 3D rotating shapes */}
        <div className="absolute top-3 right-3 w-16 h-16 perspective-1000">
          <div ref={cubeRef} className="w-full h-full transform-style-3d transition-transform">
            <div className="absolute inset-0 bg-lime-300 opacity-40 rounded-lg shadow-2xl"></div>
          </div>
        </div>
        
        <div className="absolute bottom-3 left-3 w-12 h-12 perspective-1000">
          <div ref={sphereRef} className="w-full h-full transform-style-3d transition-transform">
            <div className="absolute inset-0 bg-yellow-300 opacity-50 rounded-full shadow-2xl"></div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-1">Welcome back! 🌿</h2>
        <p className="text-lime-50 mb-4">You&apos;ve made 47 eco-friendly swaps this month</p>
        
        {/* Green Score & Achievements Indicators */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold">Green Score</span>
            </div>
            <p className="text-3xl font-bold">89%</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5" />
              <span className="text-sm font-semibold">Achievements</span>
            </div>
            <p className="text-3xl font-bold">23</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-white border-2 border-lime-200 rounded-2xl p-4 hover:border-lime-400 transition transform hover:scale-105 hover:shadow-lg">
          <Scan className="w-8 h-8 text-green-600 mb-2" />
          <p className="font-semibold text-gray-800">Scan Barcode</p>
          <p className="text-xs text-gray-500">Check safety</p>
        </button>
        <button className="bg-white border-2 border-lime-200 rounded-2xl p-4 hover:border-lime-400 transition transform hover:scale-105 hover:shadow-lg">
          <MessageCircle className="w-8 h-8 text-green-600 mb-2" />
          <p className="font-semibold text-gray-800">Community</p>
          <p className="text-xs text-gray-500">Chat & share</p>
        </button>
      </div>

      {/* Toxic Ingredient of the Day */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-6 shadow-lg transform hover:shadow-xl transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-xl animate-bounce">
            ⚠️
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Toxic Ingredient of the Day</h3>
            <p className="text-xs text-gray-500">Updated daily · AI-powered insights</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 mb-3 border border-red-100">
          <h4 className="text-xl font-bold text-red-600 mb-2">{todayIngredient.name}</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-semibold text-gray-700">Health risks:</span> {todayIngredient.danger}</p>
            <p><span className="font-semibold text-gray-700">Found in:</span> {todayIngredient.found}</p>
          </div>
        </div>

        {!drBExpanded && (
          <button 
            onClick={() => { setDrBExpanded(true); askDrB(`What are ${todayIngredient.name}?`); }}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-blue-600 transition transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Ask Dr. B About This
          </button>
        )}
      </div>

      {/* Ask Dr. B - AI Assistant (Expandable when clicked) */}
      {drBExpanded && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl shadow-lg overflow-hidden transform hover:shadow-2xl transition-all">
          <div className="p-5 flex items-center justify-between bg-white/50 border-b border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                🐝
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  Ask Dr. B
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </h3>
                <p className="text-sm text-gray-600">AI-powered health advisor</p>
              </div>
            </div>
            <button onClick={() => setDrBExpanded(false)}>
              <ChevronUp className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="bg-white">
            <div className="max-h-96 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user' 
                      ? 'bg-lime-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="font-semibold text-sm mb-1 flex items-center gap-1">
                        <span className="text-lg">🐝</span> Dr. B
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loadingAI && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Dr. B anything..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && askDrB(userQuestion)}
                  className="flex-1 px-4 py-2.5 border-2 border-purple-200 rounded-full focus:border-purple-400 focus:outline-none text-sm"
                />
                <button 
                  onClick={() => askDrB(userQuestion)}
                  disabled={loadingAI || !userQuestion.trim()}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2.5 rounded-full hover:from-purple-600 hover:to-blue-600 transition disabled:opacity-50 transform hover:scale-110"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section - Consultation & Speaking */}
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-xl transform hover:shadow-2xl hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold">Book a Consultation</h3>
                <p className="text-blue-100 text-sm">Personalized health guidance</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-50 transition transform hover:scale-105">
              Book
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-5 text-white shadow-xl transform hover:shadow-2xl hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mic className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold">Book Dr. B to Speak</h3>
                <p className="text-orange-100 text-sm">Wellness workshops & events</p>
              </div>
            </div>
            <button className="bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-orange-50 transition transform hover:scale-105">
              Book
            </button>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">Latest from the Blog</h3>
          <button className="text-green-600 text-sm font-semibold">See all</button>
        </div>
        <div className="space-y-3">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition transform hover:scale-105">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{post.image}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{post.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* H.E.A.L.T.H.Y Store Link */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer group transform hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">H.E.A.L.T.H.Y. Store</h3>
            <p className="text-amber-50 mb-4">Premium supplements & safe products</p>
            <div className="flex gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Quality Tested</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Expert Curated</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
            <ShoppingCart className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Today's Tips */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">Today&apos;s Tips</h3>
          <button className="text-green-600 text-sm font-semibold">See all</button>
        </div>
        <div className="space-y-3">
          {tips.map(tip => (
            <div key={tip.id} className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition transform hover:scale-105">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{tip.icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{tip.title}</h4>
                  <span className="inline-block bg-lime-100 text-lime-700 text-xs px-2 py-1 rounded-full mt-1">
                    {tip.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community & Green Score */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-white border-2 border-lime-200 rounded-2xl p-5 hover:border-lime-400 hover:shadow-lg transition group transform hover:scale-105">
          <TrendingUp className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-gray-800">Green Score</p>
          <p className="text-xs text-gray-500">Track progress</p>
        </button>
        
        <button className="bg-white border-2 border-lime-200 rounded-2xl p-5 hover:border-lime-400 hover:shadow-lg transition group transform hover:scale-105">
          <Award className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-semibold text-gray-800">Achievements</p>
          <p className="text-xs text-gray-500">23 badges</p>
        </button>
      </div>
    </div>
  );

  const renderDiscover = () => (
    <div className="space-y-6 pb-20">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search safe products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-lime-400 focus:outline-none"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Categories</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Cleaning', 'Personal Care', 'Kitchen', 'Bathroom'].map(cat => (
            <button
              key={cat}
              className="px-4 py-2 bg-white border-2 border-lime-200 rounded-full font-medium text-sm whitespace-nowrap hover:bg-lime-50 hover:border-lime-400 transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Top Rated Products</h3>
        <div className="space-y-3">
          {products.map((product, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition transform hover:scale-105">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{product.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  {product.safe && (
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full mt-2">
                      ✓ Safe Choice
                    </span>
                  )}
                </div>
                <button className="bg-lime-400 hover:bg-lime-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white transform hover:scale-105 transition-all">
        <h2 className="text-2xl font-bold mb-2">Knowledge Library</h2>
        <p className="text-blue-50">Evidence-based resources for healthier living</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All Articles', 'Toxins', 'Nutrition', 'Sustainability', 'Products', 'Research'].map(cat => (
          <button key={cat} className="px-4 py-2 bg-white border-2 border-purple-200 rounded-full font-medium text-sm whitespace-nowrap hover:bg-purple-50 hover:border-purple-400 transition">
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {[
          { title: 'Understanding PFAS: The Forever Chemicals', category: 'Toxins', readTime: '8 min' },
          { title: 'Safe Cookware Guide 2026', category: 'Products', readTime: '12 min' },
          { title: 'Microplastics in Your Daily Life', category: 'Research', readTime: '10 min' },
          { title: 'Natural Alternatives to Toxic Cleaners', category: 'Products', readTime: '6 min' },
          { title: 'The Truth About BPA-Free Claims', category: 'Toxins', readTime: '7 min' }
        ].map((article, idx) => (
          <div key={idx} className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:border-purple-300 transition-all cursor-pointer group transform hover:scale-105">
            <div className="flex items-start justify-between mb-2">
              <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold">{article.category}</span>
              <span className="text-xs text-gray-500">{article.readTime}</span>
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-purple-600 transition">{article.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Book className="w-4 h-4" />
              <span>Read article</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-br from-lime-400 to-green-500 rounded-3xl p-6 text-white transform hover:scale-105 transition-all">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
            🌱
          </div>
          <div>
            <h2 className="text-2xl font-bold">Eco Champion</h2>
            <p className="text-lime-50">Level 12 · 2,847 points</p>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Green Score</span>
            <span className="text-2xl font-bold">89%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div className="bg-white rounded-full h-3" style={{width: '89%'}}></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-2xl font-bold">67</p>
            <p className="text-xs text-lime-50">Swaps</p>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-lime-50">Badges</p>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <p className="text-2xl font-bold">156</p>
            <p className="text-xs text-lime-50">Days</p>
          </div>
        </div>
      </div>

      {/* My Shopping List */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">My Shopping List</h3>
        <div className="bg-white border-2 border-lime-200 rounded-2xl p-5 hover:border-lime-400 hover:shadow-lg transition transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-800">Shopping List</p>
                <p className="text-xs text-gray-500">12 items</p>
              </div>
            </div>
            <button className="bg-lime-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-lime-600 transition">
              View
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Bamboo Toothbrush</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Natural Dish Soap</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Glass Storage Containers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Achievement Badges</h3>
        <div className="grid grid-cols-4 gap-3">
          {['🌿', '♻️', '💚', '🌍', '⭐', '🏆', '🎯', '💪'].map((badge, idx) => (
            <div key={idx} className="bg-white border-2 border-lime-200 rounded-2xl p-4 text-center hover:border-lime-400 hover:scale-105 transition-all">
              <span className="text-4xl">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Settings</h3>
        {['Notifications', 'Shopping Preferences', 'Privacy', 'Help & Support'].map(item => (
          <button key={item} className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-left hover:shadow-md transition transform hover:scale-105">
            <span className="font-medium text-gray-800">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-lime-500">Busy</span> Doctor Bee
          </h1>
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      <div className="px-6 py-6">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'discover' && renderDiscover()}
        {activeTab === 'library' && renderLibrary()}
        {activeTab === 'profile' && renderProfile()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto z-20">
        <div className="flex justify-around py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
              activeTab === 'home' ? 'text-lime-600 bg-lime-50' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
              activeTab === 'discover' ? 'text-lime-600 bg-lime-50' : 'text-gray-500'
            }`}
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
              activeTab === 'library' ? 'text-lime-600 bg-lime-50' : 'text-gray-500'
            }`}
          >
            <Book className="w-6 h-6" />
            <span className="text-xs font-medium">Library</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
              activeTab === 'profile' ? 'text-lime-600 bg-lime-50' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BusyDoctorBeeApp />);const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BusyDoctorBeeApp />);
