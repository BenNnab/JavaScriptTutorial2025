document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayData(data);
            window.userData = data; // Store the data globally for filtering
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

function displayData(data) {
    const userDataDiv = document.getElementById('user-data');
    userDataDiv.innerHTML = ''; // Clear previous data

    data.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';

        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>Age: ${user.age}</p>
            <p>Email: ${user.email}</p>
            <p>Country: ${user.country}</p>
        `;

        userDataDiv.appendChild(userCard);
    });
}

function filterData() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredData = window.userData.filter(user => 
        user.country.toLowerCase().includes(searchTerm)
    );
    displayData(filteredData);
}