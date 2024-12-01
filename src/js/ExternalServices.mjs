const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  /*
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
    */

async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}

  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}

export function searchTents() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("list");
  const li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName("a")[0];
    const txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("register-modal");
  const closeModalButton = document.getElementById("close-modal");

  // Check if the user has seen the modal
  const hasSeenModal = localStorage.getItem("seenRegisterModal");

  // Show the modal if the user hasn't seen it before
  if (!hasSeenModal) {
    modal.classList.remove("hidden");
  }

  // Close the modal and set it as seen
  closeModalButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    localStorage.setItem("seenRegisterModal", "true");
  });
});
