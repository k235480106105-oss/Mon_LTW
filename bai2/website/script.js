async function loadData() {
    const status = document.getElementById("status");
    const table = document.getElementById("studentTable");
    const totalMoney = document.getElementById("totalMoney");

    status.textContent = "Đang tải dữ liệu...";
    table.innerHTML = "";
    totalMoney.textContent = "0";

    try {
        const response = await fetch("/api/tacke");

        if (!response.ok) {
            throw new Error("API trả về lỗi HTTP " + response.status);
        }

        const data = await response.json();

        if (data.ok !== 1) {
            throw new Error(data.msg || "API không thành công");
        }

        let total = 0;

        data.dssv.forEach((student, index) => {
            total += student.money;

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.violations}</td>
                <td>${student.money.toLocaleString("vi-VN")} VNĐ</td>
            `;

            table.appendChild(row);
        });

        totalMoney.textContent = total.toLocaleString("vi-VN");

        status.textContent = data.msg;

    } catch (error) {
        console.error(error);

        status.textContent =
            "Không thể lấy dữ liệu từ API: " + error.message;
    }
}
