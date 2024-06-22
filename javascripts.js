document.addEventListener("DOMContentLoaded", function() {
    const attendanceRecords = [
        { date: "March 08 2023", status: "On Time", checkIn: "08:53", checkOut: "17:15" },
        { date: "March 07 2023", status: "Late", checkIn: "08:27", checkOut: "17:09" },
        { date: "March 06 2023", status: "Absent", checkIn: "-", checkOut: "-" },
        { date: "March 05 2023", status: "On Time", checkIn: "08:55", checkOut: "17:10" },
        { date: "March 04 2023", status: "On Time", checkIn: "08:58", checkOut: "17:06" },
        { date: "March 03 2023", status: "Late", checkIn: "08:40", checkOut: "17:02" }
    ];
    const recordsPerPage = 3;
    let currentPage = 1;
    let currentView = "grid-view";
    const attendanceContainer = document.querySelector(".attendance-records");
    
    function renderRecords(records, view)  {
       
        attendanceContainer.innerHTML = "";
        attendanceContainer.classList.remove("grid-view", "list-view");
        attendanceContainer.classList.add(view);
        

        records.forEach(record => {
            const recordDiv = document.createElement("div");
            recordDiv.classList.add("attendance-record", view);
            recordDiv.innerHTML = `
                <i class="fa fa-clock-o" aria-hidden="true"></i> <span>${record.date}</span>
                <span class="${record.status.toLowerCase().replace(" ", "-")}">${record.status}</span>
                <div class="row checkin-checkout"><div class="column">Check In Time</div><div class="column">Check Out Time</div></div>
                <div class="row"><div class="column">${record.checkIn}</div><div class="column">${record.checkOut}</div></div>`;
            attendanceContainer.appendChild(recordDiv);
        });
    }

    renderRecords(attendanceRecords, "grid-view");

    document.getElementById("grid-view").addEventListener("click", function() {
        renderRecords(attendanceRecords, "grid-view");
    });

    document.getElementById("list-view").addEventListener("click", function() {
        renderRecords(attendanceRecords, "list-view");
    });

    document.getElementById("sort-asc").addEventListener("click", function() {
        const sortedRecords = [...attendanceRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
        renderRecords(sortedRecords, "grid-view");
    });

    document.getElementById("sort-desc").addEventListener("click", function() {
        const sortedRecords = [...attendanceRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
        renderRecords(sortedRecords, "grid-view");
    });

    document.getElementById("filter-on-time").addEventListener("click", function() {
        const filteredRecords = attendanceRecords.filter(record => record.status === "On Time");
        renderRecords(filteredRecords, "grid-view");
    });

    document.getElementById("filter-late").addEventListener("click", function() {
        const filteredRecords = attendanceRecords.filter(record => record.status === "Late");
        renderRecords(filteredRecords, "grid-view");
    });

    document.getElementById("filter-absent").addEventListener("click", function() {
        const filteredRecords = attendanceRecords.filter(record => record.status === "Absent");
        renderRecords(filteredRecords, "grid-view");
    });
    document.getElementById("filter-all").addEventListener("click", function() {
        const filteredRecords = attendanceRecords.filter(record => record.status === "Late"  || record.status === "On Time" || record.status === "Absent");
        renderRecords(filteredRecords, "grid-view");
    });
});
