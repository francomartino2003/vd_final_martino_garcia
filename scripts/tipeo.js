const text = "Eres un night owl o un early bird?";
const typingSpeed = 100; // velocidad de tipeo en milisegundos
const delay = 1000; // tiempo de espera después de completar el tipeo en milisegundos

const typedTextElement = document.getElementById('typed-text');

function typeWriter(text, index) {
  if (index < text.length) {
    typedTextElement.textContent += text.charAt(index);
    index++;
    setTimeout(function() {
      typeWriter(text, index);
    }, typingSpeed);
  } else {
    // El tipeo se ha completado, esperar antes de borrar el texto
    setTimeout(function() {
      deleteText();
    }, delay);
  }
}

function deleteText() {
  const currentText = typedTextElement.textContent;
  if (currentText.length > 0) {
    typedTextElement.textContent = currentText.slice(0, -1);
    setTimeout(deleteText, typingSpeed);
  } else {
    // El texto ha sido eliminado, comenzar el tipeo nuevamente
    setTimeout(function() {
      typeWriter(text, 0);
    }, delay);
  }
}

// Iniciar el tipeo
typeWriter(text, 0);