const Audio = (_ => {
  //cache DOM
  const audioEl = document.querySelector("#audio");

  const init = _ => {
    audioEl.play();
  };

  return {
    init
  };
})();

export default Audio;
