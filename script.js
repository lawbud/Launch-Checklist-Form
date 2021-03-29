// Write your JavaScript code here!

   window.addEventListener("load", function() {
      fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         response.json().then( function(json) {
            const div = document.getElementById("missionTarget");
            div.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                 <li>Name: ${json[0].name}</li>
                 <li>Diameter: ${json[0].diameter}</li>
                 <li>Star: ${json[0].star}</li>
                 <li>Distance from Earth: ${json[0].distance}</li>
                 <li>Number of Moons: ${json[0].moons}</li>
               </ol>
               <img src="${json[0].image}"></img>`
         } );
      });   
      let form = document.getElementById("launchForm");
      form.addEventListener("submit", function(event){
         event.preventDefault();
         let pilotName = document.querySelector("input[name=pilotName]");
         let copilotName = document.querySelector("input[name=copilotName]");
         let fuelLevel = document.querySelector("input[name=fuelLevel]");
         let cargoMass = document.querySelector("input[name=cargoMass]");

         if (pilotName.value === "" || copilotName.value === "" 
            || fuelLevel.value === "" || cargoMass.value === "" ) {
                alert("All fields are required!");
                return;
         }
         if (!isNaN(pilotName.value) || !isNaN(copilotName.value)
         || isNaN(fuelLevel.value)  || isNaN(cargoMass.value)) {
            alert("Please enter vaild data");
            return;
      }

         let pilotStatus = `Pilot: ${pilotName.value}`
         document.getElementById("pilotStatus").textContent = pilotStatus
         let copilotStatus = `Co-pilot: ${copilotName.value}`
         document.getElementById("copilotStatus").textContent = copilotStatus
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("launchStatus").textContent = "Shuttle ready for launch"
         
         if(fuelLevel.value < 10000 && cargoMass.value > 10000) { 
            document.getElementById("launchStatus").textContent = "Shuttle Not ready for launch"
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("faultyItems").style.visibility = "visible"
            document.getElementById("fuelStatus").textContent = "Fuel to low"
            document.getElementById("cargoStatus").textContent = "Cargo to High"
         }else if (fuelLevel.value < 10000) {
            document.getElementById("faultyItems").style.visibility = "visible"
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("launchStatus").textContent = "Shuttle not ready for launch"
            document.getElementById("cargoStatus").textContent = "Cargo mass low enough for launch"
            document.getElementById("fuelStatus").textContent = "Fuel to low"
         
         }else if (cargoMass.value > 10000) {
            document.getElementById("faultyItems").style.visibility = "visible"
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("launchStatus").textContent = "Shuttle not ready for launch"
            document.getElementById("fuelStatus").textContent = "Fuel level high enough for launch"
            document.getElementById("cargoStatus").textContent = "Cargo to High"

         }else {
            document.getElementById("launchStatus").textContent = "Shuttle ready for launch" 
            document.getElementById("faultyItems").style.visibility = "hidden"
            }  
      });
      });
