import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-github';
import { SketchPicker } from 'react-color';
import { FaPalette, FaSave, FaFileCode, FaFileExport } from 'react-icons/fa';

const themes = {
  default: `.sandbox h1 {
}

.sandbox h2 {
}

.sandbox h3 { 
}

.sandbox h4{
}

.sandbox input[type="text"]{
}

.sandbox input {
}

.sandbox * {
}`,
  theme1: `.sandbox h1 {
  color: blue;
}

.sandbox h2 {
  color: darkblue;
}

.sandbox p {
  color: lightblue;
}

.sandbox input[type="text"]{
  border-color: blue;
}

.sandbox input {
  border-color: blue;
}

.sandbox * {
  font-family: Arial, sans-serif;
}`,
  theme2: `.sandbox h1 {
  color: gray;
}

.sandbox h2 {
  color: darkgray;
}

.sandbox p {
  color: lightgray;
}

.sandbox input[type="text"]{
  border-color: gray;
}

.sandbox input {
  border-color: gray;
}

.sandbox * {
  font-family: 'Times New Roman', Times, serif;
}`,
};

const layouts = {
  layout1: `
    <div class="sandbox h-full overflow-auto p-4">
      <h1 class="text-xl mb-2">Heading 1</h1>
      <h2 class="text-lg mb-2">Heading 2</h2>
      <h3 class="text-md mb-2">Heading 3</h3>
      <h4 class="text-md mb-2">Heading 4</h4>
      <h5 class="text-md mb-2">Heading 5</h5>
      <h6 class="text-md mb-2">Heading 6</h6>
      <p class="mb-2">Paragraph</p>
      <input type="text" placeholder="Text Input" class="mb-2 p-2 border border-gray-300 rounded w-full" />
      <input type="file" class="mb-2 p-2 border border-gray-300 rounded w-full" />
      <input type="date" class="mb-2 p-2 border border-gray-300 rounded w-full" />
      <textarea placeholder="Textarea" class="mb-2 p-2 border border-gray-300 rounded w-full"></textarea>
      <input type="checkbox" class="mb-2 p-2 border border-gray-300 rounded" />
      <div class="p-2 border border-gray-300 rounded">Div Element</div>
    </div>
  `,
  layout2: `
    <div class="sandbox h-full overflow-auto p-4 bg-blue-50">
      <h1 class="text-2xl mb-2 text-blue-600">Themed Heading 1</h1>
      <h2 class="text-xl mb-2 text-blue-500">Themed Heading 2</h2>
      <p class="mb-2 text-blue-400">Themed Paragraph</p>
      <input type="text" placeholder="Text Input" class="mb-2 p-2 border border-blue-300 rounded w-full" />
      <input type="file" class="mb-2 p-2 border border-blue-300 rounded w-full" />
      <input type="date" class="mb-2 p-2 border border-blue-300 rounded w-full" />
      <textarea placeholder="Textarea" class="mb-2 p-2 border border-blue-300 rounded w-full"></textarea>
      <input type="checkbox" class="mb-2 p-2 border border-blue-300 rounded" />
      <div class="p-2 border border-blue-300 rounded">Themed Div Element</div>
    </div>
  `,
  layout3: `
    <div class="sandbox h-full overflow-auto p-4 bg-gray-50">
      <h1 class="text-2xl mb-2 text-gray-700">Gray Theme Heading 1</h1>
      <h2 class="text-xl mb-2 text-gray-600">Gray Theme Heading 2</h2>
      <p class="mb-2 text-gray-500">Gray Theme Paragraph</p>
      <input type="text" placeholder="Text Input" class="mb-2 p-2 border border-gray-400 rounded w-full" />
      <input type="file" class="mb-2 p-2 border border-gray-400 rounded w-full" />
      <input type="date" class="mb-2 p-2 border border-gray-400 rounded w-full" />
      <textarea placeholder="Textarea" class="mb-2 p-2 border border-gray-400 rounded w-full"></textarea>
      <input type="checkbox" class="mb-2 p-2 border border-gray-400 rounded" />
      <div class="p-2 border border-gray-400 rounded">Gray Theme Div Element</div>
    </div>
  `,
};

const CssSandbox = () => {
  const [css, setCss] = useState(themes.default);
  const [color, setColor] = useState('#000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [selectedLayout, setSelectedLayout] = useState('layout1');
  const iframeRef = useRef(null);

  const handleCssChange = (newValue) => {
    setCss(newValue);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    document.execCommand('insertText', false, color.hex);
  };

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
    setCss(themes[e.target.value]);
  };

  const handleLayoutChange = (e) => {
    setSelectedLayout(e.target.value);
  };

  const exportCss = () => {
    const blob = new Blob([css], { type: 'text/css' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'styles.css';
    link.click();
  };

  const exportHtml = () => {
    const html = iframeRef.current.contentDocument.body.innerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    link.click();
  };

  const exportHtmlAndCss = () => {
    const html = iframeRef.current.contentDocument.body.innerHTML;
    const combinedContent = `
      <style>${css}</style>
      ${html}
    `;
    const blob = new Blob([combinedContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'index.html';
    link.click();
  };

  useEffect(() => {
    const iframeDocument = iframeRef.current.contentDocument;
    const styleElement = iframeDocument.createElement('style');
    styleElement.innerHTML = css;
    iframeDocument.head.innerHTML = ''; // Clear previous styles
    iframeDocument.head.appendChild(styleElement);

    iframeDocument.body.innerHTML = layouts[selectedLayout];

  }, [css, selectedLayout]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex items-center gap-2 p-2 bg-gray-200 border-b border-gray-300">
       
        {showColorPicker && (
          <div className="">
            <SketchPicker 
              color={color} 
              onChangeComplete={handleColorChange} 
            />
          </div>
        )}
        <select
          className=" px-2 py-1 border border-gray-300 rounded"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option value="default">Default Theme</option>
          <option value="theme1">Blue Theme</option>
          <option value="theme2">Gray Theme</option>
        </select>
        <select
          className=" px-2 py-1 border border-gray-300 rounded"
          value={selectedLayout}
          onChange={handleLayoutChange}
        >
          <option value="layout1">Layout 1</option>
          <option value="layout2">Layout 2</option>
          <option value="layout3">Layout 3</option>
        </select> 
        <button 
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <FaPalette />
        </button>
        <button 
          className=" p-2 bg-green-500 text-white rounded"
          onClick={exportCss}
        >
          <FaSave />
        </button>
        <button 
          className=" p-2 bg-green-500 text-white rounded"
          onClick={exportHtml}
        >
          <FaFileCode />
        </button>
        <button 
          className=" p-2 bg-green-500 text-white rounded"
          onClick={exportHtmlAndCss}
        >
          <FaFileExport />
        </button>
      </div>
      <div className="flex h-full">
        <AceEditor
          mode="css"
          theme="github"
          name="css-editor"
          onChange={handleCssChange}
          fontSize={14}
          value={css}
          width="50%"
          height="100%"
          setOptions={{
            useWorker: false
          }}
          className="border-r border-gray-300"
        />
        <div className="w-1/2 h-full p-4 bg-gray-100 border-l border-gray-300">
          <iframe
            ref={iframeRef}
            title="sandbox"
            className="w-full h-full border border-gray-300 rounded"
            style={{ backgroundColor: '#fff' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CssSandbox;
