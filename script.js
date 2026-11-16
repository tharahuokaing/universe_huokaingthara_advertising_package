document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("langToggleBtn");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const billingSwitch = document.getElementById("billingSwitch");
    const priceAmounts = document.querySelectorAll(".amount[data-monthly]");
    const selectPkgButtons = document.querySelectorAll(".select-pkg-btn");
    const selectedPackageInput = document.getElementById("selectedPackageInput");
    const bookingForm = document.getElementById("packageBookingForm");
    const htmlRoot = document.documentElement;

    let currentLang = "both"; // 'km', 'en', or 'both'

    // 1. Language Toggle (Khmer / English / Both)
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            if (currentLang === "both") {
                currentLang = "km";
                document.querySelectorAll(".km").forEach(el => el.style.display = "inline-block");
                document.querySelectorAll(".en").forEach(el => el.style.display = "none");
                langToggleBtn.innerText = "🇰🇭 ភាសាខ្មែរ";
            } else if (currentLang === "km") {
                currentLang = "en";
                document.querySelectorAll(".km").forEach(el => el.style.display = "none");
                document.querySelectorAll(".en").forEach(el => el.style.display = "inline-block");
                langToggleBtn.innerText = "🇬🇧 English";
            } else {
                currentLang = "both";
                document.querySelectorAll(".km").forEach(el => el.style.display = "");
                document.querySelectorAll(".en").forEach(el => el.style.display = "");
                langToggleBtn.innerText = "🇰🇭 / EN";
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlRoot.setAttribute("data-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlRoot.setAttribute("data-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // 3. Monthly vs Annual Billing Switch (20% Discount)
    if (billingSwitch) {
        billingSwitch.addEventListener("change", (e) => {
            const isAnnual = e.target.checked;
            priceAmounts.forEach(el => {
                el.textContent = isAnnual
                    ? el.getAttribute("data-annual")
                    : el.getAttribute("data-monthly");
            });
        });
    }

    // 4. Select Package Button -> Auto-fills Form & Scrolls smoothly
    selectPkgButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const pkgName = btn.getAttribute("data-pkg");
            if (selectedPackageInput && pkgName) {
                selectedPackageInput.value = pkgName;
            }
            const bookingSection = document.getElementById("booking");
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // 5. Booking Form Submission
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const brand = document.getElementById("brandName").value;
            const pkg = selectedPackageInput.value;

            alert(
                `សូមអរគុណក្រុមហ៊ុន ${brand}!\nសំណើកក់ "${pkg}" ត្រូវបានបញ្ជូនទៅកាន់ក្រុមការងារ UNIVERSE HUOKAING THARA ដោយជោគជ័យ។\n\n` +
                `Thank you, ${brand}! Your booking request for "${pkg}" has been submitted successfully.`
            );
            bookingForm.reset();
            selectedPackageInput.value = pkg;
        });
    }
});
