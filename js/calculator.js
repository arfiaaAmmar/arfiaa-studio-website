function updatePackageVisibility() {
    const packageType = document.getElementById('package-type').value;
    const weddingOptions = document.getElementById('wedding-options');
    const hourlyOptions = document.getElementById('hourly-options');

    // Hide all package options first
    weddingOptions.classList.add('hidden');
    hourlyOptions.classList.add('hidden');

    // Show relevant options based on selection
    if (packageType === 'wedding') {
        weddingOptions.classList.remove('hidden');
    } else if (packageType === 'hourly') {
        hourlyOptions.classList.remove('hidden');
    }

    calculateTotal();
}

function calculateHourlyRate(extraHours) {
    let total = 0;
    for (let i = 1; i <= extraHours; i++) {
        // Apply 10% discount for each additional hour
        const discount = 0.1 * i;
        const hourRate = 150 * (1 - discount);
        total += hourRate;
    }
    return total;
}

function calculateTotal() {
    const packageType = document.getElementById('package-type').value;
    const location = document.getElementById('location').value;
    const additionalPhotographers = parseInt(document.getElementById('photographers').value) || 0;
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
        const extraHours = parseInt(document.getElementById('extra-hours').value) || 0;
        const isStudent = document.getElementById('student-discount').checked;

        if (hourlyBase === 'base') {
            // Add base package cost (First 3 Hours)
            subtotal = 550;
            
            // Calculate additional hours with progressive discount
            if (extraHours > 0) {
                const extraCost = calculateHourlyRate(extraHours);
                subtotal += extraCost;
            }

            // Apply student discount if applicable
            if (isStudent) {
                const discount = subtotal * 0.1;
                breakdown.push({
                    item: 'Base Package + Additional Hours',
                    cost: Math.round(subtotal)
                });
                breakdown.push({
                    item: 'Student Discount (10%)',
                    cost: -Math.round(discount)
                });
                total += subtotal - discount;
            } else {
                total += subtotal;
                breakdown.push({
                    item: `Base Package${extraHours > 0 ? ' + Additional Hours' : ''} (${3 + extraHours} hours total)`,
                    cost: Math.round(subtotal)
                });
            }
        }
    }

    // Add cost for additional photographers
    if (additionalPhotographers > 0 && packageType !== 'none') {
        const photographerCost = additionalPhotographers * 300;
        total += photographerCost;
        breakdown.push({
            item: `Additional Photographers (${additionalPhotographers})`,
            cost: photographerCost
        });
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
        
        // If booking is more than 3 months away, deposit is 30%, otherwise 50%
        const depositPercentage = monthsDifference > 3 ? 0.3 : 0.5;
        deposit = Math.ceil(total * depositPercentage);
        depositText = `RM${deposit} (${depositPercentage * 100}%)`;
    }
    
    // Update deposit display
    document.getElementById('deposit-amount').textContent = depositText;
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    document.getElementById('package-type').addEventListener('change', updatePackageVisibility);
    
    const inputs = ['wedding-package', 'hourly-base', 'extra-hours', 'location', 'event-date', 'student-discount', 'photographers'];
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

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('event-date').min = today;

    // Initial calculation
    updatePackageVisibility();
});
