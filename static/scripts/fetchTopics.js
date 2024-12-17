document.addEventListener('DOMContentLoaded', async () => {
    const menu = document.getElementById('topics_menu');
    if (menu) {
        try {
            const response = await fetch('/api/v1/topics/');
            if (!response.ok) throw new Error('cannot fetch menu');

            const topics = await response.json();

            menu.innerHTML = topics.data
                .map((el) => `
                    <li class='topic ${el}'>${el}</li>
                    `)
                .join('');
            

        } catch (err) {
            console.warn(err);
        }
    }
})