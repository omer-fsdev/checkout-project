let cart = [
  {
    name: "Backpack Vintage",
    price: 24.99,
    qty: 1,
    img: "./assets/img/photo1.png",
  },
  { name: "Shoes Levi", price: 19.99, qty: 1, img: "./assets/img/photo2.png" },
  {
    name: "Clock Antique",
    price: 54.99,
    qty: 1,
    img: "./assets/img/photo3.jpg",
  },
];

const shipping = 7;

cart.forEach((prod) => {
  const { name, price, qty, img } = prod;
  document.querySelector("#prod-rows").innerHTML += `
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-5">
            <img src= ${img}  class="w-100 rounded-start" alt="product-image">
        </div>
        <div class="col-md-7">
            <div class="card-body">
                <h5 class="card-title text-primary">${name}</h5>
                <div class="prod-price">
                    <p class="text-success h2">$
                      <span class="dis-price">${(price * 0.8).toFixed(2)}</span>
                      <span class="h5 text-danger text-decoration-line-through">${price} </span>
                    </p>
                </div>
                <div class="border border-1 border-success shadow-lg d-flex justify-content-center p-2">
                    <div class="qty-controller">
                      <button class="btn btn-info btn-sm minus">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4 fw-bolder" id="prod-qty">${qty}</p>
                      <button class="btn btn-info btn-sm plus">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                </div>
                <div class="prod-removal mt-4">
                    <button class="btn btn-warning btn-sm w-100 text-muted remove-prod">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                </div>
                <div class="mt-2">
                    Amount: $
                    <span class="amount">${(price * 0.8 * qty).toFixed(
                      2
                    )}</span>
                </div>
            </div>
        </div>
    </div>
</div>`;
});

document.querySelector("#pay-table").innerHTML = `<table class="table">
<tbody>
  <tr class="text-end">
    <th class="text-start">Subtotal</th>
    <td>$<span class="subt">0.00</span></td>
  </tr>
  <tr class="text-end">
    <th class="text-start">Sales Tax (19%)</th>
    <td>$<span class="tax">0.00</span></td>
  </tr>
  <tr class="text-end">
    <th class="text-start">Shipping Cost</th>
    <td>$<span class="shipping">0.00</span></td>
  </tr>
  <tr class="text-end bg-success text-light">
    <th class="text-start">Total</th>
    <td>$<span class="total">0.00</span></td>
  </tr>
</tbody>
</table>`;

calcTotal();

function calcTotal() {
  // Subtotal:
  const amount = document.querySelectorAll(".amount");
  const subtotal = Array.from(amount).reduce((t, i) => t + +i.textContent, 0); // Array.from(amount)  SAME  [...amount]
  document.querySelector(".subt").textContent = subtotal;

  // Tax:
  tax = (subtotal * 19) / 100;
  document.querySelector(".tax").textContent = tax.toFixed(2);

  // Shipping:
  const shipping = 8.0;
  document.querySelector(".shipping").textContent = (
    subtotal > 0 ? shipping : 0
  ).toFixed(2);

  // Total:
  document.querySelector(".total").textContent = (
    subtotal +
    shipping +
    tax
  ).toFixed(2);
}

// Remove events:
document.querySelectorAll(".remove-prod").forEach((a) => {
  a.onclick = () => {
    btnRemove(a);
  };
});
function btnRemove(a) {
  // From screen:
  a.closest(".card").remove();
  // From array:
  cart = cart.filter(
    (b) => b.name != a.closest(".card").querySelector("h5").textContent
  );
  calcTotal();
}

// Reduce btn events:
document.querySelectorAll(".minus").forEach((a) => {
  const prodQty = a.nextElementSibling;

  a.onclick = () => {
    // If qty <= 1:
    if (prodQty.textContent <= 1) {
      const conf = confirm("Do you want to remove this item?");
      if (conf) {
        btnRemove(a);
      } else {
        return;
      }
    } else {
      // From screen:
      prodQty.textContent--;

      // From array:
      changeQty(prodQty);
    }
  };
});

// Increase btn events:
// Im going to use another way.
document.querySelectorAll(".qty-controller").forEach((a) => {
  const btnPls = a.lastElementChild;
  const prodQty = a.querySelector("#prod-qty");

  btnPls.onclick = () => {
    // From screen:
    prodQty.textContent++;

    // From array:
    changeQty(prodQty);
  };
});

function changeQty(prodQty) {
  cart.map((b) => {
    if (b.name == prodQty.closest(".card").querySelector("h5").textContent) {
      b.qty = +prodQty.textContent;
    }
  });

  prodQty.closest(".row").querySelector(".amount").textContent =
    prodQty.closest(".row").querySelector(".dis-price").textContent *
    prodQty.textContent;

  calcTotal();
}
