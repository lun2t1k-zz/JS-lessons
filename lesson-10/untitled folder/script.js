class Options {
  constructor(height, width, bg, fontSize, textAlign) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }
  createDiv = () => {
    let body = document.querySelector('body');
    body.innerHTML = '<div></div>';
    let box = document.querySelector('div');
    box.innerText = 'Hello World';
    box.style.height = this.height;
    box.style.width = this.width;
    box.style.backgroundColor = this.bg;
    box.style.fontSize = this.fontSize;
    box.style.textAlign = this.textAlign;
  }
}

const text = new Options('50px', '250px', '#c78030', '32px', 'center');

text.createDiv();