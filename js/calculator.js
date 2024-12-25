function updatePackageVisibility() {
    const packageType = document.getElementById('package-type').value;
    const weddingOptions = document.getElementById('wedding-options');
    const hourlyOptions = document.getElementById('hourly-options');
    const extraHoursContainer = document.getElementById('extra-hours-container');

    // Hide all package options first
    weddingOptions.classList.add('hidden');
    hourlyOptions.classList.add('hidden');

    // Show relevant options based on selection
    if (packageType === 'wedding') {
        weddingOptions.classList.remove('hidden');
    } else if (packageType === 'hourly') {
        hourlyOptions.classList.remove('hidden');
        
        // Show/hide extra hours based on package selection
        const hourlyBase = document.getElementById('hourly-base').value;
        if (hourlyBase === 'fullday') {
            extraHoursContainer.classList.add('hidden');
        } else {
            extraHoursContainer.classList.remove('hidden');
        }
    }

    calculateTotal();
}

function calculateTotal() {
    const packageType = document.getElementById('package-type').value;
    const location = document.getElementById('location').value;
    let total = 0;
    let breakdown = [];
    let subtotal = 0;
    let fixedDeposit = false;

    if (packageType === 'wedding') {
        const weddingPackage = document.getElementById('wedding-package').value;
        if (weddingPackage !== 'none') {
            const weddingCosts = {
                'solemnisation': 700,
                'reception': 1000,
                'both': 1500
            };
            total += weddingCosts[weddingPackage];
            breakdown.push({
                item: `Wedding Package (${weddingPackage.charAt(0).toUpperCase() + weddingPackage.slice(1)})`,
                cost: weddingCosts[weddingPackage]
            });

            // Set fixed deposit flag if "both" is selected
            if (weddingPackage === 'both') {
                fixedDeposit = true;
            }
        }
    } else if (packageType === 'hourly') {
        const hourlyBase = document.getElementById('hourly-base').value;
        const isStudent = document.getElementById('student-discount').checked;

        if (hourlyBase === 'base') {
            // Add base package cost (First 3 Hours)
            subtotal = 500;
            
            // Calculate additional hours
            const extraHours = parseInt(document.getElementById('extra-hours').value) || 0;
            if (extraHours > 0) {
                const extraCost = extraHours * 150; // Flat rate of RM150 per hour
                subtotal += extraCost;
                breakdown.push({
                    item: `Base Package (3 Hours)`,
                    cost: 500
                });
                breakdown.push({
                    item: `Additional ${extraHours} Hour${extraHours > 1 ? 's' : ''}`,
                    cost: extraCost
                });
            } else {
                breakdown.push({
                    item: 'Base Package (3 Hours)',
                    cost: subtotal
                });
            }

            // Apply student discount if applicable
            if (isStudent) {
                const discount = subtotal * 0.2; // 20% student discount
                breakdown.push({
                    item: 'Student Discount (20%)',
                    cost: -Math.round(discount)
                });
                total += subtotal - discount;
            } else {
                total += subtotal;
            }
        } else if (hourlyBase === 'fullday') {
            // Full day package (8 hours)
            subtotal = 1000;
            breakdown.push({
                item: 'Full Day Package (8 Hours)',
                cost: subtotal
            });

            // Apply student discount if applicable
            if (isStudent) {
                const discount = subtotal * 0.2; // 20% student discount
                breakdown.push({
                    item: 'Student Discount (20%)',
                    cost: -Math.round(discount)
                });
                total += subtotal - discount;
            } else {
                total += subtotal;
            }
        }
    }

    // Add transportation cost if outside Selangor
    if (location === 'outside' && packageType !== 'none') {
        const transportCost = 100;
        total += transportCost;
        breakdown.push({
            item: 'Transportation (Outside Selangor)',
            cost: transportCost
        });
    }

    // Update the invoice display
    const invoiceBreakdown = document.getElementById('invoice-breakdown');
    invoiceBreakdown.innerHTML = '';
    
    breakdown.forEach(item => {
        invoiceBreakdown.innerHTML += `
            <div class="flex justify-between mb-2">
                <span>${item.item}</span>
                <span>${item.cost >= 0 ? 'RM' : '-RM'}${Math.abs(item.cost)}</span>
            </div>
        `;
    });

    // Add total
    document.getElementById('total-amount').textContent = `RM${Math.round(total)}`;
    
    // Calculate deposit
    let deposit;
    let depositText;
    
    if (fixedDeposit) {
        // Fixed RM500 deposit for "both" wedding package
        deposit = 500;
        depositText = `RM${deposit} (Fixed)`;
    } else {
        // Calculate based on booking date for other packages
        const eventDate = new Date(document.getElementById('event-date').value);
        const today = new Date();
        const monthsDifference = (eventDate.getFullYear() - today.getFullYear()) * 12 + 
                                (eventDate.getMonth() - today.getMonth());
        
        // If booking is more than 1 month away, deposit is 30%, otherwise 50%
        const depositPercentage = monthsDifference > 1 ? 0.3 : 0.5;
        deposit = Math.ceil(total * depositPercentage);
        depositText = `RM${deposit} (${depositPercentage * 100}%)`;
    }
    
    // Update deposit display
    document.getElementById('deposit-amount').textContent = depositText;

    updateWhatsAppButton();
}

