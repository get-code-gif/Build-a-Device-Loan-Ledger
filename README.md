Build a Device Loan Ledger
You are a software developer tasked with creating a ledger application to manage IT hardware devices provisioned by your company's Service Desk. The ledger is an object whose keys are asset tags and whose values are objects:

User Stories:

You should model the ledger as an object where each device is keyed by its asset tag and has type, status, borrower (with name and email), and dueDate properties.

You should implement a checkoutDevice(ledger, assetTag, borrower) function that takes a ledger object and clones it with serializeLedger and loadLedger, without mutating the original. On the clone, it should set the borrower object's name and email, update the status to "CheckedOut", and return an object of the form { ledger: updatedLedger, message: confirmationString }, where the message includes the asset tag and the borrower object's name.

If assetTag does not exist in the ledger, the function should return the ledger unchanged along with a message that includes the asset tag and explains that it was not found.
If the device is already "CheckedOut", the function should return the ledger unchanged and leave the current borrower in place, along with a message that includes the asset tag and explains that the device is already checked out.
You should implement a checkinDevice(ledger, assetTag) function that takes a ledger object and clones it with serializeLedger and loadLedger, without mutating the original. On the clone, it should clear the borrower object's name and email, reset dueDate to "", update the status to "CheckedIn", and return an object of the form { ledger: updatedLedger, message: confirmationString }, where the message includes the asset tag.

If assetTag does not exist in the ledger, the function should return the ledger unchanged along with a message that includes the asset tag and explains that it was not found.
You should implement a listOverdueDevices(ledger, today) function that takes a ledger object and returns an array of the device objects that are overdue, sorted by dueDate in ascending order. A device is overdue when its status is "CheckedOut" and its dueDate is strictly before today. Both today and dueDate are strings in month/day/year order, and the month and day may or may not be zero-padded (for example, "9/5/2025" and "09/05/2025" are both valid).

You should not use the JavaScript Date object anywhere in your code.

You should implement a serializeLedger(ledger) function that converts the ledger object into a JSON string, and a loadLedger(json) function that converts a JSON string back into a JavaScript object.
