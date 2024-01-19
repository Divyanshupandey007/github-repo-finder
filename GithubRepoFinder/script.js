let currentPage = 1;
let itemsPerPage = 10;

function getRepositories() {
  const username = document.getElementById('username').value;
  const perPage = itemsPerPage;
  const userUrl = `https://api.github.com/users/${username}`;
  const apiUrl = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`;

  $('#loader').show();
  $('#repositories').empty();
  $('#userProfile').empty();

  $.ajax({
    url: userUrl,
    method: 'GET',
    success: function (userData) {
      const userProfileElement = $(`
        <div class="user-profile">
          <img src="${userData.avatar_url}" alt="Profile Photo" onclick="window.open('${userData.html_url}', '_blank')">
          <h3 onclick="window.open('${userData.html_url}', '_blank')">${userData.login}</h3>
        </div>
      `);
      $('#userProfile').html(userProfileElement);
    },
    error: function (error) {
      console.error('Error fetching user data:', error);
      $('#userProfile').html(`<p style="color: red;">Error fetching user data. Please check the username and try again.</p>`);
    }
  });

  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function (data) {
      $('#loader').hide();
      data.forEach(repository => {
        const repositoryElement = $(`
          <div class="repository" onclick="window.open('${repository.html_url}', '_blank')">
            <strong>${repository.name}</strong>
            <p>${repository.description || 'No description available'}</p>
            <div class="language-box" style="background-color: #3498db;">${repository.language || 'Not specified'}</div>
          </div>
        `);
        $('#repositories').append(repositoryElement);
      });
    },
    error: function (error) {
      $('#loader').hide();
      $('#repositories').html(`<p style="color: red;">Error fetching repositories. Please check the username and try again.</p>`);
    }
  });
}

function updateItemsPerPage() {
  itemsPerPage = parseInt(document.getElementById('perPage').value);
}
