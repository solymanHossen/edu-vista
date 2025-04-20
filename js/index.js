// tailwind css config
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#f0f4ff",
        accent: "#fef3c7",
        dark: "#1e293b",
        light: "#f8fafc",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scale: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.7s ease-out",
        slideIn: "slideIn 0.7s ease-out",
        pulse: "pulse 3s infinite ease-in-out",
        float: "float 5s infinite ease-in-out",
        scale: "scale 0.3s ease-in-out",
      },
    },
  },
};

      document.addEventListener("DOMContentLoaded", function () {
        const hamburgerButton = document.getElementById("hamburger-button");
        const closeMenuButton = document.getElementById("close-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");
        const themeToggle = document.getElementById("theme-toggle");
        const mobileThemeToggle = document.getElementById(
          "mobile-theme-toggle"
        );
        const html = document.documentElement;

        // Check for saved theme preference or use the system preference
        const getThemePreference = () => {
          if (
            localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
          ) {
            return "dark";
          }
          return "light";
        };

        // Apply the current theme
        const applyTheme = (theme) => {
          if (theme === "dark") {
            html.classList.add("dark");
          } else {
            html.classList.remove("dark");
          }
          localStorage.setItem("theme", theme);
        };

        // Set initial theme
        applyTheme(getThemePreference());

        // Toggle theme function
        const toggleTheme = () => {
          const currentTheme = html.classList.contains("dark")
            ? "dark"
            : "light";
          const newTheme = currentTheme === "dark" ? "light" : "dark";
          applyTheme(newTheme);
        };

        // Event listeners for theme toggles
        if (themeToggle) {
          themeToggle.addEventListener("click", toggleTheme);
        }

        if (mobileThemeToggle) {
          mobileThemeToggle.addEventListener("click", toggleTheme);
        }

        // Function to toggle mobile menu
        function toggleMobileMenu() {
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("active");
            hamburgerButton.classList.toggle("active");
          
            document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
          }
          

        // Event listeners for mobile menu
        if (hamburgerButton) {
          hamburgerButton.addEventListener("click", toggleMobileMenu);
        }

        if (closeMenuButton) {
          closeMenuButton.addEventListener("click", toggleMobileMenu);
        }

        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach((link) => {
          link.addEventListener("click", toggleMobileMenu);
        });

        // Close menu when window is resized to desktop size
        window.addEventListener("resize", function () {
            if (window.innerWidth >= 1024 && mobileMenu.classList.contains("active")) {
              mobileMenu.classList.remove("active");
              hamburgerButton.classList.remove("active");
              document.body.style.overflow = "";
            }
          });

        // Listen for system theme changes
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
              applyTheme(e.matches ? "dark" : "light");
            }
          });
      });
  
    