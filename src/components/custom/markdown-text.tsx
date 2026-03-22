import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Element } from "hast";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <div className="markdown-body p-0!">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
          h4: ({ children }) => <h4 className="md-h4">{children}</h4>,
          h5: ({ children }) => <h5 className="md-h5">{children}</h5>,
          h6: ({ children }) => <h6 className="md-h6">{children}</h6>,

          // Paragraph
          p: ({ children }) => <p className="md-p">{children}</p>,

          // Links — blue color
          a: ({ href, children }) => (
            <a
              href={href}
              className="md-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Unordered list
          ul: ({ children }) => <ul className="md-ul">{children}</ul>,

          // Ordered list
          ol: ({ children }) => <ol className="md-ol">{children}</ol>,

          // List item (handles checkboxes too via remark-gfm)
          li: ({ children, node }) => {
            const checked = (node as Element)?.properties?.checked;
            const isTaskItem = checked !== null && checked !== undefined;

            if (isTaskItem) {
              return (
                <li className="md-task-item">
                  <input
                    type="checkbox"
                    checked={!!checked}
                    readOnly
                    className="md-checkbox"
                  />
                  <span>{children}</span>
                </li>
              );
            }
            return <li className="md-li">{children}</li>;
          },

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="md-blockquote">{children}</blockquote>
          ),

          // Table (GFM)
          table: ({ children }) => (
            <div className="md-table-wrapper">
              <table className="md-table">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="md-thead">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => <tr className="md-tr">{children}</tr>,
          th: ({ children, style }) => (
            <th className="md-th" style={style}>
              {children}
            </th>
          ),
          td: ({ children, style }) => (
            <td className="md-td" style={style}>
              {children}
            </td>
          ),

          // Horizontal rule
          hr: () => <hr className="md-hr" />,

          code: ({ children, className, node, ...rest }) => {
            const isBlock =
              node?.position?.start.line !== node?.position?.end.line ||
              className?.includes("language-");
            return isBlock ? (
              <pre className="md-pre">
                <code className={className}>{children}</code>
              </pre>
            ) : (
              <code className="md-inline-code" {...rest}>
                {children}
              </code>
            );
          },

          img: ({ src, alt, title }) => {
            if (!src || typeof src !== "string") return null;
            return (
              <Image
                src={src}
                alt={alt ?? ""}
                title={title ?? ""}
                width={800}
                height={450}
                className="md-img"
              />
            );
          },

          // Bold & Italic
          strong: ({ children }) => (
            <strong className="md-strong">{children}</strong>
          ),
          em: ({ children }) => <em className="md-em">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>

      <style>{`
        .markdown-body {
          font-family: 'Cera Pro',sans-serif;
          font-size: 1rem;
          line-height: 1.75;
          color: #1a1a2e;
          max-width: 780px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        /* ── Headings ── */
        .md-h1, .md-h2, .md-h3,
        .md-h4, .md-h5, .md-h6 {
          font-family: 'Cera Pro', sans-serif;
          font-weight: 700;
          line-height: 1.25;
          margin-top: 2rem;
          margin-bottom: 0.6rem;
          color: #0f0f23;
          letter-spacing: -0.01em;
        }
        .md-h1 { font-size: 2.25rem; border-bottom: 3px solid #e2e8f0; padding-bottom: 0.4rem; }
        .md-h2 { font-size: 1.75rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; }
        .md-h3 { font-size: 1.4rem; }
        .md-h4 { font-size: 1.15rem; }
        .md-h5 { font-size: 1rem; }
        .md-h6 { font-size: 0.9rem; color: #4a5568; }

        /* ── Paragraph ── */
        .md-p {
          margin: 0.75rem 0;
          color: #2d3748;
        }

        /* ── Links — blue ── */
        .md-link {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s ease;
        }
        .md-link:hover {
          color: #1d4ed8;
        }

        /* ── Unordered list ── */
        .md-ul {
          list-style: disc;
          padding-left: 1.6rem;
          margin: 0.75rem 0;
        }
        .md-ul .md-ul {
          list-style: circle;
          margin: 0.25rem 0;
        }
        .md-ul .md-ul .md-ul {
          list-style: square;
        }

        /* ── Ordered list ── */
        .md-ol {
          list-style: decimal;
          padding-left: 1.6rem;
          margin: 0.75rem 0;
        }
        .md-ol .md-ol {
          list-style: lower-alpha;
          margin: 0.25rem 0;
        }

        /* ── List items ── */
        .md-li {
          margin: 0.3rem 0;
          color: #2d3748;
        }

        /* ── Task list ── */
        .md-task-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0.3rem 0;
          color: #2d3748;
        }
        .md-checkbox {
          width: 1rem;
          height: 1rem;
          accent-color: #2563eb;
          cursor: default;
          flex-shrink: 0;
        }

        /* ── Blockquote ── */
        .md-blockquote {
          border-left: 4px solid #2563eb;
          background: #eff6ff;
          padding: 0.75rem 1.25rem;
          margin: 1rem 0;
          color: #1e40af;
          border-radius: 0 6px 6px 0;
          font-style: italic;
        }
        .md-blockquote p { margin: 0.25rem 0; }
        /* Nested blockquote */
        .md-blockquote .md-blockquote {
          border-left-color: #93c5fd;
          background: #dbeafe;
          margin-top: 0.5rem;
        }

        /* ── Table ── */
        .md-table-wrapper {
          overflow-x: auto;
          margin: 1.25rem 0;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .md-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .md-thead {
          background: #1e3a5f;
          color: #fff;
        }
        .md-th {
          padding: 0.65rem 1rem;
          text-align: left;
          font-weight: 600;
          letter-spacing: 0.03em;
          font-size: 0.85rem;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .md-tr:nth-child(even) {
          background: #f0f7ff;
        }
        // .md-tr:hover {
        //   background: #dbeafe;
        //   transition: background 0.15s ease;
        // }
        .md-td {
          padding: 0.6rem 1rem;
          color: #334155;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: top;
        }

        /* ── Horizontal rule ── */
        .md-hr {
          border: none;
          border-top: 2px solid #e2e8f0;
          margin: 2rem 0;
        }

        /* ── Code ── */
        .md-inline-code {
          background: #f1f5f9;
          color: #c7254e;
          padding: 0.15em 0.4em;
          border-radius: 4px;
          font-size: 0.88em;
          font-family: 'Fira Code', 'Courier New', monospace;
        }
        .md-pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.1rem 1.4rem;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 1rem 0;
        }

        /* ── Images ── */
        .md-img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
          display: block;
        }

        /* ── Strong / Em ── */
        .md-strong { font-weight: 700; }
        .md-em     { font-style: italic; }
      `}</style>
    </div>
  );
};

export default MarkdownRenderer;
