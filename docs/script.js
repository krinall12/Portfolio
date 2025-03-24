// Typed.js Initialization
document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed(".text", {
        strings: ["Web Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on Scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        observer.observe(section);
    });

    // Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const body = document.body;

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
        body.classList.toggle("menu-open");
    });

    // Contact Form Submission
    document.getElementById("contactForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the form from reloading the page

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("messageText").value.trim();
        const responseMessage = document.getElementById("responseMessage");

        if (!name || !email || !message) {
            responseMessage.innerText = "All fields are required!";
            responseMessage.style.color = "red";
            return;
        }

        try {
            console.log("Sending data:", { name, email, message }); // Debugging

            const response = await fetch("http://localhost:5000/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message })
            });

            console.log("Response status:", response.status); // Debugging

            const result = await response.json();
            console.log("Response data:", result); // Debugging

            if (response.ok) {
                responseMessage.innerText = "Message sent successfully!";
                responseMessage.style.color = "green";
                document.getElementById("contactForm").reset(); // Clear the form
            } else {
                responseMessage.innerText = result.error || "Failed to send message!";
                responseMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error); // Debugging
            responseMessage.innerText = "Error connecting to the server!";
            responseMessage.style.color = "red";
        }
    });
});

// Add animations for the new sections
const educationSection = document.querySelector(".education");
const certificatesSection = document.querySelector(".certificates");

observer.observe(educationSection);
observer.observe(certificatesSection);