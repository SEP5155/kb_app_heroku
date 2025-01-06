document.addEventListener('DOMContentLoaded', async () => {
    const menu = document.getElementById('topics_menu');
    if (menu) {
        try {
            const response = await fetch('/api/v1/topics/');
            if (!response.ok) throw new Error('cannot fetch menu');

            const topics = await response.json();

            menu.innerHTML = topics.data
                .map((el) => `
                    <li id='${el}' class='topic'>
                        <span>${el}</span>
                        <ul class="subtopic"></ul>
                    </li>
                    
                    `)
                .join('');
            

        } catch (err) {
            console.warn(err);
        }
    }

    const topicMenu = document.querySelectorAll('#topics_menu .topic');
    console.log(topicMenu);

    topicMenu.forEach(menu => {
        menu.addEventListener('click', async function () {
            console.log('clicked');
            const subMenu = document.querySelector(`#${this.id} > ul`);
            console.log(subMenu);
            const route = this.id === 'responses' ? '/api/v1/responses/' :
                            this.id === 'guides' ? '/api/v1/guide' : '';
            
            console.log(route);
                    
            const response = await fetch(route);
            if(!response.ok) throw new Error('Cannot get topic data');
        
            const subTopic = await response.json();

            subMenu.innerHTML = 
            subTopic.guides.map((el) => `
                <li data-id="${el._id}" class="subtopic-item">${el.technology}</li>
            `)
            .join('');
            console.log(subTopic);
        
        
        })
    })
})




