document.addEventListener("DOMContentLoaded", () => loadData());

function loadData() {
  fetch("data.json")
    .then((response) => response.json())
    .then(({ profile, publicFields }) => {
      // Update the profile
      updateHeader(profile);
      // Add Sections
      addSectionsToDOM(publicFields);
    })
    .catch((error) => console.error("Error:", error));
}

function updateHeader(profile) {
  let classList = [
    "w-full",
    "h-32",
    "bg-gradient-to-r",
    `from-[${profile.colorFrom}]`,
    `to-[${profile.colorTo}]`,
  ];

  document.querySelector("header").classList.add(...classList);
  document.querySelector(".profile-picture").src = profile.picture;
  document.querySelector(".profile-name").textContent = profile.name;
  document.querySelector(".job-title").textContent = profile.jobTitle;
  document.querySelector(".company").textContent = profile.company;
}

function createSection(data) {
  return `<section class="bg-white">
      <div class="mx-auto h-full flex items-center justify-between">
        <a class="${data.type}-link flex justify-between" 
          href="${data.url || "#"}">
          <div class="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white text-sm">
              <i class="fa-solid ${data.icon}"></i>
            </span>
          </div>
          <p class="text-sm text-gray-600 
            ${data.type} ml-5 flex items-center justify-center">
            ${data.text}
          </p>
        </a>
        <div class="w-1/12 flex items-center justify-center">
          <i class="fa-regular fa-copy"></i>
        </div>
      </div>
    </section>`;
}

function addSectionsToDOM(sectionsData) {
  const main = document.querySelector("main");
  sectionsData.forEach((data) => {
    main.insertAdjacentHTML("beforeend", createSection(data));
  });
}
