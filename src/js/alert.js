class Alert {
   constructor(filePath) {
     this.filePath = filePath; // Store the file path
   }
 
   async loadAlerts(criteria = null) {
     try {
       // Fetch the JSON data
       const response = await fetch(this.filePath);
       if (!response.ok) throw new Error("Failed to load alerts data");
 
       const alerts = await response.json();
 
       // Filter alerts if criteria is provided
       const filteredAlerts = criteria
         ? alerts.filter((alert) => alert.message.includes(criteria))
         : alerts;
 
       // Display only the filtered alerts
       if (filteredAlerts.length > 0) {
         this.displayAlerts(filteredAlerts);
       }
     } catch (error) {
       console.error("Error loading alerts:", error);
     }
   }
 
   displayAlerts(alerts) {
     // Create a <section class="alert-list">
     const alertSection = document.createElement("section");
     alertSection.classList.add("alert-list");
 
     // Loop through the alerts and create <p> for each
     alerts.forEach((alert) => {
       const alertElement = document.createElement("p");
       alertElement.textContent = alert.message;
 
       // Apply the background and text color styles
       alertElement.style.backgroundColor = alert.background;
       alertElement.style.color = alert.color;
 
       // Add the alert to the section
       alertSection.appendChild(alertElement);
     });
 
     // Find the <main> element on the page
     const mainElement = document.querySelector("main");
 
     if (mainElement) {
       // Prepend the alert section to the main element
       mainElement.prepend(alertSection);
     } else {
       console.error("No <main> element found on the page!");
     }
   }
 }
 
 export default Alert;