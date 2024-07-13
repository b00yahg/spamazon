const music = new Audio('https://audio.jukehost.co.uk/K9iI6KuUTNqVpPYoeRTqBiJicOImtgBQ');
music.play();
music.loop = true;

function playMusic() {
    music.muted = false
    music.play();
  }

  document.body.addEventListener("mousemove", function () {
    playMusic()
  })

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}
// hoping this helps handle spelljammer subtab
function openSubTab(evt, tabdisplay, subTabName) {
    // document.getElementsByClassName("product-grid").style.display = 'none';
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("subtabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementById(subTabName).getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabdisplay).style.display = "block";
    evt.currentTarget.className += " active";
}
// Opening spelljammer tab to hopefully fix spelljammer tab failure
document.addEventListener('DOMContentLoaded', function() {
    var spelljammersTab = document.querySelector('[onclick="openTab(event, \'Spelljammers\')"]');
    if (spelljammersTab) {
        spelljammersTab.addEventListener('click', function() {
            setTimeout(function() {
                var firstSubTab = document.querySelector('#Spelljammers .tabs .tablinks');
                if (firstSubTab) {
                    firstSubTab.click();
                }
            }, 0);
        });
    }
});
let cart = {};
    let total = 0;

    function addToCart(item, price) {
        if (cart[item]) {
            cart[item].quantity++;
            cart[item].total += price;
        } else {
            cart[item] = {
                quantity: 1,
                total: price
            };
        }
        total += price;
        updateCartDisplay();
    }
    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        for (const [item, details] of Object.entries(cart)) {
            const li = document.createElement('li');
            li.innerHTML = `${item} x${details.quantity} - ${details.total.toFixed(2)} gp 
                            <button onclick="removeFromCart('${item}')">Remove</button>`;
            cartItems.appendChild(li);
        }
        document.getElementById('cart-total').textContent = total.toFixed(2);
        const remainingGold = playerGold - total;
        document.getElementById('remaining-gold').textContent = remainingGold.toFixed(2);
    }
    let playerGold = 0;

    function updateGold() {
        playerGold = parseInt(document.getElementById('gold-input').value) || 0;
        updateCartDisplay();
    }

    function clearCart() {
        cart = {};
        total = 0;
        updateCartDisplay();
    }

    function removeFromCart(item) {
        if (cart[item]) {
            total -= cart[item].total;
            delete cart[item];
            updateCartDisplay();
        }
    }

// Opens default tab
document.getElementsByClassName("tab-button")[0].click();
document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    let musicStarted = false;

    musicToggle.addEventListener('click', function() {
    if (!musicStarted) {
        music.play();
        musicStarted = true;
    } else {
        if (music.paused) {
        music.play();
        } else {
        music.pause();
        }
    }
    });
});