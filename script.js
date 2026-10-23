const equipmentLedger = {
  1: {
    type: "PC",
    status: "CheckedOut",
    borrower: { name: "John Smith", email: "john@acme.org" },
    dueDate: "11/30/2025",
  },
  2: {
    type: "Laptop",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
  3: {
    type: "Laptop",
    status: "CheckedOut",
    borrower: { name: "Jane Doe", email: "jane@acme.org" },
    dueDate: "10/31/2025",
  },

  4: {
    type: "iPad",
    status: "CheckedIn",
    borrower: { name: "", email: "" },
    dueDate: "",
  },
};

function checkoutDevice(ledger, assetTag, borrower) {
  const equipment = ledger[assetTag];

  if (!equipment) {
    return {
      ledger,
      message: `Asset tag ${assetTag} was not found.`,
    };
  }

  if (equipment.status === "CheckedOut") {
    return {
      ledger,
      message: `Asset tag ${assetTag} is already checked out.`,
    };
  } else {
    const updatedLedger = loadLedger(serializeLedger(ledger));
    updatedLedger[assetTag].borrower.name = borrower.name;
    updatedLedger[assetTag].borrower.email = borrower.email;
    updatedLedger[assetTag].status = "CheckedOut";

    let updateObject = {
      ledger: updatedLedger,
      message: `Asset tag ${assetTag} checked out to ${borrower.name}.`,
    };

    return updateObject;
  }
}

function checkinDevice(ledger, assetTag) {
  const equipment = ledger[assetTag];

  if (!equipment) {
    return {
      ledger,
      message: `Asset tag ${assetTag} was not found.`,
    };
  }

  if (equipment.status === "CheckedIn") {
    return {
      ledger,
      message: `Asset tag ${assetTag} is already checked in.`,
    };
  } else {
    const updatedLedger = loadLedger(serializeLedger(ledger));
    updatedLedger[assetTag].borrower.name = "";
    updatedLedger[assetTag].borrower.email = "";
    updatedLedger[assetTag].dueDate = "";
    updatedLedger[assetTag].status = "CheckedIn";

    let updateObject = {
      ledger: updatedLedger,
      message: `Asset tag ${assetTag} checked in.`,
    };

    return updateObject;hr

}

function listOverdueDevices(ledger, today) {
  function dateKey(dateString) {
    const parts = dateString.split("/");
    if (parts.length !== 3) return null;

    const [month, day, year] = parts.map(Number);
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (
      !Number.isInteger(month) ||
      !Number.isInteger(day) ||
      !Number.isInteger(year) ||
      month < 1 || month > 12 ||
      day < 1 || day > daysInMonth[month - 1] ||
      year < 1
    ) {
      return null;
    }

    return year * 10000 + month * 100 + day;
  }

  const todayKey = dateKey(today);
  if (todayKey === null) return [];

  return Object.entries(ledger)
    .filter(([, equipment]) => {
      const dueDateKey = dateKey(equipment.dueDate);
      return (
        equipment.status === "CheckedOut" &&
        dueDateKey !== null &&
        dueDateKey < todayKey
      );
    })
    .map(([assetTag, equipment]) => ({
      assetTag,
      type: equipment.type,
      borrower: { ...equipment.borrower },
      dueDate: equipment.dueDate,
    }))
    .sort((a, b) => dateKey(a.dueDate) - dateKey(b.dueDate));
}

function serializeLedger(ledger) {
  return JSON.stringify(ledger);
}
function loadLedger(json) {
  return JSON.parse(json);
}

      console.log(equipmenymnt)
