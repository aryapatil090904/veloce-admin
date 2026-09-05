export default function TopNavBar() {
  return (
    <header className="h-16 fixed top-0 right-0 left-64 z-40 bg-surface/60 backdrop-blur-xl flex justify-between items-center px-8">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
          <input 
            className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/50 outline-none" 
            placeholder="Search members, activities, or systems..." 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors relative">
            notifications
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-surface"></span>
          </button>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">dark_mode</button>
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold font-headline text-on-surface">Alex Rivera</p>
            <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Admin Control</p>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors overflow-hidden">
            <img 
              alt="Admin Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBErq-U8iZfsWTpLdsdvpS0v1zWGeIa5TEHqsv6HL37FQcTok92bw962pOv_rhXV0ob5HZrHT5BCJR0uxvrR8IHi12rzBIM2uUI0AbM4b-tJSVOjdi_iA0HWyJtrwWIB5vXcSE0XIDsbVpeQNW_EBsXWL5lIZyZMl9xK8S6cVPamSytHx-yFSC9K6ikSqDvjsAa2yonAguH4hAJ1PmicvtjUo0mqWfvDlGrKnWmuqvZmjQRSYF7oNB-" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
