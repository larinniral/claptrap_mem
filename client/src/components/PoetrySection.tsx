import { useState } from "react";
import { Poem } from "@/lib/poems";

interface PoetrySectionProps {
  poem: Poem;
  index: number;
  onEdit: (id: number) => void;
}

export default function PoetrySection({ 
  poem, 
  index, 
  onEdit 
}: PoetrySectionProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const sectionNumber = (index + 1).toString().padStart(2, '0');
  
  // Alternate between blue and pink for borders
  const borderColor = index % 2 === 0 ? "border-[#00f0ff]/30" : "border-[#ff00a0]/30";
  const bgColor = index % 2 === 0 ? "bg-[#00f0ff]" : "bg-[#ff00a0]";
  const shadowEffect = index % 2 === 0 ? "shadow-[0_0_5px_#00f0ff,0_0_10px_rgba(0,240,255,0.8)]" : "shadow-[0_0_5px_#ff00a0,0_0_10px_rgba(255,0,160,0.8)]";
  const hoverEffect = index % 2 === 0 ? "hover:shadow-[0_0_5px_#00f0ff,0_0_10px_rgba(0,240,255,0.8)]" : "hover:shadow-[0_0_5px_#ff00a0,0_0_10px_rgba(255,0,160,0.8)]";
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(poem.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section 
      id={`section-${index}`} 
      className="mb-16 relative transform transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.02]"
      data-section-id={index}
    >
      <div 
        className={`bg-[#0a0a0a]/80 ${borderColor} border rounded-lg p-6 overflow-hidden relative ${hoverEffect} transition-all duration-300 group`}
      >
        {/* Section number */}
        <div className={`absolute -top-4 -left-4 ${bgColor} text-[#111111] w-8 h-8 rounded-full flex items-center justify-center font-bold ${shadowEffect}`}>
          {sectionNumber}
        </div>
        
        {/* Content */}
        <div className="relative">
          <pre 
            className="glitch-text whitespace-pre-wrap text-lg leading-relaxed mb-3"
            data-text={poem.content}
          >
            {poem.content}
          </pre>
        </div>

        {/* Section controls (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-4">
            <button 
              className="px-3 py-2 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 text-[#00f0ff] rounded border border-[#00f0ff]/50 transition-all"
              onClick={() => onEdit(index)}
            >
              <i className="fas fa-pencil-alt mr-2"></i> Edit
            </button>
            <button 
              className="px-3 py-2 bg-[#ff00a0]/20 hover:bg-[#ff00a0]/40 text-[#ff00a0] rounded border border-[#ff00a0]/50 transition-all"
              onClick={copyToClipboard}
            >
              <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'} mr-2`}></i> 
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
