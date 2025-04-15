import { useState } from "react";
import { initialPoems, Poem } from "@/lib/poems";
import PoetrySection from "@/components/PoetrySection";
import EditorModal from "@/components/EditorModal";
import ControlsPanel from "@/components/ControlsPanel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [editMode, setEditMode] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [currentPoemIndex, setCurrentPoemIndex] = useState<number | null>(null);
  const [localPoems, setLocalPoems] = useState<Poem[]>(initialPoems);
  
  const handleNavigate = (index: number) => {
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleEditPoem = (index: number) => {
    setCurrentPoemIndex(index);
    setEditorOpen(true);
  };
  
  const handleSavePoem = (content: string) => {
    if (currentPoemIndex === null) return;
    
    // Update only in local state since this is a static version
    setLocalPoems(prev => {
      const newPoems = [...prev];
      newPoems[currentPoemIndex] = {
        ...newPoems[currentPoemIndex],
        content
      };
      return newPoems;
    });
    
    setEditorOpen(false);
    setCurrentPoemIndex(null);
  };
  
  const handleAddNewSection = () => {
    const newPoem: Poem = {
      id: localPoems.length + 1,
      content: "Новый текст...",
    };
    
    setLocalPoems(prev => [...prev, newPoem]);
    
    // Scroll to the new section after a short delay to let the DOM update
    setTimeout(() => {
      const newIndex = localPoems.length;
      document.getElementById(`section-${newIndex}`)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
    
    // When edit mode is enabled, show all section controls
    document.querySelectorAll('.group-hover\\:opacity-100').forEach(el => {
      if (!editMode) {
        el.classList.remove('group-hover:opacity-100');
        el.classList.add('opacity-100');
      } else {
        el.classList.add('group-hover:opacity-100');
        el.classList.remove('opacity-100');
      }
    });
  };
  
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Ambient background effects */}
      <div className="fixed inset-0 bg-[length:20px_20px] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-1/4 opacity-30 pointer-events-none bg-[radial-gradient(circle,rgba(0,240,255,0.2)_0%,rgba(17,17,17,0)_70%)]"></div>
      <div className="scan-line fixed inset-0 pointer-events-none"></div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Header poemCount={localPoems.length} onNavigate={handleNavigate} />
        
        <ControlsPanel toggleEditMode={toggleEditMode} editMode={editMode} />
        
        {/* Poetry Sections */}
        <main className="max-w-3xl mx-auto">
          {localPoems.map((poem, index) => (
            <PoetrySection 
              key={index}
              poem={poem}
              index={index}
              onEdit={handleEditPoem}
            />
          ))}
          
          {/* Add New Section Button */}
          <div className="flex justify-center mb-16">
            <button 
              className="px-6 py-3 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 text-[#00f0ff] rounded-lg border border-[#00f0ff]/50 transition-all group"
              onClick={handleAddNewSection}
            >
              <i className="fas fa-plus mr-2 group-hover:rotate-90 transition-transform"></i> Add New Section
            </button>
          </div>
        </main>
        
        <Footer />
        
        {/* Editor Modal */}
        <EditorModal 
          isOpen={editorOpen}
          currentPoem={currentPoemIndex !== null ? localPoems[currentPoemIndex] : null}
          onClose={() => {
            setEditorOpen(false);
            setCurrentPoemIndex(null);
          }}
          onSave={handleSavePoem}
        />
      </div>
    </div>
  );
}
