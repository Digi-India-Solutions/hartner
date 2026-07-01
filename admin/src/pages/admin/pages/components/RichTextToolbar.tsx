import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';

const FONT_FAMILIES = ['Inter', 'Arial', 'Georgia', 'Times New Roman', 'Courier New'];
const FONT_SIZES = ['10', '12', '14', '16', '18', '20', '24', '28', '32', '36'];

const TEXT_COLORS = [
  '#111827', '#4B5563', '#6B7280', '#9CA3AF',
  '#EF4444', '#F97316', '#F59E0B', '#10B981',
  '#06B6D4', '#3B82F6', '#4F46E5', '#8B5CF6',
  '#EC4899', '#FFFFFF', '#000000',
];

const BG_COLORS = [
  'transparent', '#FEF2F2', '#FFF7ED', '#FEFCE8',
  '#ECFDF5', '#F0FDFA', '#EFF6FF', '#EEF2FF',
  '#F5F3FF', '#FDF2F8', '#F9FAFB', '#F3F4F6',
  '#FDE68A', '#FCA5A5',
];

const HEADING_OPTIONS = [
  { labelKey: 'rte.headingNormal', value: 'paragraph' },
  { labelKey: 'rte.heading1', value: 'h1' },
  { labelKey: 'rte.heading2', value: 'h2' },
  { labelKey: 'rte.heading3', value: 'h3' },
];

