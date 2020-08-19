import logo from './logo.png';
export default {
  title: 'Anexados',
  code: `<h2> Elementos </h2>
<h3> img </h3>
<img src="${logo}" />
<h3> video </h3>
<video controls>
    <source src="falso.webm" type="video/webm">

    <source src="falso.mp4" type="video/mp4">

    Me desculpe, mas seu navegador não tem suport para vídeos.
</video>
<h3> Audio </h3>
<audio controls src="/media/examples/t-rex-roar.mp3">
    Me desculpe, mas seu navegador não tem suport para vídeos.
</audio>

`,
};
