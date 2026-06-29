window.addEventListener("load", function () {
  if (window.innerWidth > 1024) {
    const cursor = document.querySelector(".cursor");
    const interactiveElements = document.querySelectorAll("a, button");

    if (!cursor) return; // safety check

    document.addEventListener("mousemove", (e) => {
      cursor.style.top = e.pageY - 10 + "px";
      cursor.style.left = e.pageX - 10 + "px";
    });

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor-hover");
      });
    });
  }
});

const selectWrapper = document.querySelector(".select-wrapper");
if (selectWrapper) {
  const selectElement = selectWrapper.querySelector("select");

  // On focus (clicked), add 'open'
  selectElement.addEventListener("focus", () => {
    selectWrapper.classList.add("open");
  });

  // On change (user made a selection), remove 'open'
  selectElement.addEventListener("change", () => {
    selectWrapper.classList.remove("open");
  });

  // On blur (clicked away), also remove 'open' as fallback
  selectElement.addEventListener("blur", () => {
    selectWrapper.classList.remove("open");
  });
}

$(document).ready(function () {
  let lastScroll = 0;
  const $header = $("header");

  $(window).on("scroll", function () {
    let currentScroll = $(this).scrollTop();

    if (currentScroll <= 0) {
      // back to top → transparent header
      $header.removeClass("hidden scrolled-up");
    } else if (currentScroll > lastScroll) {
      // scrolling down → hide header
      $header.addClass("hidden").removeClass("scrolled-up");
    } else {
      // scrolling up → show header with bg
      $header.removeClass("hidden").addClass("scrolled-up");
    }

    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });
});

$(document).ready(function () {
  $(".tabs a").click(function (e) {
    e.preventDefault();

    // Remove active from all tabs and contents
    $(".tabs a").removeClass("active");
    $(".tab-content").removeClass("active");

    // Add active to clicked tab
    $(this).addClass("active");
    $($(this).attr("href")).addClass("active");
  });
});

$(document).ready(function () {
  $(".client-carousel").owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    slideTransition: "linear",
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 2 },
      600: { items: 4 },
      1000: { items: 6 },
    },
  });
});

$(document).ready(function () {
  $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 30,
    autoplay: false,
    dots: false,
    nav: true,
    smartSpeed: 450,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
    navText: [
      "<i class='ri-arrow-left-s-line'></i>",
      "<i class='ri-arrow-right-s-line'></i>",
    ],
  });
});

$(document).ready(function () {
  if ($(".knowledge-carousel").length) {
    $(".knowledge-carousel").owlCarousel({
      loop: true,
      margin: 24,
      items: 1,
      nav: true,
      dots: true,
      autoplay: false,
      smartSpeed: 450,
      navText: [
        "<i class='ri-arrow-left-s-line'></i>",
        "<i class='ri-arrow-right-s-line'></i>",
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        1200: { items: 1 },
      },
    });
  }
});

$(document).ready(function () {
  $(".tool-carousel-1").owlCarousel({
    loop: true,
    margin: 30,
    autoplay: true,
    dots: false,
    slideTransition: "linear",
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 2 },
      600: { items: 4 },
      1000: { items: 6 },
    },
  });
});

$(document).ready(function () {
  $(".tool-carousel-2").owlCarousel({
    loop: true,
    margin: 30,
    rtl: true,
    autoplay: true,
    dots: false,
    slideTransition: "linear",
    autoplayTimeout: 3000,
    autoplaySpeed: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 2 },
      600: { items: 4 },
      1000: { items: 6 },
    },
  });
});

$(".tools-carousel").owlCarousel({
  loop: true,
  margin: 20,
  autoplay: true,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  dots: false,
  nav: false,
  responsive: {
    0: {
      items: 3,
    },
    576: {
      items: 3,
    },
    768: {
      items: 4,
    },
    992: {
      items: 6,
    },
  },
});

$(document).ready(function () {
  if ($(".case-study-carousel").length) {
    $(".case-study-carousel").owlCarousel({
      items: 1,
      loop: false,
      margin: 20,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 8000,
      autoplayHoverPause: true,
      navText: [
        "<i class='ri-arrow-left-s-line'></i>",
        "<i class='ri-arrow-right-s-line'></i>",
      ],
    });
  }
});

function setupForm(form, serverMsg, options = {}) {
  if (!form) return;

  const requireMessage = options.requireMessage !== false;
  const defaultMessage = options.defaultMessage || '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFormErrors(form);
    if (serverMsg) {
      serverMsg.textContent = '';
      serverMsg.className = '';
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!requireMessage && defaultMessage && (!data.message || !data.message.trim())) {
      data.message = defaultMessage;
    }

    let errors = {};

    if (!data.firstName || !data.firstName.trim()) {
      errors.firstName = 'Name is required';
    }
    if (requireMessage && (!data.lastName || !data.lastName.trim())) {
      errors.lastName = 'Last name is required';
    }
    if (!data.email || !data.email.trim() || !validateEmail(data.email)) {
      errors.email = 'Valid email is required';
    }
    if (!validatePhone(data.phone)) {
      errors.phone = 'Enter a valid phone number';
    }
    if (requireMessage && (!data.message || !data.message.trim())) {
      errors.message = 'Message is required';
    }
    if (!data['cf-turnstile-response']) {
      errors.captcha = 'Please verify you are human';
    }

    if (Object.keys(errors).length > 0) {
      showFormErrors(form, errors);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: new URLSearchParams({
          ...data,
          ajax: '1'
        })
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = 'https://www.Services4Amazon.com/thank-you';
      } else {
        if (serverMsg) {
          serverMsg.textContent = 'Please fix the errors.';
          serverMsg.className = 'error';
        }
        showFormErrors(form, result.errors || {});
      }
    } catch (error) {
      if (serverMsg) {
        serverMsg.textContent = 'Server error. Please try again later.';
        serverMsg.className = 'error';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function showFormErrors(form, errors) {
  for (const [name, msg] of Object.entries(errors)) {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.classList.add('error');
      const errorDiv = input.closest('.mb-3, .mb-1, .mb-1.mb-md-2, .mb-1.mb-md-2.mb-lg-1, .contact-field')?.querySelector('.error-message')
        || input.nextElementSibling;
      if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.textContent = msg;
      }
    }
  }
}

function clearFormErrors(form) {
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.error-message').forEach(div => div.textContent = '');
}

setupForm(
  document.getElementById('contactForm'),
  document.getElementById('server-message'),
  { requireMessage: true }
);

setupForm(
  document.getElementById('heroForm'),
  document.getElementById('hero-server-message'),
  { requireMessage: false, defaultMessage: 'Free Amazon Audit Request' }
);

setupForm(
  document.getElementById('contactSectionForm'),
  document.getElementById('contact-section-message'),
  { requireMessage: false, defaultMessage: 'Strategy call request from contact section' }
);

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  if (!phone) return false;

  // allow digits, +, -, spaces
  const cleaned = phone.replace(/[\s\-]/g, '');

  // optional + at the start
  if (cleaned.startsWith('+')) {
    const digitsOnly = cleaned.slice(1);
    if (!/^\d+$/.test(digitsOnly)) return false;
    return digitsOnly.length >= 5 && digitsOnly.length <= 15;
  } else {
    // no + → just digits
    if (!/^\d+$/.test(cleaned)) return false;
    return cleaned.length >= 5 && cleaned.length <= 15;
  }
}