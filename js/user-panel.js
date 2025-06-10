// GLOBAL SEÇİMLER
let selectedDate = null;
let selectedTime = null;
let selectedPerson = null;
// Kullanıcı Bilgileri
let userName = localStorage.getItem("userName");
let userEmail = localStorage.getItem("userEmail");
let userPhone = localStorage.getItem("userPhone");

// SAYFA YÜKLENİNCE
document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  createReservationForm();
  setupSendButton();
});
// Yan Menü
function setupMenu() {
  const menuItems = document.querySelectorAll(".nav-item");

  const homeSection = document.getElementById("home");
  const manageReservations = document.getElementById("manage-reservations");
  const pastReservations = document.getElementById("past-reservations");

  if (userName) {
    document.querySelectorAll(".welcome-text").forEach((el) => {
      el.textContent = `Welcome, ${userName}!`;
    });
  } else {
    console.log("The user is not logged in.");
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      homeSection.classList.add("hidden");
      manageReservations.classList.add("hidden");
      pastReservations.classList.add("hidden");

      const target = item.getAttribute("data-target");

      if (target === "home") {
        homeSection.classList.remove("hidden");
      } else if (target === "manage-reservations") {
        manageReservations.classList.remove("hidden");
        fetchActiveReservations(userName, userPhone, userEmail);
      } else if (target === "past-reservations") {
        pastReservations.classList.remove("hidden");
      } else {
        localStorage.clear()
        window.location.href = "index.html";
        
      }
    });
  });
}

// Kişi Sayısı Seçimi
function createPersonSelection() {
  const personContainer = document.querySelector(".guest-count-selection");
  for (let i = 1; i <= 10; i++) {
    const div = document.createElement("div");
    div.className = "selection-item";
    div.dataset.value = i;
    div.innerHTML = `<h3 class="selection-item-label">${i}</h3>`;
    personContainer.appendChild(div);
  }

  personContainer.querySelectorAll(".selection-item").forEach((item) => {
    item.addEventListener("click", () => {
      personContainer
        .querySelectorAll(".selection-item")
        .forEach((el) => el.classList.remove("selected"));
      item.classList.add("selected");
      selectedPerson = item.dataset.value;
      console.log("Selected person:", selectedPerson);
    });
  });
}

// Takvim Oluştur
function createCalendar() {
  const monthYear = document.querySelector(".month-year");
  const daysContainer = document.querySelector(".days");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDate = new Date();
  let today = new Date();

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = `${months[month]} ${year}`;
    daysContainer.innerHTML = "";

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add("fade");
      daysContainer.appendChild(dayDiv);
    }

    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      dayDiv.dataset.date = `${year}-${month + 1}-${i}`;
      dayDiv.textContent = i;

      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayDiv.classList.add("today");
      }

      dayDiv.addEventListener("click", () => {
        daysContainer
          .querySelectorAll(".day")
          .forEach((d) => d.classList.remove("selected"));
        dayDiv.classList.add("selected");
        selectedDate = dayDiv.dataset.date;
        console.log("Selected date:", selectedDate);
      });

      daysContainer.appendChild(dayDiv);
    }

    const remaining = 42 - daysContainer.children.length;
    for (let i = 1; i <= remaining; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.textContent = i;
      dayDiv.classList.add("fade");
      daysContainer.appendChild(dayDiv);
    }
  }

  prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
}

// Saat Seçimi
function createTimeSelection() {
  const timeContainer = document.querySelector(".reserv-time-selection");
  const times = [
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];

  times.forEach((time) => {
    const div = document.createElement("div");
    div.className = "time-selection-item selection-item";
    div.dataset.time = time;
    div.innerHTML = `<h3 class="time-selection-label">${time}</h3>`;
    timeContainer.appendChild(div);
  });

  timeContainer.querySelectorAll(".time-selection-item").forEach((item) => {
    item.addEventListener("click", () => {
      timeContainer
        .querySelectorAll(".time-selection-item")
        .forEach((el) => el.classList.remove("selected"));
      item.classList.add("selected");
      selectedTime = item.dataset.time;
      console.log("Selected time:", selectedTime);
    });
  });
}
// Rezervasyon Formu Oluştur
function createReservationForm() {
  createPersonSelection();
  createCalendar();
  createTimeSelection();
}

// Rezervasyon Gönderme Butonu

