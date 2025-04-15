import { useRef, useEffect } from "react";

interface HeaderProps {
  poemCount: number;
  onNavigate: (index: number) => void;
}

export default function Header({ poemCount, onNavigate }: HeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Apply the random color animation to the title
  useEffect(() => {
    if (!titleRef.current) return;
    
    const letters = titleRef.current.querySelectorAll('span');
    const colors = ['text-[#00f0ff]', 'text-[#ff00a0]', 'text-[#00ff8c]'];
    
    letters.forEach((letter, i) => {
      letter.className = colors[i % colors.length];
    });
  }, []);
  
  return (
    <header className="relative mb-16 pt-6">
      <div className="text-center relative">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-2 animate-flicker inline-block tracking-wider"
        >
          <span>К</span>
          <span>Л</span>
          <span>Э</span>
          <span>П</span>
          <span>Т</span>
          <span>Р</span>
          <span>Э</span>
          <span>П</span>
        </h1>
        <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent my-4"></div>
        <p className="text-[#eeeeee]/70 text-lg">Digital Art Zine</p>
      </div>
      
      {/* Navigation buttons */}
      <nav className="mt-8 flex justify-center space-x-3 flex-wrap">
        {Array.from({ length: poemCount }).map((_, i) => (
          <button
            key={i}
            className="px-3 py-1 rounded border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/20 transition-all text-sm mb-2"
            onClick={() => onNavigate(i)}
          >
            {(i + 1).toString().padStart(2, '0')}
          </button>
        ))}
      </nav>
    </header>
  );
}
