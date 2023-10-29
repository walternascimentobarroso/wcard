document.addEventListener("DOMContentLoaded", () => main());

function main() {
  loadData();
  tabs();
}

function tabs() {
  const tabPublic = document.querySelector("#tabPublic");
  const tabPrivate = document.querySelector("#tabPrivate");
  const contentPublic = document.querySelector("#public");
  const contentPrivate = document.querySelector("#private");

  tabPublic.addEventListener("click", () =>
    toggleTab(contentPublic, contentPrivate, tabPublic, tabPrivate)
  );

  tabPrivate.addEventListener("click", () =>
    toggleTab(contentPrivate, contentPublic, tabPrivate, tabPublic)
  );

  function toggleTab(contentShow, contentHidden, tabShow, tabHidden) {
    contentShow.classList.remove("hidden");
    contentHidden.classList.add("hidden");
    tabShow.classList.add("active");
    tabHidden.classList.remove("active");
  }
}

function loadData() {
  fetch("data.json")
    .then((response) => response.json())
    .then(({ profile, publicFields, privateFields, vCard, publicLink }) => {
      // Update the profile
      updateHeader(profile);
      // Add Sections
      addSectionsToDOM("#public div", publicFields);
      addSectionsToDOM("#private div", privateFields);

      //load QRCode by img base64
      loadImgBase64("#public-vcard", vCard.qrcode);
      loadImgBase64("#public-link", publicLink.qrcode);
    })
    .catch((error) => console.error("Error:", error));
}

function loadImgBase64(element, imgBase64) {
  const qrcode = document.querySelector(element);
  const qrcodeImg = document.createElement("img");
  qrcodeImg.src = imgBase64;
  qrcodeImg.alt = "QRCode";
  qrcode.appendChild(qrcodeImg);
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
  return `<section>
      <div class="mx-auto h-full flex items-center justify-between">
        <a class="${data.type}-link flex justify-between" 
          href="${data.url || "#"}">
          <div class="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
            <span class="text-white text-sm">
              <i class="fa-solid ${data.icon}"></i>
            </span>
          </div>
          <p class="text-sm text-gray-600 ${data.type} ml-5 flex items-center 
          justify-center text-copy">${data.text}</p>
        </a>
        <div class="w-1/12 flex items-center justify-center cursor-pointer copy">
          <i class="fa-regular fa-copy"></i>
        </div>
      </div>
    </section>`;
}

function addSectionsToDOM(element, sectionsData) {
  const main = document.querySelector(element);
  sectionsData.forEach((data) => {
    main.insertAdjacentHTML("beforeend", createSection(data));
  });
}
// Adiciona um ouvinte de evento ao documento (ou a um elemento pai mais específico)
document.addEventListener("click", function ({ target }) {
  if (
    target.classList.contains("copy") ||
    target.classList.contains("fa-copy")
  ) {
    console.log(target.closest("section"));
    const textToCopy = target
      .closest("section")
      .querySelector(".text-copy").textContent;
    clipboardCopy(textToCopy);
    console.log("Texto copiado:", textToCopy);
  }
});

async function clipboardCopy(text) {
  await navigator.clipboard.writeText(text);
  await activeToast("Copied successfully");
}

async function activeToast(msg) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "white",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
  await Toast.fire({
    icon: "success",
    title: msg,
  });
}