function Toolbar() {
  const { t } = useTranslation();
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('16');
  const [heading, setHeading] = useState('paragraph');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const bgColorPickerRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
          setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
      });
    });
  }, [editor]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
      if (bgColorPickerRef.current && !bgColorPickerRef.current.contains(e.target as Node)) {
        setShowBgColorPicker(false);
      }
      if (linkInputRef.current && !linkInputRef.current.contains(e.target as Node)) {
        setShowLinkInput(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const ToolbarBtn = ({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title: string }) => (
    <button
      onClick={onClick}
      title={title}
      className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors cursor-pointer ${
        active ? 'bg-accent-100 text-accent-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );

  const applyFontFamily = (ff: string) => {
    setFontFamily(ff);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText('font-family', ff);
      }
    });
  };

  const applyFontSize = (fs: string) => {
    setFontSize(fs);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText('font-size', `${fs}px`);
      }
    });
  };

  const applyTextColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText('color', color === '#111827' ? '' : color);
      }
    });
    setShowColorPicker(false);
  };

  const applyBgColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText('background-color', color === 'transparent' ? '' : color);
      }
    });
    setShowBgColorPicker(false);
  };

  const insertLink = () => {
    if (linkUrl.trim()) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: linkUrl.trim(), target: '_blank' });
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
    setShowLinkInput(false);
    setLinkUrl('');
  };

  const clearFormatting = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.clearFormat();
      }
    });
  };

  return (
    <div className="border border-gray-200 rounded-t-lg bg-white">
      {/* Row 1: Text Style */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-100 flex-wrap">
        <select
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="h-7 px-2 text-xs border border-gray-200 rounded bg-white cursor-pointer min-w-[90px]"
        >
          {HEADING_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{t(o.labelKey)}</option>
          ))}
        </select>
        <select
          value={fontFamily}
          onChange={(e) => applyFontFamily(e.target.value)}
          className="h-7 px-2 text-xs border border-gray-200 rounded bg-white cursor-pointer min-w-[110px]"
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <select
          value={fontSize}
          onChange={(e) => applyFontSize(e.target.value)}
          className="h-7 px-2 text-xs border border-gray-200 rounded bg-white cursor-pointer w-[58px]"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Row 2: Formatting */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-100 flex-wrap">
        <ToolbarBtn active={isBold} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')} title={t('rte.bold')}>
          <strong>B</strong>
        </ToolbarBtn>
        <ToolbarBtn active={isItalic} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')} title={t('rte.italic')}>
          <em>I</em>
        </ToolbarBtn>
        <ToolbarBtn active={isUnderline} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')} title={t('rte.underline')}>
          <span className="underline">U</span>
        </ToolbarBtn>
        <ToolbarBtn active={isStrikethrough} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')} title={t('rte.strikethrough')}>
          <span className="line-through">S</span>
        </ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1"></div>
        {/* Text Color */}
        <div className="relative" ref={colorPickerRef}>
          <button
            onClick={() => { setShowColorPicker(!showColorPicker); setShowBgColorPicker(false); }}
            className="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title={t('rte.textColor')}
          >
            <span className="flex flex-col items-center">
              <span className="text-[14px] font-bold leading-none">A</span>
              <span className="w-4 h-0.5 bg-gray-500 mt-px"></span>
            </span>
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[208px]">
              <div className="grid grid-cols-7 gap-1">
                {TEXT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => applyTextColor(color)}
                    className="w-6 h-6 rounded border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Background Color */}
        <div className="relative" ref={bgColorPickerRef}>
          <button
            onClick={() => { setShowBgColorPicker(!showBgColorPicker); setShowColorPicker(false); }}
            className="w-8 h-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            title={t('rte.bgColor')}
          >
            <i className="ri-mark-pen-line text-sm"></i>
          </button>
          {showBgColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[208px]">
              <div className="grid grid-cols-7 gap-1">
                {BG_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => applyBgColor(color)}
                    className="w-6 h-6 rounded border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-px h-5 bg-gray-200 mx-1"></div>
        <ToolbarBtn active={false} onClick={clearFormatting} title={t('rte.clearFormat')}>
          <span className="text-[11px]">Tx</span>
        </ToolbarBtn>
      </div>

      {/* Row 3: Alignment & Lists */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-100 flex-wrap">
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')} title={t('rte.alignLeft')}>
          <i className="ri-align-left text-sm"></i>
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')} title={t('rte.alignCenter')}>
          <i className="ri-align-center text-sm"></i>
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')} title={t('rte.alignRight')}>
          <i className="ri-align-right text-sm"></i>
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')} title={t('rte.alignJustify')}>
          <i className="ri-align-justify text-sm"></i>
        </ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1"></div>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)} title={t('rte.bulletList')}>
          <i className="ri-list-unordered text-sm"></i>
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)} title={t('rte.numberedList')}>
          <i className="ri-list-ordered text-sm"></i>
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'indent')} title={t('rte.indentIncrease')}>
          <i className="ri-indent-increase text-sm"></i>
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'outdent')} title={t('rte.indentDecrease')}>
          <i className="ri-indent-decrease text-sm"></i>
        </ToolbarBtn>
      </div>

      {/* Row 4: Insert & Utilities */}
      <div className="flex items-center gap-1 px-2 py-1.5 flex-wrap">
        <div className="relative" ref={linkInputRef}>
          <ToolbarBtn active={false} onClick={() => setShowLinkInput(!showLinkInput)} title={t('rte.insertLink')}>
            <i className="ri-link text-sm"></i>
          </ToolbarBtn>
          {showLinkInput && (
            <div className="absolute top-full left-0 mt-1 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-64">
              <input
                type="text"
                placeholder={t('rte.linkPlaceholder')}
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-accent-300"
                onKeyDown={(e) => e.key === 'Enter' && insertLink()}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => { setShowLinkInput(false); setLinkUrl(''); }}
                  className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {t('rte.linkCancel')}
                </button>
                <button
                  onClick={insertLink}
                  className="px-2 py-1 text-xs bg-accent-500 text-white rounded hover:bg-accent-600 cursor-pointer"
                >
                  {t('rte.linkInsert')}
                </button>
              </div>
            </div>
          )}
        </div>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)} title={t('rte.horizontalRule')}>
          <i className="ri-separator text-sm"></i>
        </ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1"></div>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} title={t('rte.undo')}>
          <i className="ri-arrow-go-back-line text-sm"></i>
        </ToolbarBtn>
        <ToolbarBtn active={false} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} title={t('rte.redo')}>
          <i className="ri-arrow-go-forward-line text-sm"></i>
        </ToolbarBtn>
      </div>
    </div>
  );
}

export default Toolbar;