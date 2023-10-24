document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from JSON file
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Atualizar o perfil
      document.querySelector(".profile-name").textContent = data.profile.name;
      document.querySelector(".job-title").textContent = data.profile.jobTitle;
      document.querySelector(".company").textContent = data.profile.company;

      // Atualizar o email
      document.querySelector(".email").textContent = data.email;
      document.querySelector(".email-link").href = "mailto:" + data.email;

      // Atualizar o telefone
      document.querySelector(".phone").textContent = data.phone;
      document.querySelector(".phone-link").href = "tel:" + data.phone;

      // Atualizar o website
      document.querySelector(".website").textContent = data.website;
      document.querySelector(".website-link").href = data.website;

      // Atualizar o endereço
      document.querySelector(".address").textContent = data.address;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