function setupSendButton() {
  document.getElementById("send-button").addEventListener("click", async () => {


    if (!userName || !userPhone || !userEmail) {
      alert("Kullanıcı bilgileri bulunamadı. Lütfen giriş yapın.");
      return;
    }

    const selectedDay = document
      .querySelector(".days .selected")
      ?.dataset.date?.trim();
    const selectedTime = document
      .querySelector(".reserv-time-selection .selected")
      ?.dataset.time?.trim();

    if (!selectedPerson || !selectedTime || !selectedDay) {
      alert("Lütfen kişi sayısı, saat ve tarih seçiniz.");
      return;
    }

    // --- ISO formatlı tarih oluştur ---

    const [year, month, day] = selectedDay.split("-");

    // Ay ve gün iki haneli olmalı, sıfır ekleyerek düzenliyoruz
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    // Saat verisini de alıyoruz


    const [hours, minutes] = selectedTime.split(":");

    const selectedDateTime = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours) + 3,
      Number(minutes),
      0
    );

    // console.log("fullDateStr:", fullDateStr); // kontrol için



    if (isNaN(selectedDateTime)) {
      alert("Geçersiz tarih veya saat seçimi.");
      return;
    }

    const reservationData = {
      restaurantId: 1,
      // reservationId: 9007199254740991,
      customerName: userName,
      customerEmail: userEmail,
      customerPhoneNumber: userPhone,
      description: "Created by user panel",
      peopleCounts: Number(selectedPerson),
      reservationTime: selectedDateTime.toISOString(), // API'nın istediği gibi ISO 8601 formatı
    };

    console.log("Gönderilen Veri:", reservationData);

    try {
      const response = await fetch(
        "http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/reservation/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        successPopup();
        deleteSelectedValue(); // Seçimleri sıfırla
      } else {
        unsuccessPopup();
        deleteSelectedValue(); // Seçimleri sıfırla
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    }
  });
}

// Kullanıcının rezervasyonlarını getir
async function fetchActiveReservations(userName, userPhone, userEmail) {

  
  try {
    const response = await fetch(
      "http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/customer/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          phoneNumber: userPhone,
          email: userEmail,


        }),
      }
    );

    if (!response.ok) throw new Error("Failed to fetch reservations");

    const reservations = await response.json();
    displayReservations(reservations);
  } catch (error) {
    alert("An error occurred: " + error.message);
    console.error(error);
    window.location.href = "home.html";
  }
}

// Güncel veya geçmiş Rezervasyonları Ayrı Ayrı ekranda gösterme
function displayReservations(reservations) {
  const activeCard = document.getElementById("active-reserv-card");
  const pastReserv = document.getElementById("past-reserv-section");
  activeCard.innerHTML = "";
  pastReserv.innerHTML = "";

  const today = new Date();

  const futureReservations = reservations.filter(
    (rsv) => new Date(rsv.reservationTime) > today
  );
  const pastReservationsList = reservations.filter(
    (rsv) => new Date(rsv.reservationTime) < today
  );

  if (futureReservations.length === 0) {
    activeCard.innerHTML = "<p>No upcoming reservations.</p>";
  } else {
    futureReservations.forEach(createReservationCard(activeCard));
  }

  if (pastReservationsList.length === 0) {
    pastReserv.innerHTML = "<p>No past reservations.</p>";
  } else {
    // Burada tabloyu baştan oluşturuyoruz
    const table = document.createElement("table");
    table.className = "past-reserv-table";
    table.innerHTML = `
      <tr>
        <th>Reservation Date & Time</th>
        <th>Number Of People</th>
        <th>Description</th>
      </tr>
    `;
    pastReserv.appendChild(table);

    pastReservationsList.forEach((rsv) => {
      table.appendChild(createTableRow(rsv));
    });
  }
}

