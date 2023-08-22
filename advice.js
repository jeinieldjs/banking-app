const adviceElement = document.querySelector(".advice");
const adviceButton = document.querySelector(".advice-button");

async function getAdvice() {
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();

  adviceElement.textContent = await data.slip.advice;

  console.log(data.slip.advice);
}

adviceButton.addEventListener("click", getAdvice);

getAdvice();
