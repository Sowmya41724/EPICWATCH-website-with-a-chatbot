document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const moodInput = document.getElementById('mood');
    const searchInput = document.getElementById('searchTerm');
    const loginButton = document.getElementById('loginButton');
    const moodButton = document.getElementById('moodButton');
    const searchButton = document.getElementById('searchButton');
    const recommendationsList = document.getElementById('recommendations');

    loginButton.addEventListener('click', async () => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value })
        });
        const user = await response.json();
        if (user.username) {
            console.log('Login successful:', user);
        } else {
            console.log('Login failed');
        }
    });

    moodButton.addEventListener('click', async () => {
        const response = await fetch('/api/auth/update-mood', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput.value, mood: moodInput.value })
        });
        const result = await response.json();
        console.log(result.message);
    });

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value;
        await fetch('/api/recommendation/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput.value, searchTerm })
        });
        const response = await fetch(`/api/recommendation/suggestions/${usernameInput.value}`);
        const recommendations = await response.json();
        recommendationsList.innerHTML = '';

        recommendations.moodRecommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec.title;
            recommendationsList.appendChild(li);
        });
    });
});