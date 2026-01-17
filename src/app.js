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
root.render(<BusyDoctorBeeApp />);
