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

/*
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
  }
 else {
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
*/

function checkoutDevice(ledger, assetTag, borrower) {
  if (!ledger[assetTag]) {
    return {
      ledger: ledger,
      message: assetTag + " not found.",
    };
  }
  if (ledger[assetTag].status == "CheckedOut") {
    return {
      ledger: ledger,
      message: assetTag + " already checked out.",
    };
  } else {
    let updatedLedger = {};
    updatedLedger = loadLedger(serializeLedger(ledger));
    updatedLedger[assetTag].borrower.name = borrower.name;
    updatedLedger[assetTag].borrower.email = borrower.email;
    updatedLedger[assetTag].status = "CheckedOut";
    let updateObject = {
      ledger: updatedLedger,
      message:
        "Ledger asset " +
        assetTag +
        " has been updated for " +
        borrower.name +
        ".",
    };
    return updateObject;
  }
}

function checkinDevice() {}

function serializeLedger(ledger) {
  return JSON.stringify(ledger);
}
function loadLedger(json) {
  return JSON.parse(json);
}
