import ace from 'brace';
import {html as beautify} from 'js-beautify';
import headersEx from './headers';

import 'brace/mode/html';
import 'brace/theme/monokai';
import 'brace/keybinding/vim';
import 'brace/ext/beautify';

const LAYOUTS = {
  STACK: 0,
  VERTICAL: 1,
  HORIZONTAL: 2,
};

const LAYOUTS_LENGTH = Object.keys(LAYOUTS).length;

window.onload = () => {
  const $editor = document.querySelector('#editor');
  const $content = document.querySelector('#content');
  const $main = document.querySelector('main');
  let isOnVim = false;
  let layout = LAYOUTS.STACK;
  let isOnEditor = true;

  let buffers = [
    {
      title: 'Padrão',
      code: ``,
    },
    headersEx,
  ];
  let currentBuffer = 0;

  document.querySelector('#select-buffer').innerHTML = buffers
    .map(
      (buffer, i) => `
    <option value="${i}">${buffer.title}</option>
  `,
    )
    .join('');

  function setIsOnEditor(value) {
    isOnEditor = typeof value !== 'undefined' ? value : !isOnEditor;
    updateEditorVisibility();
  }

  function updateEditorVisibility() {
    if (layout === LAYOUTS.STACK) {
      if (isOnEditor) {
        $editor.style.display = 'block';
        $content.style.display = 'none';
        editor.focus();
      } else {
        $content.style.display = 'block';
        $editor.style.display = 'none';
      }
    } else {
      editor.focus();
    }
  }

  function changeBuffer(newBuffer) {
    buffers[currentBuffer].code = editor.getSession().getValue();
    currentBuffer = newBuffer;
    $content.innerHTML = buffers[currentBuffer].code;
    editor.getSession().setValue(buffers[currentBuffer].code);
  }

  function updateLayout(newLayout) {
    layout =
      typeof newLayout === 'undefined'
        ? (layout + 1) % LAYOUTS_LENGTH
        : newLayout;

    switch (layout) {
      case LAYOUTS.STACK:
        $main.style.display = 'block';
        updateEditorVisibility();

        break;
      case LAYOUTS.VERTICAL:
        $main.style.display = 'grid';
        $main.style.gridTemplateAreas = "'editor content'";
        $main.style.gridTemplateColumns = '1fr 1fr';
        $main.style.gridTemplateRows = '1fr';

        $editor.style.display = 'block';
        $content.style.display = 'block';

        break;
      case LAYOUTS.HORIZONTAL:
        $main.style.display = 'grid';
        $main.style.gridTemplateAreas = "'editor' 'content'";
        $main.style.gridTemplateRows = '1fr 1fr';
        $main.style.gridTemplateColumns = '1fr';

        $editor.style.display = 'block';
        $content.style.display = 'block';
        break;
    }
  }

  function reFormatHtml() {
    editor.getSession().setValue(beautify(editor.getSession().getValue()));
  }

  let editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.session.setMode('ace/mode/html');
  editor.setFontSize('18px');

  editor.getSession().on('change', function () {
    buffers[currentBuffer].code = editor.getSession().getValue();
    $content.innerHTML = buffers[currentBuffer].code;
  });

  window.addEventListener('keyup', event => {
    if (event.ctrlKey && event.key === 'q') {
      isOnVim = !isOnVim;
      if (isOnVim) {
        editor.setKeyboardHandler('ace/keyboard/vim');
      } else {
        editor.setKeyboardHandler('');
      }
    } else if (event.ctrlKey && event.key === 'm') {
      reFormatHtml();
    } else if (event.ctrlKey && event.key === 'y') {
      updateLayout();
    } else if (event.ctrlKey && event.key === 'i') {
      setIsOnEditor();
    }
  });

  document.querySelector('#button-editor').onclick = () => setIsOnEditor(true);
  document.querySelector('#button-content').onclick = () =>
    setIsOnEditor(false);
  document.querySelector('#button-format').onclick = () => {
    reFormatHtml();
  };
  document.querySelector('#button-layout').onclick = () => updateLayout();
  document.querySelector('#select-buffer').onchange = e =>
    changeBuffer(e.target.value);
};
