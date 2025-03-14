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

function generateReceipt() {
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();
    
    // Group items by category
    const categories = {};
    
    for (const [item, details] of Object.entries(cart)) {
        // Try to infer the category from the item name
        let category = "Miscellaneous";
        
        if (item.includes("Potion") || item.includes("Elixir") || item.includes("Oil") || item.includes("Philter")) {
            category = "Potions & Consumables";
        } else if (item.includes("Scroll")) {
            category = "Scrolls";
        } else if (item.includes("Wand")) {
            category = "Wands";
        } else if (item.includes("Staff") || item.includes("Rod")) {
            category = "Staves & Rods";
        } else if (item.includes("Ring")) {
            category = "Rings";
        } else if (item.includes("Armor") || item.includes("Shield") || item.includes("Plate") || item.includes("Mail")) {
            category = "Armor & Shields";
        } else if (item.includes("Sword") || item.includes("Axe") || item.includes("Bow") || item.includes("Arrow") || item.includes("Dagger")) {
            category = "Weapons & Ammunition";
        } else if (item.includes("Boots") || item.includes("Cloak") || item.includes("Amulet") || item.includes("Gloves")) {
            category = "Wondrous Items";
        } else if (item.includes("Ballista") || item.includes("Catapult") || item.includes("Cannon")) {
            category = "Ship Weapons";
        } else if (item.includes("Charge") || item.includes("Ammo") || item.includes("Shot") || item.includes("Bolt")) {
            category = "Ship Ammunition";
        }
        
        if (!categories[category]) {
            categories[category] = [];
        }
        
        categories[category].push({
            name: item,
            quantity: details.quantity,
            price: details.total
        });
    }
    
    // Create receipt markdown
    let receipt = `# SPAMAZON PURCHASE RECEIPT\n\n`;
    receipt += `**Date:** ${date}\n`;
    receipt += `**Time:** ${time}\n\n`;
    receipt += `## ITEMS PURCHASED\n\n`;
    
    // Add items by category
    for (const [category, items] of Object.entries(categories)) {
        receipt += `### ${category}\n\n`;
        receipt += `| Item | Quantity | Price (gp) |\n`;
        receipt += `|------|----------|------------|\n`;
        
        for (const item of items) {
            receipt += `| ${item.name} | ${item.quantity} | ${item.price.toFixed(2)} |\n`;
        }
        
        receipt += `\n`;
    }
    
    // Add totals
    receipt += `## PAYMENT SUMMARY\n\n`;
    receipt += `**Subtotal:** ${total.toFixed(2)} gp\n`;
    receipt += `**Gold Tendered:** ${playerGold.toFixed(2)} gp\n`;
    receipt += `**Change:** ${(playerGold - total).toFixed(2)} gp\n\n`;
    
    // Add footer
    receipt += `---\n\n`;
    receipt += `*Thank you for shopping at Spamazon!*\n`;
    receipt += `*For all your adventuring needs and more.*\n\n`;
    receipt += `*Shop operated by: The Sindiath Line*\n`;
    receipt += `*All sales are final. No refunds for cursed items.*\n`;
    
    return receipt;
}

function exportReceipt() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const receipt = generateReceipt();
    const blob = new Blob([receipt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spamazon_receipt.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyReceipt() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const receipt = generateReceipt();
    
    // Copy to clipboard
    navigator.clipboard.writeText(receipt)
        .then(() => {
            alert("Receipt copied to clipboard!");
        })
        .catch(err => {
            console.error('Failed to copy receipt: ', err);
            alert("Failed to copy receipt to clipboard!");
        });
}
