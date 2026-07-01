import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, type EditorState, type LexicalEditor } from 'lexical';
import { useTranslation } from 'react-i18next';
import { Component, type ReactNode } from 'react';
import Toolbar from './RichTextToolbar';

class SimpleErrorBoundary extends Component<{ children: ReactNode; onError: (error: Error) => void }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; onError: (error: Error) => void }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const theme = {
  paragraph: 'text-sm text-gray-900 mb-2',
  heading: {
    h1: 'text-2xl font-bold text-gray-900 mb-3 mt-4',
    h2: 'text-xl font-bold text-gray-900 mb-2 mt-3',
    h3: 'text-lg font-semibold text-gray-900 mb-2 mt-3',
  },
  list: {
    ul: 'list-disc ml-6 mb-2 text-sm text-gray-900',
    ol: 'list-decimal ml-6 mb-2 text-sm text-gray-900',
    listitem: 'mb-1',
  },
  link: 'text-accent-600 underline cursor-pointer',
  quote: 'border-l-4 border-accent-300 pl-4 italic text-gray-600 my-3',
  hr: 'my-4 border-gray-200',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
  },
};

function onError(error: Error) {
  console.error(error);
}

interface RichTextEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function RichTextEditorInner({ initialContent, onChange, placeholder }: RichTextEditorProps) {
  const { t } = useTranslation();
  const placeholderText = placeholder || t('rte.placeholder');

  const initialConfig = {
    namespace: 'HaertnerEditor',
    theme,
    onError,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      HorizontalRuleNode,
    ],
    editorState: undefined as ((editor: LexicalEditor) => void) | undefined,
  };

  if (initialContent) {
    initialConfig.editorState = (editor: LexicalEditor) => {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(initialContent, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        $insertNodes(nodes);
      });
    };
  }

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const htmlString = JSON.stringify(editorState.toJSON());
      onChange(htmlString);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <Toolbar />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[500px] px-6 py-5 outline-none text-sm text-gray-900"
                aria-placeholder={placeholderText}
                placeholder={
                  <div className="absolute top-5 left-6 text-sm text-gray-300 pointer-events-none select-none">
                    {placeholderText}
                  </div>
                }
              />
            }
            ErrorBoundary={SimpleErrorBoundary}
          />
        </div>
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
      <HorizontalRulePlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
}

export default function RichTextEditor(props: RichTextEditorProps) {
  return <RichTextEditorInner {...props} />;
}