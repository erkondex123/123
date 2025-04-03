async function sendMessage() {
    const userInputElement = document.getElementById("user-input");
    const userInput = userInputElement.value.trim();
    const chatBox = document.getElementById("chat-box");

    if (!userInput) return;

    // Отображаем сообщение пользователя
    chatBox.innerHTML += `<div><strong>Вы:</strong> ${userInput}</div>`;
    userInputElement.value = "";
    userInputElement.disabled = true;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}` // Используем ключ из config.js
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
    } catch (error) {
        console.error("Ошибка запроса:", error);
        chatBox.innerHTML += `<div style="color:red;"><strong>Ошибка:</strong> ${error.message}</div>`;
    } finally {
        userInputElement.disabled = false;
        userInputElement.focus();
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Поддержка отправки по Enter
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    inputField.focus();

    inputField.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
