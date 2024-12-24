document.addEventListener('DOMContentLoaded', () => {
    const action_type_add = document.querySelectorAll('.admin_action.type-add');
    const action_type_edit = document.querySelectorAll('.admin_action.type-edit');

    const routes = {
        action_edit_guide: '/api/v1/guide/',
        action_edit_response: '/api/v1/responses/'
    }

    action_type_add.forEach(action => {
        console.log(action.id);
        action.addEventListener('click', (event) => {
            event.stopPropagation();

            const guideForm = document.getElementById('create_guide');
            const responseForm = document.getElementById('create_response');

            if (action.id === 'action_add_guide') {
                responseForm.classList.remove('active');
                guideForm.classList.add('active');
            } else if (action.id === 'action_add_response') {
                guideForm.classList.remove('active');
                responseForm.classList.add('active');
            }
        })
    })

    action_type_edit.forEach(action => {
        action.addEventListener('click', async function (event) {
            event.stopPropagation();

            const articlesContainer = document.querySelector('.articles_list');

            const route = routes[action.id]

            const response = await fetch(route, {
                method: 'GET', // Или 'PATCH' для обновления
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to get data');

            result = await response.json();
            console.log(result);

            articlesContainer.innerHTML = '';

            const dataToRender = route === '/api/v1/guide/'
                ? result.guides.map(item => `<li>${item.technology } - ${item.command}</li>`)
                : route === '/api/v1/responses/'
                    ? result.data
                    .map(item => `<li>${item.topic}</li>`)
                    : [];
            articlesContainer.innerHTML = dataToRender.join('');


            // if (route === '/api/v1/guide/') {
            //     articlesContainer.innerHTML = '';
            //     articlesContainer.innerHTML = result.guides
            //     .map(item => `<li>${item.technology } - ${item.command}</li>`)
            //     .join('');
            // } else if (route === '/api/v1/responses/') {
            //     articlesContainer.innerHTML = '';
            //     articlesContainer.innerHTML = result.data
            //     .map(item => `<li>${item.topic}</li>`)
            //     .join('');
            // }
            

        })
    })
})