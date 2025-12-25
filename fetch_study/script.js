const chatBoxElement = document.getElementById("chat-box");
const streamBtnElement = document.getElementById("stream-btn");

async function streamText() {
  chatBoxElement.textContent = "受信開始🛜\n";
  const response = await fetch(
    "https://httpbin.org/drip?duration=10&numbytes=15&code=200&delay=0&body=%E3%81%8A%E3%82%81%E3%81%A7%E3%81%A8%E3%81%86"
  );

  const decoder = new TextDecoder();
  for await (const chunk of response.body) {
    const text = decoder.decode(chunk, { stream: true });
    console.log(text);
    chatBoxElement.textContent += text;
  }
  chatBoxElement.textContent += "\n🎉受信完了";
  chatBoxElement.textContent += decoder.decode();
}

streamBtnElement.addEventListener("click", streamText);
