// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const contactForm = document.getElementById('contact-form');
const tabBtns = document.querySelectorAll('.tab-btn');
const menuGrids = document.querySelectorAll('.menu-grid');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling and page switching
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Switch pages
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(targetPage).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Menu Tab Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding menu grid
        menuGrids.forEach(grid => grid.classList.remove('active'));
        document.querySelector(`.${targetTab}-grid`).classList.add('active');
    });
});

// Form Validation and Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (validateForm(name, email, message)) {
        // Simulate form submission
        showSuccessMessage();
        contactForm.reset();
    }
});

function validateForm(name, email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || name.length < 2) {
        showError('Name must be at least 2 characters long');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (!message || message.length < 10) {
        showError('Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

function showError(message) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'form-alert';
    alert.style.cssText = `
        background: #fee;
        color: #c33;
        padding: 12px 20px;
        border-radius: 8px;
        margin-bottom: 1rem;
        border-left: 4px solid #c33;
        animation: slideDown 0.3s ease;
    `;
    alert.textContent = message;
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    setTimeout(() => alert.remove(), 4000);
}

function showSuccessMessage() {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Sent! ✓';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 2000);
    }, 1500);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Smooth scrolling for anchor links in footer
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(el => {
            el.classList.add('animate');
        });
    }, 500);
});

// Back to top button (bonus feature)
function createBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(111, 78, 55, 0.4);
    `;
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
}

createBackToTop();

// Add CSS for back to top animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .back-to-top:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 15px 40px rgba(111, 78, 55, 0.5);
    }
`;
document.head.appendChild(style);

const searchInput = document.getElementById("menuSearch");

searchInput.addEventListener("keyup", function() {

let filter = searchInput.value.toLowerCase();

let cards = document.querySelectorAll(".menu-card");

cards.forEach(function(card){

let title = card.querySelector("h3").textContent.toLowerCase();

if(title.includes(filter)){
card.style.display = "block";
}else{
card.style.display = "none";
}

});

});

const cards = document.querySelectorAll(".drinks-grid .menu-card");
const itemsPerPage = 6;
let currentPage = 1;

function showPage(page){

const start = (page - 1) * itemsPerPage;
const end = start + itemsPerPage;

cards.forEach((card,index)=>{
if(index >= start && index < end){
card.style.display = "block";
}else{
card.style.display = "none";
}
});

}

function updatePagination(){

const pageCount = Math.ceil(cards.length / itemsPerPage);
const pageNumbers = document.getElementById("pageNumbers");

pageNumbers.innerHTML = "";

for(let i=1;i<=pageCount;i++){

let span = document.createElement("span");
span.innerText = i;

span.addEventListener("click",()=>{
currentPage = i;
showPage(currentPage);
});

pageNumbers.appendChild(span);

}

}

document.getElementById("prevBtn").addEventListener("click",()=>{
if(currentPage>1){
currentPage--;
showPage(currentPage);
}
});

document.getElementById("nextBtn").addEventListener("click",()=>{
if(currentPage < Math.ceil(cards.length/itemsPerPage)){
currentPage++;
showPage(currentPage);
}
});

showPage(currentPage);
updatePagination();
