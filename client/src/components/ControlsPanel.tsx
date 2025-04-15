import { useState } from "react";
import { useTheme } from "@/components/ui/theme-provider";

interface ControlsPanelProps {
  toggleEditMode: () => void;
  editMode: boolean;
}

export default function ControlsPanel({ toggleEditMode, editMode }: ControlsPanelProps) {
  const [controlsOpen, setControlsOpen] = useState(false);
  const { toggleAnimations, animationsEnabled } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50 md:top-8 md:bottom-auto bg-[#0a0a0a]/60 p-3 rounded-lg border border-[#00f0ff]/30 shadow-[0_0_5px_#00f0ff,0_0_10px_rgba(0,240,255,0.8)] backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <button 
          className="text-[#00f0ff] hover:text-[#ff00a0] transition-colors" 
          title="Toggle controls menu"
          onClick={() => setControlsOpen(!controlsOpen)}
        >
          <i className="fas fa-sliders-h"></i>
        </button>
        
        {controlsOpen && (
          <div className="flex space-x-3">
            <button 
              className="text-[#00f0ff] hover:text-[#ff00a0] transition-colors" 
              title="Toggle all animations"
              onClick={toggleAnimations}
            >
              <i className={`fas ${animationsEnabled ? 'fa-film' : 'fa-film-slash'}`}></i>
            </button>
            
            <button 
              className="text-[#00f0ff] hover:text-[#ff00a0] transition-colors" 
              title="Edit content"
              onClick={toggleEditMode}
            >
              <i className={`fas ${editMode ? 'fa-eye' : 'fa-edit'}`}></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
