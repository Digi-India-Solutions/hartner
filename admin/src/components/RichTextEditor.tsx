import { useRef, useEffect } from "react";
import { Bold, Italic, List, ListOrdered, Link, Trash2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = "Start typing...",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync state to DOM only when it changes externally
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, arg: string = "") => {
    document.execCommand(command, false, arg);
    handleInput();
  };

  const addLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  return (
    <div className="flex flex-col mt-4">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-navy-500 mb-1">
          {label}
        </label>
      )}
      <div className="border border-navy-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-500 transition-all duration-200">
        {/* Toolbar */}
        <div className="bg-navy-50 border-b border-navy-100 px-3 py-2 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => executeCommand("bold")}
            className="p-1.5 rounded hover:bg-navy-200 text-navy-600 hover:text-navy-950 transition-colors"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("italic")}
            className="p-1.5 rounded hover:bg-navy-200 text-navy-600 hover:text-navy-950 transition-colors"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <div className="w-[1px] bg-navy-200 my-1 self-stretch mx-1"></div>
          <button
            type="button"
            onClick={() => executeCommand("insertUnorderedList")}
            className="p-1.5 rounded hover:bg-navy-200 text-navy-600 hover:text-navy-950 transition-colors"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("insertOrderedList")}
            className="p-1.5 rounded hover:bg-navy-200 text-navy-600 hover:text-navy-950 transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={addLink}
            className="p-1.5 rounded hover:bg-navy-200 text-navy-600 hover:text-navy-950 transition-colors"
            title="Insert Link"
          >
            <Link className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("removeFormat")}
            className="p-1.5 rounded hover:bg-navy-200 text-navy-600 hover:text-navy-950 transition-colors"
            title="Clear Formatting"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Editable Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          data-placeholder={placeholder}
          className="px-4 py-3 min-h-[200px] max-h-[400px] overflow-y-auto focus:outline-none text-navy-900 prose prose-sm max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-navy-300 empty:before:pointer-events-none"
          style={{ outline: "none" }}
        />
      </div>
    </div>
  );
}
