document.getElementById('fetchGuides').addEventListener('click', async() => {
    try {
        const response = await fetch('/api/v1/guide/');
        if (!response.ok) throw new Error('failed to fetch guides');
        
        console.response;
        const data = await response.json();
        const container = document.getElementById('guidesContainer');

        container.innerHTML = data.guides
            .map(guide => `<p>${guide.technology}: ${guide.purpose}</p>`)
            .join('');
    } catch (err) {
        console.error(err);
        alert('Could not fetch guides. Check console for details.');
    }
})