const loadPhones = async (phoneBrand, showMore) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${phoneBrand}`;
  const res = await fetch(url);
  const data = await res.json();
  loadPhone(data.data);
};

function loadPhone(phones) {
  const phoneContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    console.log(phone);

    const { image, phone_name } = phone;
    console.log(phone_name);

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

loadPhones("iphone");
