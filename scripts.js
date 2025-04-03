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
