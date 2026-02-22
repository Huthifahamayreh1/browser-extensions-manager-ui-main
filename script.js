const grid = document.getElementById('extensions-grid');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let extensions = [];

async function init() {
    try {
        const res = await fetch('./data.json');
        extensions = await res.json();
        render(extensions);
    } catch (e) { console.error("Data fetch failed"); }
}

function render(data) {
    grid.innerHTML = data.map(ext => `
        <div class="card">
            <div class="card-header">
                <img src="${ext.logo}" class="card-logo">
                <div class="card-info">
                    <h3 class="card-title">${ext.name}</h3>
                    <p class="card-desc">${ext.description}</p>
                </div>
            </div>
            <div class="card-footer">
                <button class="filter-btn" style="padding: 5px 15px; font-size: 12px;" onclick="deleteItem('${ext.name}')">Remove</button>
                <div class="switch ${ext.isActive ? 'active' : ''}" onclick="toggleSwitch(this, '${ext.name}')">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    `).join('');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeIcon.src = isLight ? "./assets/images/icon-moon.svg" : "./assets/images/icon-sun.svg";
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const currentActive = document.querySelector('.filter-btn.active');
        if (currentActive) currentActive.classList.remove('active');
        btn.classList.add('active');
        
        const mode = btn.dataset.filter;
        render(extensions.filter(e => mode === 'all' ? true : (mode === 'active' ? e.isActive : !e.isActive)));
    });
});

function toggleSwitch(el, name) {
    el.classList.toggle('active');
    const item = extensions.find(e => e.name === name);
    if(item) item.isActive = !item.isActive;
}

function deleteItem(name) {
    extensions = extensions.filter(e => e.name !== name);
    render(extensions);
}

init();