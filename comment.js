const botToken = "6905026549:AAH-0fy_rTvYqsd7FjqB82VvuLRd0OYMoFI";
const chatId = "@tomsk_24_7night";

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const photo = document.getElementById('photo').files[0];

    if (!name || !email || !comment) {
        alert("Заполните все поля!");
        return;
    }

    const message = `📝 *Новый отзыв:*\n👤 *Имя:* ${name}\n📧 *Email:* ${email}\n💬 *Комментарий:* ${comment}`;
    
    // Отправка текста
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown"
        })
    }).then(response => response.json())
    .then(data => {
        if (data.ok && !photo) {
            alert("Отзыв успешно отправлен!");
            form.reset(); // Очистка формы
        }
    });

    // Если есть фото, отправляем его отдельно
    if (photo) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', photo);
        formData.append('caption', `📷 Фото от ${name}`);

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Отзыв успешно отправлен!");
                form.reset(); // Очистка формы после отправки фото
            } else {
                alert("Ошибка при отправке фото.");
            }
        })
        .catch(error => {
            alert("Ошибка: " + error);
        });
    }
});
