const arr = JSON.parse(localStorage.getItem('myArray')) || [];
const listValue = document.getElementById('Add-toList');
const display = document.getElementById('items');
const modalBox = document.getElementById('updateModal').style.display = 'none';
const searchInput = document.getElementById('searchInput');

function handleCheckboxChange(checkbox, index) {
     // Rest of your code remains the same
     const heading = document.getElementById(`heading${index}`);
     const status = document.getElementById(`label${index}`);
    console.log('changing')
    // Check if the checkbox is checked
    if (checkbox.checked) {
        // Update the style of the heading to indicate it is deleted
        heading.style.textDecoration = 'line-through';
        status.innerHTML = 'Completed';

          // Store the checkbox state in local storage
          localStorage.setItem(`checkbox${index}`, 'completed');
    } else {
        // If the checkbox is unchecked, remove the deletion style
        heading.style.textDecoration = 'none';
        status.innerHTML = 'In Progress...';

        // Remove the checkbox state from local storage
        localStorage.removeItem(`checkbox${index}`);
    }
}


const AddToList = () => {
    let takeValue = listValue.value;
    if (takeValue.trim() !== '') {
        arr.push(takeValue);
        updateDisplay();
        // Update local storage
        localStorage.setItem('myArray', JSON.stringify(arr));

         // Clear input value
         listValue.value = '';
    }
}

const deleteFunc = (itemValue) => {
    const index = arr.indexOf(itemValue);
    if (index !== -1) {
        arr.splice(index, 1);
        updateDisplay();
        // Update local storage
        localStorage.setItem('myArray', JSON.stringify(arr));
        console.log('Deleted', itemValue);
    }
}


const updateFunc = (itemValue) => {
    const modalBox = document.getElementById('updateModal');
    const inputField = modalBox.querySelector('input[type="text"]');
    
    // Set the input field value to the existing item value
    inputField.value = itemValue;

    // Display the modal
    modalBox.style.display = 'flex';

    // Add an event listener to the "Update" button in the modal
    const updateButton = modalBox.querySelector('.updateButton');
    updateButton.addEventListener('click', () => {
        const updatedValue = inputField.value;
        if (updatedValue.trim() !== '') {
            const index = arr.indexOf(itemValue);
            if (index !== -1) {
                arr[index] = updatedValue;
                updateDisplay();
                // Update local storage
                localStorage.setItem('myArray', JSON.stringify(arr));
                console.log('Updated', itemValue, 'to', updatedValue);
            }
            // Close the modal after updating
            modalBox.style.display = 'none';
        }
    });

    // Add an event listener to the "Cancel" button in the modal
    const cancelButton = modalBox.querySelector('.action_button[value="Cancel"]');
    cancelButton.addEventListener('click', () => {
        // Close the modal without updating
        modalBox.style.display = 'none';
    });
}


const updateDisplay = () => {
    display.innerHTML = '';
   // Filter the array based on the search input
   const searchTerm = searchInput.value.toLowerCase();
   const filteredArray = arr.filter(value => value.toLowerCase().includes(searchTerm));

   filteredArray.map((value, index) => {
        let newItem = document.createElement('div');
        newItem.className = 'center';
        newItem.innerHTML =
            arr.length === 0
                ? '<h2>No Item Found</h2>'
            : `
                <div class="text">
                    <input type="checkbox" name="status" id="status${index}" onchange="handleCheckboxChange(this, ${index})">
                    <h2 style="margin-left:1rem" id="heading${index}">${value}</h2>
                </div>
                    <div class="actions">
                        <img src="./images/delete.png" alt="Delete"  onclick="deleteFunc('${value}')">
                        <button class="action_button" onclick="updateFunc('${value}')">Update</button>
                        <div class="status">
                            <label style="margin-left: 5px;" id='label${index}'> In Progress...</label>
                        </div>
                    </div>
                `;

        display.appendChild(newItem);
    });
}
// Event listener for search input
searchInput.addEventListener('input', updateDisplay);
// Initial display
updateDisplay();
