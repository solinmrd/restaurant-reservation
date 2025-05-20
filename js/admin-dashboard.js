document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  dashboardSection();
  changePassword();
});

// Yan Menü
function setupMenu() {
  const menuItems = document.querySelectorAll(".nav-item");

  // ADMİN DASHBOARD
  const adminDashboardSection = document.getElementById("dashboard");
  const adminManageRsvSection = document.getElementById(
    "manage-all-reservations"
  );
  const adminSettingsSection = document.getElementById("settings");
  // Admin Bilgisi
  const name = localStorage.getItem("name");
  if (name) {
    document.querySelectorAll(".welcome-text").forEach((el) => {
      el.textContent = `Welcome, ${name}!`;
    });
  } else {
    console.log("The user is not logged in.");
  }

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      adminDashboardSection.classList.add("hidden");
      adminManageRsvSection.classList.add("hidden");
      adminSettingsSection.classList.add("hidden");
      const target = item.getAttribute("data-target");

      // ADMİN DASHBOARD
      if (target === "dashboard") {
        adminDashboardSection.classList.remove("hidden");
      } else if (target === "manage-all-reservations") {
        adminManageRsvSection.classList.remove("hidden");
      } else if (target === "settings") {
        adminSettingsSection.classList.remove("hidden");
      } else {
        localStorage.clear();
        window.location.href = "index.html";
      }
    });
  });
}

