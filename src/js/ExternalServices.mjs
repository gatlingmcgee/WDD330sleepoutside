const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
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
