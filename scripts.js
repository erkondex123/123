async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div><strong>Вы:</strong> ${userInput}</div>`;
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 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` // Используем API-ключ
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Ошибка API: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        chatBox.innerHTML += `<div><strong>Бот:</strong> ${botMessage}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Ошибка запроса:", error);
        chatBox.innerHTML += `<div style="color:red;"><strong>Ошибка:</strong> ${error.message}</div>`;
    }
}