// ----------------DASHBOARD
function dashboardSection() {
  let name = localStorage.getItem("name");
  let password = localStorage.getItem("password");

  fetch(
    "http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/admin/reservations",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("Not authorized");
      return res.json();
    })
    .then((allReservations) => {
      const weeklyData = getThisWeeksReservationCounts(allReservations);
      renderChart(weeklyData.counts);
      renderSummary(weeklyData, allReservations);
    })
    .catch((err) => {
      alert("Access denied or error occurred.");
      console.error(err);
      window.location.href = "home.html";
    });

  function getThisWeeksReservationCounts(reservations) {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const counts = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
    const dayMap = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const weekReservations = reservations.filter((res) => {
      const date = new Date(res.reservationTime);
      return date >= startOfWeek && date <= endOfWeek;
    });

    weekReservations.forEach((res) => {
      const date = new Date(res.reservationTime);
      counts[date.getDay()]++;
    });

    return {
      counts,
      total: weekReservations.length,
      busiestDay: counts.indexOf(Math.max(...counts)),
      lastFive: weekReservations
        .sort(
          (a, b) => new Date(b.reservationTime) - new Date(a.reservationTime)
        )
        .slice(0, 5),
      dayMap,
    };
  }

  function renderChart(weeklyCounts) {
    const options = {
      series: [{ name: "Number Of Reservation", data: weeklyCounts }],
      chart: { type: "bar", height: 350 },
      colors: ["#e8b10e"],
      states: {
        normal: { filter: { type: "none" } },
        hover: { filter: { type: "none" } },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: { type: "none" },
        },
      },
      xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
      dataLabels: {
        enabled: false,
        offsetY: 0,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      title: {
        text: "Weekly Reservations",
        align: "center",
        style: {
          fontSize: "18px",
          fontWeight: "500",
          fontFamily: "Poppins",
        },
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  function renderSummary(data, all) {
    const { total, busiestDay, lastFive, dayMap } = data;

    document.getElementById(
      "total-reservations"
    ).innerText = `A total of  ${total}  reservations were made this week.`;
    document.getElementById(
      "busiest-day"
    ).innerText = `Busiest day: ${dayMap[busiestDay]}`;

    const tbody = document.querySelector("#recent-reservations-table tbody");
    tbody.innerHTML = "";

    lastFive.forEach((r) => {
      const date = new Date(r.reservationTime);
      const row = document.createElement("tr");
      const tdName = document.createElement("td");
      tdName.textContent = r.customerName;
      const tdDate = document.createElement("td");
      tdDate.textContent = date.toLocaleDateString();

      const tdTime = document.createElement("td");
      tdTime.textContent = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const tdNoPeople = document.createElement("td");
      tdNoPeople.textContent = r.peopleCounts;
      row.appendChild(tdName);
      row.appendChild(tdDate);
      row.appendChild(tdTime);
      row.appendChild(tdNoPeople);

      tbody.appendChild(row);
    });
  }
}

// ----------------MANAGE ALL RESERVATION
let allReservationsData = [];

function loadAllReservations() {
  fetch(
    "http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/admin/reservations",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: localStorage.getItem("name"),
        password: localStorage.getItem("password"),
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      // Tarihe göre sıralama (en eski en üstte)
      data.sort(
        (a, b) => new Date(a.reservationTime) - new Date(b.reservationTime)
      );
      allReservationsData = data;
      renderReservations(data);
    })
    .catch((err) => {
      console.error("Veri yüklenirken hata oluştu:", err);
    });
}

function renderReservations(data) {
  const tbody = document.querySelector("#reservationsTable tbody");
  tbody.innerHTML = "";

  data.forEach((r) => {
    const date = new Date(r.reservationTime);
    const formattedDate = date.toLocaleDateString("tr-TR");
    const time = date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Rezervasyon durumu kontrolü
    const now = new Date();
    let statusText = "";
    let statusClass = "";

    if (date > now) {
      statusText = "Expected";
      statusClass = "status-pending";
    } else if (
      date.toDateString() === now.toDateString() &&
      date.getHours() === now.getHours()
    ) {
      statusText = "Ongoing";
      statusClass = "status-completed";
    } else {
      statusText = "Past";
      statusClass = "status-expired";
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formattedDate}</td>
      <td>${time}</td>
      <td>${r.customerName}</td>
      <td>${r.peopleCounts}</td>
      <td>${r.description || "-"}</td>
      <td class="${statusClass}">${statusText}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Arama fonksiyonu
document.getElementById("searchInput").addEventListener("keyup", function () {
  const value = this.value.toLowerCase();
  const rows = document.querySelectorAll("#reservationsTable tbody tr");

  rows.forEach((row) => {
    const name = row.cells[2].textContent.toLowerCase();
    row.style.display = name.includes(value) ? "" : "none";
  });
});

// Buton eventleri
document.getElementById("allReservationsBtn").addEventListener("click", () => {
  renderReservations(allReservationsData);
});

document
  .getElementById("todayReservationsBtn")
  .addEventListener("click", () => {
    const today = new Date();
    const filtered = allReservationsData.filter((r) => {
      const resDate = new Date(r.reservationTime);
      return resDate.toDateString() === today.toDateString();
    });
    renderReservations(filtered);
  });

document.addEventListener("DOMContentLoaded", loadAllReservations);

document.addEventListener("DOMContentLoaded", loadAllReservations);
document.getElementById("searchInput").addEventListener("keyup", function () {
  const value = this.value.toLowerCase();
  const rows = document.querySelectorAll("#reservationsTable tbody tr");

  rows.forEach((row) => {
    const name = row.cells[2].textContent.toLowerCase();
    row.style.display = name.includes(value) ? "" : "none";
  });
});



// ----------------------------------------SETTINGS
function changePassword() {
  //password change
  document
    .getElementById("passwordForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const adminName = document.getElementById("adminName").value.trim();
      const currentPassword = document
        .getElementById("currentPassword")
        .value.trim();
      const newPassword = document.getElementById("newPassword").value.trim();

      if (!adminName || !currentPassword || !newPassword) {
        alert("Please fill all fields.");
        return;
      }

      // Not: id'yi backendde name ile eşleştiriyorsanız id = 0 da olabilir, dummy olarak
      const adminDto = {
        id: 1, // veya backendde id zorunlu değilse bu alanı çıkar
        name: adminName,
        password: currentPassword,
      };

      const apiUrl = `http://ec2-18-195-172-95.eu-central-1.compute.amazonaws.com:8080/api/admin/password?newPassword=${encodeURIComponent(
        newPassword
      )}`;

      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminDto),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update password.");
          return res.text(); // Backend sadece String döndürüyor gibi
        })
        .then((message) => {
          alert("✅ " + message);
        })
        .catch((err) => {
          alert("❌ Error: " + err.message);
        });
    });
}

