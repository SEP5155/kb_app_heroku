document.addEventListener('DOMContentLoaded', () => {
    const action_type_add = document.querySelectorAll('.admin_action.type-add');
    const action_type_edit = document.querySelectorAll('.admin_action.type-edit');
    const articlesContainer = document.querySelector('.articles_list');
    

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
            articlesContainer.classList.remove('active');
            articlesContainer.innerHTML = '';

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

            const route = routes[action.id];

            const response = await fetch(route, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to get data');

            result = await response.json();
            console.log(result);

            const form = document.querySelector('.create_form.active');
            if(form) {
                form.classList.remove('active');
            }
            articlesContainer.innerHTML = '';

            const dataToRender = route === '/api/v1/guide/'
                ? result.guides.map(item => `<li>${item.technology } - ${item.command}</li>`)
                : route === '/api/v1/responses/'
                    ? result.data
                    .map(item => `<li>${item.topic}</li>`)
                    : [];
            articlesContainer.innerHTML = dataToRender.join('');
            articlesContainer.classList.add('active');
            

        })
    })

    document.getElementById('create_guide_form').addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = {
            technology: document.querySelector('#guide_technology').value,
            purpose: document.querySelector('#guide_purpose').value,
            command: document.querySelector('#guide_command').value,
            example: document.querySelector('#guide_example').value,
            comment: document.querySelector('#guide_comment').value
        }

        try {
            const response = await fetch('/api/v1/guide/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Request failed');
            alert('New guide was created');
        } catch (err) {
            alert('Validation failed. Reuired fields probaly missing');
            console.error(err);
        }
    })

    document.getElementById('create_response_form').addEventListener('submit', async (event) => {
        event.preventDefault();

        
        const formData = {
            subCategory: document.getElementById('response_subCategory').value,
            topic: document.getElementById('response_topic').value,
            text: document.getElementById('response_text').value,
            additinalComments: document.getElementById('response_additinalComments').value
        }
        try {
            const response = await fetch('/api/v1/responses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Request failed');
            alert('New response was created');
        } catch (err) {
            alert('Validation failed. Reuired fields probaly missing');
            console.error(err);
        }
        
    })
})