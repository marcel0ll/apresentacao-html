// Examplo de cabeçalhos
export default {
  title: 'Formulários',
  code: `<h2> Elementos </h2>
<hr />
<form> 
  <label> Rótulo </label>
  <input type="text" placeholder="Texto"/>
  <input type="password" placeholder="Senha"/>
  <input type="date" placeholder="Data"/>
  <input type="number"placeholder="Número"/>
  <input type="email" placeholder="email"/>
  <output> Resultado </output>
  <button type="submit" > Botão </button>
  <select>
    <option value=""> Selecione um </option>
    <option value="1"> Opção 1 </option>
    <option value="2"> Opção 2 </option>
  </select>
  <textarea>
    Área de edição de texto
  </textarea>

  <legend> Legenda </legend>
  <meter> hm </meter>
  <progress > </progress>

  <datalist></datalist>
  <fieldset> </fieldset>
</form>

<h2> Exemplo </h2>
<hr />

<form action="/#" method="GET">
  <label>
    Email:
    <input type="email" name="email" />
  </label>
  <label>
    Texto:
    <textarea name="texto">
    </textarea>
  </label>
  <button type="submit" > Enviar </button>
</form>

`,
};
