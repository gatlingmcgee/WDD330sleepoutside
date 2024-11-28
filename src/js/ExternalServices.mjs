const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
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

export async function searchTents() {
  var input, filter, ul, li, i, a, txtValue;
  input = document.getElementById("myInput")
  filter = input.value.toUpperCase();
  ul = document.getElementById("list");
  li = ul.getElementsByTagName("li");
 
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// May not use this:
// const products = [
//   { product : '989CH'},
//   { product : '880RT'},
//   { product : '880RR'},
//   { product : '985MD'},
//   { product : '344YK'},
//   { product : '344YJ'},
//   { product : '989CG'},
//   { product : '985KU'},
//   { product : '15UHG'},
//   { product : '15UGY'},
//   { product : '543DT'},
//   { product : '20DRU'},
//   { product : '14GVF'},
//   { product : '14GVH'},
//   { product : '861PY'},
//   { product : '14GVG'}
// ]
// const searchInput = document.querySelector(".input");

// searchInput.addEventListener("input", (e) => {
//   let value = e.target.value
//   if (value && value.trim().length > 0) {
//     value = value.trim().toLowerCase()
//     setList(products.filter(name =>{
//       return name.product.includes(value);
//     }))
//   } else {
//     console.error("Item is null");
//   }
// })

// async function setList(results) {
//   for (const item of results) {
//     const resultItem = document.createElement('p');
//     resultItem.classList.add('result-item');
//     const text = document.createTextNode(item.product)
//     resultItem.appendChild(text)
//     list.appendChild(resultItem)
//   }
// }
