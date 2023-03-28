function checkAddress() {
    event.preventDefault();

    const address = document.getElementById("address").value;
  const file = "wallet_addresses.xlsx";
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const column = "A";
    const range = worksheet['!ref'].split(":");
    const startRow = parseInt(range[0].substring(1));
    const endRow = parseInt(range[1].substring(1));
    let isWhitelisted = false;
    for (let row = startRow; row <= endRow; row++) {
      const cellAddress = `${column}${row}`;
      const cell = worksheet[cellAddress];
      if (cell && cell.t === "s" && cell.v === address) {
        isWhitelisted = true;
        break;
      }
    }
    const resultDiv = document.getElementById("result");
    if (isWhitelisted) {
      resultDiv.innerHTML = "Whitelisted";
    } else {
      resultDiv.innerHTML = "Not whitelisted";
    }
  };
  fetch(file)
    .then(response => response.arrayBuffer())
    .then(data => reader.readAsArrayBuffer(new Blob([data])));
  }
  