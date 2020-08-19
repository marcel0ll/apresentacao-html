import ace from 'brace';
import {html as beautify} from 'js-beautify';

import structureEx from './examples/structure';
import textEx from './examples/texts';
import formEx from './examples/forms';
import embedEx from './examples/embed';
import tableEx from './examples/table';
import listsEx from './examples/lists';
import styleEx from './examples/styles';
import otherEx from './examples/other';
import semanticEx from './examples/semantic';

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
  const $btEditor = document.querySelector('#button-editor');
  const $btContent = document.querySelector('#button-content');
  let isOnVim = false;
  let layout = LAYOUTS.VERTICAL;
  let isOnEditor = true;

  let buffers = [
    {
      title: 'Vazio',
      code: ``,
    },
    structureEx,
    textEx,
    formEx,
    embedEx,
    tableEx,
    listsEx,
    semanticEx,
    styleEx,
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
        $btEditor.removeAttribute('disabled')
        $btContent.removeAttribute('disabled')
        $main.style.display = 'block';
        updateEditorVisibility();

        break;
      case LAYOUTS.VERTICAL:
        $btEditor.setAttribute('disabled', true)
        $btContent.setAttribute('disabled', true)
        $main.style.display = 'grid';
        $main.style.gridTemplateAreas = "'editor content'";
        $main.style.gridTemplateColumns = '1fr 1fr';
        $main.style.gridTemplateRows = '1fr';

        $editor.style.display = 'block';
        $content.style.display = 'block';

        break;
      case LAYOUTS.HORIZONTAL:
        $btEditor.setAttribute('disabled', true)
        $btContent.setAttribute('disabled', true)
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
  editor.getSession().setUseWorker(false);

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

  editor.getSession().setValue(buffers[currentBuffer].code);
  updateLayout(layout);
};
