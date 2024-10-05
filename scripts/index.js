const loadPhones = async (showMore, phoneBrand = "iphone") => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.style.display = "flex";

  const spin = document.getElementById("spinner");
  spin.style.display = "none";

  console.log("btn:", showMore, "brand:", phoneBrand);
  const url = `https://openapi.programming-hero.com/api/phones?search=${phoneBrand}`;
  const res = await fetch(url);
  const data = await res.json();
  if (showMore) {
    loadPhone(data.data);
  } else {
    loadPhone(data.data.splice(0, 6));
  }
};

const loadPhone = (phones) => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";
  phones.forEach((phone) => {
    // console.log(phone);

    const { image, phone_name, slug } = phone;
    // console.log(slug);

    const phoneCard = document.createElement("div");
    phoneCard.className =
      "max-w-sm m-3 p-5 bg-white rounded-lg shadow-md overflow-hidden border border-gray-300";

    phoneCard.innerHTML = `
	<img class="w-24 mx-auto" src="${image}" alt="Product Image">
	<div class="p-5 text-center">
	<h5 class="text-xl font-semibold mb-2">${phone_name}</h5>
	<p class="text-gray-600 mb-4">There are many variations of passages of available, but the majority have suffered</p>
	<p class="text-2xl font-bold mb-4">$999</p>
	<button onclick="showDetails('${slug}')" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Show Details</button>
	</div>

		`;

    phoneContainer.appendChild(phoneCard);
  });
};

const handleShowAll = () => {
  // console.log("Click");
  loadPhones(true);
};

const loadspinner = () => {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.style.display = "none";
  const spin = document.getElementById("spinner");
  spin.style.display = "block";

  setTimeout(() => {
    loadPhones("", "iphone");
  }, 3000);
};

const showDetails = async (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  const res = await fetch(url);
  const data = await res.json();
  const phoneDetails = data.data;
  const {
    brand,
    image,
    mainFeatures: { storage, displaySize },
    name,
    releaseDate,
  } = phoneDetails;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
		<div class="card bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center !space-y-8">
    <h2 class="card-title">${name}</h2>
    <p>${storage}</p>
  </div>
</div>
	`;

  my_modal_1.showModal();

  // console.log(storage);
};

document.getElementById("seach-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let searchText = document.getElementById("search-text").value;
  console.log(searchText);
  loadPhones("", searchText);
});

loadspinner();
