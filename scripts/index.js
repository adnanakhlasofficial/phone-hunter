const loadPhones = async (showMore, phoneBrand) => {
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

function loadPhone(phones) {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.innerHTML = "";
  phones.forEach((phone) => {
    console.log(phone);

    const { image, phone_name } = phone;
    // console.log(phone_name);

    const phoneCard = document.createElement("div");
    phoneCard.className =
      "max-w-sm m-3 p-5 bg-white rounded-lg shadow-md overflow-hidden border border-gray-300";

    phoneCard.innerHTML = `
	<img class="w-24 mx-auto" src="${image}" alt="Product Image">
	<div class="p-5 text-center">
	<h5 class="text-xl font-semibold mb-2">${phone_name}</h5>
	<p class="text-gray-600 mb-4">There are many variations of passages of available, but the majority have suffered</p>
	<p class="text-2xl font-bold mb-4">$999</p>
	<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Show Details</button>
	</div>

		`;

    phoneContainer.appendChild(phoneCard);
  });
}

function handleShowAll() {
  console.log("Clicked");
  loadPhones(true, "iphone");
}

function loadspinner() {
  const phoneContainer = document.getElementById("phones-container");
  phoneContainer.style.display = "none";
  const spin = document.getElementById("spinner");
  spin.style.display = "block";

  setTimeout(() => {
    loadPhones("", "iphone");
  }, 3000);
}

loadspinner();
