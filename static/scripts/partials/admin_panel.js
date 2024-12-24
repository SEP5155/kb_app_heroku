document.addEventListener('DOMContentLoaded', () => {
    const action_type = document.querySelectorAll('.admin_action.type-add');

    action_type.forEach(action => {
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
})