function updateWhatsAppButton() {
    const packageType = document.getElementById('package-type').value;
    const location = document.getElementById('location').value;
    const eventDate = document.getElementById('event-date').value;
    const whatsappLink = document.getElementById('whatsapp-link');

    // Check if wedding package is selected
    let weddingPackageValid = true;
    if (packageType === 'wedding') {
        const weddingPackage = document.getElementById('wedding-package').value;
        weddingPackageValid = weddingPackage !== 'none';
    }

    // Check if hourly package is selected
    let hourlyPackageValid = true;
    if (packageType === 'hourly') {
        const hourlyBase = document.getElementById('hourly-base').value;
        hourlyPackageValid = hourlyBase !== 'none';
    }

    // Check if all required fields are filled
    const isValid = packageType !== 'none' && 
                   location !== 'none' && 
                   eventDate !== '' && 
                   weddingPackageValid && 
                   hourlyPackageValid;

    if (isValid) {
        whatsappLink.classList.remove('bg-gray-500', 'opacity-50', 'cursor-not-allowed');
        whatsappLink.classList.add('bg-green-600', 'hover:bg-green-700');
        updateWhatsAppLink(); // Only update the link if form is valid
    } else {
        whatsappLink.classList.add('bg-gray-500', 'opacity-50', 'cursor-not-allowed');
        whatsappLink.classList.remove('bg-green-600', 'hover:bg-green-700');
        whatsappLink.href = '#';
    }
}

function updateWhatsAppLink() {
    const packageType = document.getElementById('package-type').value;
    const location = document.getElementById('location').value;
    const eventDate = document.getElementById('event-date').value;
    const isStudent = document.getElementById('student-discount').checked;
    const total = document.getElementById('total-amount').textContent;
    const deposit = document.getElementById('deposit-amount').textContent;
    
    let packageDetails = '';
    if (packageType === 'wedding') {
        const weddingPackage = document.getElementById('wedding-package').value;
        packageDetails = `Package: ${weddingPackage.charAt(0).toUpperCase() + weddingPackage.slice(1)}`;
    } else if (packageType === 'hourly') {
        const hourlyBase = document.getElementById('hourly-base').value;
        const extraHours = parseInt(document.getElementById('extra-hours').value) || 0;
        if (hourlyBase === 'base') {
            packageDetails = `Package: First 3 Hours${extraHours > 0 ? ` + ${extraHours} additional hours` : ''}`;
        } else if (hourlyBase === 'fullday') {
            packageDetails = 'Package: Full Day (8 Hours)';
        }
    }

    const message = `Hi Arfiaa Studio 👋

I'm interested in booking a photoshoot:

Type: ${packageType.charAt(0).toUpperCase() + packageType.slice(1)}
${packageDetails}
Location: ${location === 'within' ? 'Within Selangor' : 'Outside Selangor'}
Event Date: ${eventDate}
${isStudent ? 'I am a full time student (20% discount applies)' : ''}

Quote Summary:
Total: ${total}
Required Deposit: ${deposit}

Please confirm my booking. Thank you! 😊`;

    const whatsappLink = document.getElementById('whatsapp-link');
    whatsappLink.href = `https://wa.me/601111260463?text=${encodeURIComponent(message)}`;
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    document.getElementById('package-type').addEventListener('change', updatePackageVisibility);
    document.getElementById('hourly-base').addEventListener('change', updatePackageVisibility);
    
    const inputs = ['wedding-package', 'hourly-base', 'extra-hours', 'location', 'event-date', 'student-discount'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') {
                element.addEventListener('change', calculateTotal);
            } else {
                element.addEventListener('change', calculateTotal);
            }
        }
    });

    const whatsappInputs = ['package-type', 'wedding-package', 'hourly-base', 'extra-hours', 'location', 'event-date', 'student-discount'];
    whatsappInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.type === 'checkbox') {
                element.addEventListener('change', updateWhatsAppButton);
            } else {
                element.addEventListener('change', updateWhatsAppButton);
            }
        }
    });

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('event-date').min = today;

    // Initial calculation
    updatePackageVisibility();

    // Initial WhatsApp button update
    updateWhatsAppButton();
});
