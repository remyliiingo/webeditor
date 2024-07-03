import React, { useEffect, useRef} from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import "grapesjs/dist/css/grapes.min.css";
import gjsForms from 'grapesjs-plugin-forms'
import pluginCountdown from "grapesjs-component-countdown";
import thePlugin from "grapesjs-plugin-export";
import * as imageEditor from "grapesjs-tui-image-editor";
import pluginTooltip from "grapesjs-tooltip";
import customCodePlugin from "grapesjs-custom-code";
import * as navbar from "grapesjs-navbar";
import indexeddb from "grapesjs-indexeddb";
import parserPostCSS from "grapesjs-parser-postcss";

const WebEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const NavBar = navbar.default;
  const ImageEditor = imageEditor.default;
//   const [editor, setEditor] = useState< Editor| null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = grapesjs.init({
        container: editorRef.current,
        height: "100vh",
        // storageManager: {
        //   type: "local",
        //   autosave: true,
        //   autoload: true,
        //   stepsBeforeSave: 1,
        // },
        storageManager: { type: "indexeddb" },
        plugins: [
          gjsPresetWebpage,
          gjsBlocksBasic,
          gjsForms,
          pluginCountdown,
          thePlugin,
          ImageEditor,
          pluginTooltip,
          customCodePlugin,
          NavBar,
          indexeddb,
          parserPostCSS,
        ],
        pluginsOpts: {
          gjsPresetWebpage: {},
          gjsBlocksBasic: {},
          thePlugin: {
            addExportBtn: true,
            btnLabel: "export",
            filenamePfx: "site_",
          },
          NavBar: {
            id: "navbar",
            label: "NavBar",
          },
        },
        canvas: {
          //   styles: [
          //     "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
          //   ],
          //   scripts: [
          //     "https://code.jquery.com/jquery-3.5.1.slim.min.js",
          //     "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js",
          //   ],
        },
      });

    //   setEditor(editor);

      // Clean up on unmount
      return () => {
        editor.destroy();
      };
    }
  }, []);

//   const handleExport = () => {
//     if (editor) {
//       const html = editor.getHtml();
//       const css = editor.getCss();
//       console.log("HTML:", html);
//       console.log("CSS:", css);
//       // Here you can implement logic to save or download the exported code
//     }
//   };

//   const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && editor) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const content = e.target?.result as string;
//         editor.setComponents(content);
//       };
//       reader.readAsText(file);
//     }
//   };

  return (
    
      <div ref={editorRef}></div>
  );
};

export default WebEditor;
