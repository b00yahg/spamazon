//This is the Shop category data
const categories = [
    {"name": "non-magic items", "tabs": ["weapons", "armor", "adventuring gear"]},
    {"name": "magic items", "tabs": ["weapons", "armor", "wondrous items", "potions", "rings", "scrolls", "wands", "staff", "rods"]},
    {"name": "spelljammers", "tabs": ["weapons", "modules", "upgrades", "fore mantle", "ammunition", "ships"]}
];

//These Import data for character items
const armor = fs.readFileSync('../shopData/armor.json', 'utf8');
const gear = fs.readFileSync('../shopData/gear.json', 'utf8');
const magicArmor = fs.readFileSync('../shopData/magicArmor.json', 'utf8');
const potions = fs.readFileSync('../shopData/potions.json', 'utf8');
const rings = fs.readFileSync('../shopData/rings.json', 'utf8');
const rods = fs.readFileSync('../shopData/rods.json', 'utf8');
const scrolls = fs.readFileSync('../shopData/scrolls.json', 'utf8');
const staff = fs.readFileSync('../shopData/staff.json', 'utf8');
const wands = fs.readFileSync('../shopData/wands.json', 'utf8');
const weapons = fs.readFileSync('../shopData/weapons.json', 'utf8');
const wonderousItems = fs.readFileSync('../shopData/wonderousItems.json', 'utf8');

//These Import data for ship equipment
const shipAmmunition = fs.readFileSync('../shopData/shipAmmunition.json', 'utf8');
const shipMantle = fs.readFileSync('../shopData/shipMantle.json', 'utf8');
const shipModules = fs.readFileSync('../shopData/shipModules.json', 'utf8');
const shipUpgrades = fs.readFileSync('../shopData/shipUpgrades.json', 'utf8');
const shipWeapons = fs.readFileSync('../shopData/shipWeapons.json', 'utf8');

//These Select Nav Buttons
const mainNavButtons = document.querySelectorAll('#main-nav button');
const subNav = document.getElementById('sub-nav');
const content = document.getElementById('content');

//Set up music to play in the background
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

  mainNavButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        renderSubNav(category);
    });
});

function renderSubNav(category) {
    const categoryData = categories.find(c => c.name === category);
    if (categoryData) {
        subNav.innerHTML = categoryData.tabs.map(tab => 
            `<button data-category="${category}" data-tab="${tab}">${tab}</button>`
        ).join('');

        // Add click event listeners to sub nav buttons
        const subNavButtons = subNav.querySelectorAll('button');
        subNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.dataset.tab;
                renderContent(category, tab);
            });
        });
    }
}

function renderContent(category, tab) {}


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