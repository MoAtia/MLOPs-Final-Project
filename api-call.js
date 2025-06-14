

function flattenLandmarks(landmarks) {
  const flattened = {};
  for (let i = 0; i < landmarks.length; i++) {
    flattened[`x${i + 1}`] = landmarks[i].x;
    flattened[`y${i + 1}`] = landmarks[i].y;
    flattened[`z${i + 1}`] = landmarks[i].z;
  }
  return flattened;
  console.log("Flattened landmarks:", flattened);
}

async function getPredictedLabel(processed_t) {
  try {
    // ✅ Flatten the landmarks before sending
    const formattedInput = flattenLandmarks(processed_t);
    
    const response = await fetch("https://maze-game-backend-production.up.railway.app/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedInput),
    });

    if (!response.ok) {
      console.error("API error:", await response.text());
      return null;
    }

    const data = await response.json();
    // console.log("Response from API:", data);
    // console.log("Predicted label:", data.gesture_name);


    // Map the gesture names to the corresponding actions
    if( data.gesture_name === "like") {
      return "up"; // Stop & wait for the next gesture
    } else if (data.gesture_name === "dislike") {
      return "down"; // Stop & wait for the next gesture
    }else if (data.gesture_name === "four") {
      return "left"; // Stop & wait for the next gesture
    } else if (data.gesture_name === "fist") {
      return "right"; // Stop & wait for the next gesture
    }else{
      return null; // Stop & wait for the next gesture
    }

    // return data.prediction;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}