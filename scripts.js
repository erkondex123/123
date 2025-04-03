async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Добавляем сообщение пользователя в чат
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div><strong>Вы:</strong> ${userInput}</div>`;

    // Очищаем поле ввода
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        // Добавляем ответ бота в чат
        chatBox.innerHTML += `<div><strong>Бот:</strong> ${botMessage}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div style="color:red;"><strong>Ошибка:</strong> Не удалось получить ответ</div>`;
    }
}