// Sadece bir <tr> oluşturan fonksiyon
function createTableRow(rsv) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${new Date(rsv.reservationTime).toLocaleString()}</td>
    <td>${rsv.peopleCounts}</td>
    <td>${rsv.description}</td>
  `;
  return tr;
}

//Manage Reservation Kartları Oluşturma
function createReservationCard(container, isFuture = true) {
  return (rsv) => {
    
    const card = document.createElement("div");
    card.className = "card future-card";
    card.innerHTML = `
      <div class="card-header">
        <h4 class="time-icon"><i class="fa-regular fa-clock"></i></h4>
        <p class="reserv-date-time">${new Date(
          rsv.reservationTime
        ).toLocaleString()}</p>
      </div>
      <div class="card-body">
        <h4>Number of people</h4>
        <p class="reserv-people-no">${rsv.peopleCounts}</p>
      </div>
      ${
        isFuture
          ? `
      <div class="card-footer">
        <button class="cancel-btn">Cancel</button>
      </div>`
          : ""
      }
    `;
    container.appendChild(card);
   

    if (isFuture) {
    

      function cancelReservation(reservation) {
        const id = reservation.id;
        const url = `http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/reservation/cancel?id=${id}`;
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Veri:", data);
            deleteReservPopup();
          })
          .catch((error) => {
            console.error("Hata:", error);
            alert("Reservation hasn't deleted.");
          });
      }
      card.querySelector(".cancel-btn").addEventListener("click", () => {
        cancelReservation(rsv);
        card.remove(); // sadece o kartı kaldırır

      });
    }
  };
}

function successPopup() {
  // Başarılı rezervasyon mesajı için popup oluşturma.
  const successDiv = document.createElement("div");
  successDiv.className = "popup center active";

  const iconDiv = document.createElement("div");
  iconDiv.className = "state-popup-icon success-icon";
  const successIcon = document.createElement("i");
  successIcon.className = "fa fa-check";

  const succcessTitle = document.createElement("div");
  succcessTitle.className = "state-title success-title";
  succcessTitle.innerHTML = "Reservation Completed Successfully!";

  const successDescription = document.createElement("div");
  successDescription.className = "state-description success-description";
  successDescription.innerHTML =
    "Your reservation has been successfully created. We will contact you soon.";

  const okDiv = document.createElement("div");
  okDiv.className = "ok-btn";
  const okButton = document.createElement("button");
  okButton.className = "ok-popup-btn";
  okButton.innerHTML = "Close";

  successDiv.appendChild(iconDiv);
  successDiv.appendChild(succcessTitle);
  successDiv.appendChild(successDescription);
  successDiv.appendChild(okDiv);
  iconDiv.appendChild(successIcon);
  okDiv.appendChild(okButton);

  document.body.appendChild(successDiv);

  overflowHidden();

  // ✅ OK butonuna basıldığında popup ve overlay'i kaldır
  okButton.addEventListener("click", () => {
    document.body.removeChild(successDiv);
    overflowAuto();
  });
}
function unsuccessPopup() {
  //  Başarısız rezervasyon mesajı için popup oluşturma.
  const errDiv = document.createElement("div");
  errDiv.className = "popup center active";

  const iconDiv = document.createElement("div");
  iconDiv.className = "state-popup-icon err-icon";
  const errIcon = document.createElement("i");
  errIcon.className = "fa  fa-times-circle";

  const errTitle = document.createElement("div");
  errTitle.className = "state-title err-title";
  errTitle.innerHTML = "Reservation Failed!";

  const errDescription = document.createElement("div");
  errDescription.className = "state-description err-description";
  errDescription.innerHTML =
    "We're sorry! Your reservation has not been created.";

  const okDiv = document.createElement("div");
  okDiv.className = "ok-btn";
  const okButton = document.createElement("button");
  okButton.className = "ok-popup-btn";
  okButton.innerHTML = "Close";

  errDiv.appendChild(iconDiv);
  errDiv.appendChild(errTitle);
  errDiv.appendChild(errDescription);
  errDiv.appendChild(okDiv);
  iconDiv.appendChild(errIcon);
  okDiv.appendChild(okButton);

  document.body.appendChild(errDiv);
  overflowHidden();

  // ✅ OK butonuna basıldığında popup ve overlay'i kaldır
  okButton.addEventListener("click", () => {
    document.body.removeChild(errDiv);
    overflowAuto();
  });
}

function overflowAuto() {
  // Popup kapatıldığında arka plana scroll olabilmesi için
  document.body.style.overflow = "auto";
  const overlay = document.getElementById("popup-overlay");
  if (overlay) {
    document.body.removeChild(overlay); // Overlay'i kaldır
  }
}

function overflowHidden() {
  // Popup açıldığında arka plana scroll olmaması için
  document.body.style.overflow = "hidden";
  blurBackground();
}
function deleteSelectedValue() {
  selectedDate = null;
  selectedTime = null;
  selectedPerson = null;
  document
    .querySelectorAll(".selected")
    .forEach((el) => el.classList.remove("selected"));
  document
    .querySelectorAll(".fade")
    .forEach((el) => el.classList.remove("fade"));
}
function blurBackground() {
  // Arka planı karartan ve bulanıklaştıran overlay div'i oluştur
  const overlay = document.createElement("div");
  overlay.id = "popup-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.5)"; // Yarı şeffaf siyah
  overlay.style.backdropFilter = "blur(5px)"; // Bulanıklık efekti
  overlay.style.webkitBackdropFilter = "blur(5px)"; // Safari uyumluluğu için
  overlay.style.zIndex = "999"; // Popup'ın arkasında ama diğer her şeyin önünde
  overlay.style.pointerEvents = "none"; // Overlay tıklamayı engellemesin

  // Overlay'i body'ye ekle
  document.body.appendChild(overlay);
}
function deleteReservPopup() {
  //  Eksik alan varsa uyarı popup'ı.
  const errDiv = document.createElement("div");
  errDiv.className = "popup center active";

  const iconDiv = document.createElement("div");
  iconDiv.className = "state-popup-icon success-icon";
  const errIcon = document.createElement("i");
  errIcon.className = "fa fa-check";

  const errTitle = document.createElement("div");
  errTitle.className = "state-title err-title";
  errTitle.innerHTML = "Reservation Cancelled!";

  const errDescription = document.createElement("div");
  errDescription.className = "state-description err-description";
  errDescription.innerHTML = "Your reservation has been successfully deleted. If you need further assistance, feel free to contact us.";

  const okDiv = document.createElement("div");
  okDiv.className = "ok-btn";
  const okButton = document.createElement("button");
  okButton.className = "ok-popup-btn";
  okButton.innerHTML = "Close";

  errDiv.appendChild(iconDiv);
  errDiv.appendChild(errTitle);
  errDiv.appendChild(errDescription);
  errDiv.appendChild(okDiv);
  iconDiv.appendChild(errIcon);
  okDiv.appendChild(okButton);

  document.body.appendChild(errDiv);
  overflowHidden();

  // ✅ OK butonuna basıldığında popup ve overlay'i kaldır
  okButton.addEventListener("click", () => {
    document.body.removeChild(errDiv);
    overflowAuto();
  });
}