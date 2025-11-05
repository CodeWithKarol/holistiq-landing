// ===========================
// Smooth Scrolling & Navigation
// ===========================

document
	.querySelectorAll('a[href^="#"]')
	.forEach((anchor) => {
		anchor.addEventListener(
			"click",
			function (e) {
				const href = this.getAttribute("href");
				if (href !== "#") {
					e.preventDefault();
					const target =
						document.querySelector(href);
					if (target) {
						target.scrollIntoView({
							behavior: "smooth",
							block: "start",
						});
						// Close mobile menu if open
						const mobileMenu =
							document.getElementById(
								"mobileMenu"
							);
						const mobileToggle =
							document.getElementById(
								"mobileMenuToggle"
							);
						if (
							mobileMenu &&
							mobileMenu.classList.contains(
								"active"
							)
						) {
							mobileMenu.classList.remove(
								"active"
							);
							mobileToggle.classList.remove(
								"active"
							);
						}
					}
				}
			}
		);
	});

// ===========================
// Mobile Menu Toggle
// ===========================

const mobileMenuToggle = document.getElementById(
	"mobileMenuToggle"
);
const mobileMenu =
	document.getElementById("mobileMenu");

if (mobileMenuToggle && mobileMenu) {
	mobileMenuToggle.addEventListener(
		"click",
		() => {
			mobileMenuToggle.classList.toggle("active");
			mobileMenu.classList.toggle("active");
		}
	);

	// Close menu on outside click
	document.addEventListener("click", (e) => {
		if (
			mobileMenu.classList.contains("active") &&
			!mobileMenu.contains(e.target) &&
			!mobileMenuToggle.contains(e.target)
		) {
			mobileMenuToggle.classList.remove("active");
			mobileMenu.classList.remove("active");
		}
	});
}

// ===========================
// CTA Button Actions
// ===========================

document
	.querySelectorAll('[data-action="download"]')
	.forEach((button) => {
		button.addEventListener("click", () => {
			showAppStorePopup();
		});
	});

document
	.querySelectorAll('[data-action="learn-more"]')
	.forEach((button) => {
		button.addEventListener("click", () => {
			document
				.querySelector("#features")
				.scrollIntoView({ behavior: "smooth" });
		});
	});

function showAppStorePopup() {
	// Simulate app store redirection
	const appStores = {
		ios: "https://apps.apple.com",
		android: "https://play.google.com",
	};

	// In a real implementation, show a modal or redirect
	console.log("App store options:", appStores);
	alert(
		"Download Holistiq:\n- iOS: Apple App Store\n- Android: Google Play Store"
	);
}

// ===========================
// Chat Widget
// ===========================

const chatWidget =
	document.getElementById("chatWidget");
const chatButton = chatWidget.querySelector(
	".chat-button"
);
const chatPopup =
	document.getElementById("chatPopup");
const chatClose = chatPopup.querySelector(
	".chat-close"
);
const chatInput = chatPopup.querySelector(
	".chat-input input"
);
const chatSendButton = chatPopup.querySelector(
	".chat-input button"
);
const chatMessages = chatPopup.querySelector(
	".chat-messages"
);

chatButton.addEventListener("click", () => {
	chatPopup.classList.toggle("active");
});

chatClose.addEventListener("click", () => {
	chatPopup.classList.remove("active");
});

chatSendButton.addEventListener(
	"click",
	sendChatMessage
);
chatInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		sendChatMessage();
	}
});

function sendChatMessage() {
	const message = chatInput.value.trim();
	if (!message) return;

	// Add user message
	addChatMessage(message, "user");
	chatInput.value = "";

	// Simulate bot response
	setTimeout(() => {
		const responses = [
			"Great question! How can I help you with Holistiq?",
			"I'm here to help. Do you have questions about our features?",
			"Absolutely! Tell me more about what interests you.",
			"Perfect! Would you like to know about our pricing or features?",
			"That's awesome! Feel free to reach out anytime.",
			"I'd be happy to help! What would you like to know?",
		];
		const randomResponse =
			responses[
				Math.floor(
					Math.random() * responses.length
				)
			];
		addChatMessage(randomResponse, "bot");
	}, 800);
}

function addChatMessage(text, sender) {
	const messageDiv =
		document.createElement("div");
	messageDiv.className = `chat-message ${sender}`;
	messageDiv.innerHTML = `<p>${text}</p>`;
	chatMessages.appendChild(messageDiv);
	chatMessages.scrollTop =
		chatMessages.scrollHeight;
}

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById(
	"contactForm"
);

contactForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const formData = {
		name: contactForm.querySelector(
			'input[type="text"]'
		).value,
		email: contactForm.querySelector(
			'input[type="email"]'
		).value,
		topic:
			contactForm.querySelector("select").value,
		message:
			contactForm.querySelector("textarea").value,
	};

	// Validate form
	if (
		!formData.name ||
		!formData.email ||
		!formData.topic ||
		!formData.message
	) {
		showNotification(
			"Please fill out all fields",
			"error"
		);
		return;
	}

	// Validate email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(formData.email)) {
		showNotification(
			"Please enter a valid email",
			"error"
		);
		return;
	}

	// In a real application, send to backend
	console.log("Form data:", formData);
	showNotification(
		"Thank you! We'll get back to you soon.",
		"success"
	);
	contactForm.reset();
});

// ===========================
// Notifications
// ===========================

function showNotification(
	message,
	type = "info"
) {
	const notification =
		document.createElement("div");
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${
					type === "success"
						? "#4CAF50"
						: type === "error"
						? "#FF6B6B"
						: "#0066FF"
				};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
	notification.textContent = message;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation =
			"slideOutRight 0.3s ease-out";
		setTimeout(() => {
			notification.remove();
		}, 300);
	}, 3000);
}

// ===========================
// Scroll Animations
// ===========================

const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.animation =
					"fadeInUp 0.6s ease-out forwards";
				observer.unobserve(entry.target);
			}
		});
	},
	observerOptions
);

document
	.querySelectorAll(
		".benefit-card, .feature, .testimonial-card"
	)
	.forEach((el) => {
		el.style.opacity = "0";
		el.style.transform = "translateY(30px)";
		observer.observe(el);
	});

// ===========================
// Counter Animation
// ===========================

function animateCounters() {
	const stats = document.querySelectorAll(
		".stat-number"
	);

	stats.forEach((stat) => {
		const text = stat.textContent;
		const numberMatch = text.match(/(\d+)/);

		if (numberMatch) {
			const finalNumber = parseInt(
				numberMatch[1]
			);
			const increment = Math.ceil(
				finalNumber / 50
			);
			let current = 0;

			const counter = setInterval(() => {
				current += increment;
				if (current >= finalNumber) {
					current = finalNumber;
					clearInterval(counter);
				}
				stat.textContent = text.replace(
					/\d+/,
					current
				);
			}, 30);
		}
	});
}

// Trigger counter animation when hero section is visible
const heroSection =
	document.querySelector(".hero");
const heroObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateCounters();
				heroObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.5 }
);

heroObserver.observe(heroSection);

// ===========================
// Mobile Menu Toggle
// ===========================

const navbar = document.querySelector(".navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
	const scrollTop =
		window.pageYOffset ||
		document.documentElement.scrollTop;

	if (scrollTop > lastScrollTop) {
		// Scrolling down
		navbar.style.transform = "translateY(-100%)";
	} else {
		// Scrolling up
		navbar.style.transform = "translateY(0)";
	}

	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

navbar.style.transition = "transform 0.3s ease";

// ===========================
// Keyboard Navigation
// ===========================

document.addEventListener("keydown", (e) => {
	// Close chat with Escape
	if (
		e.key === "Escape" &&
		chatPopup.classList.contains("active")
	) {
		chatPopup.classList.remove("active");
	}

	// Open chat with Ctrl+/
	if ((e.ctrlKey || e.metaKey) && e.key === "/") {
		e.preventDefault();
		chatPopup.classList.toggle("active");
	}
});

// ===========================
// Add CSS for animations
// ===========================

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Analytics & Event Tracking
// ===========================

function trackEvent(eventName, data = {}) {
	// This would integrate with Google Analytics or similar
	console.log(`Event: ${eventName}`, data);
}

// Track CTA clicks
document
	.querySelectorAll(".cta-button")
	.forEach((button) => {
		button.addEventListener("click", () => {
			trackEvent("CTA_Click", {
				text: button.textContent,
				type: button.className,
			});
		});
	});

// Track form submissions
contactForm.addEventListener("submit", () => {
	trackEvent("Contact_Form_Submit");
});

// ===========================
// Performance: Lazy Loading Images
// ===========================

if ("IntersectionObserver" in window) {
	const imageObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;
					if (img.dataset.src) {
						img.src = img.dataset.src;
						img.removeAttribute("data-src");
						imageObserver.unobserve(img);
					}
				}
			});
		}
	);

	document
		.querySelectorAll("img[data-src]")
		.forEach((img) => {
			imageObserver.observe(img);
		});
}

// ===========================
// Accessibility: Focus Management
// ===========================

document
	.querySelectorAll(
		"button, a[href], input, select, textarea"
	)
	.forEach((el) => {
		el.addEventListener("focus", function () {
			this.style.outline = "2px solid #0066FF";
			this.style.outlineOffset = "2px";
		});

		el.addEventListener("blur", function () {
			this.style.outline = "";
			this.style.outlineOffset = "";
		});
	});

// ===========================
// Initialization
// ===========================

console.log(
	"Holistiq Landing Page - Loaded Successfully"
);
console.log("Version: 1.0.0");
