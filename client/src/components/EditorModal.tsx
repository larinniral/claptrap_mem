import { useEffect, useRef } from "react";
import { Poem } from "@/lib/poems";

interface EditorModalProps {
  isOpen: boolean;
  currentPoem: Poem | null;
  onClose: () => void;
  onSave: (content: string) => void;
}

export default function EditorModal({ 
  isOpen, 
  currentPoem, 
  onClose, 
  onSave 
}: EditorModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    
    // Focus the textarea when modal opens
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textareaRef.current) {
      onSave(textareaRef.current.value);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-[#111111]/90 flex items-center justify-center z-50 animate-in fade-in">
      <div className="bg-[#0a0a0a] border-2 border-[#00f0ff] rounded-lg w-full max-w-2xl p-6 relative">
        <button 
          className="absolute top-3 right-3 text-[#eeeeee]/60 hover:text-[#eeeeee] transition-colors"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        
        <h3 className="text-xl font-bold mb-6 text-[#00f0ff]">Edit Content</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="contentEditor" className="block text-[#eeeeee]/80 mb-2">Content:</label>
            <textarea 
              ref={textareaRef}
              id="contentEditor" 
              className="w-full bg-[#111111] border border-[#00f0ff]/30 rounded p-3 text-[#eeeeee] font-['Roboto_Mono',monospace] h-60"
              defaultValue={currentPoem?.content || ""}
            />
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              className="px-4 py-2 bg-[#0a0a0a] border border-[#eeeeee]/30 text-[#eeeeee]/80 rounded hover:bg-[#111111] transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50 rounded hover:bg-[#00f0ff]/40 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
