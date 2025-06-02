// async function getPredictedLabel(processed_t) {
//   // TODO: Call your model's api here
//   // and return the predicted label
//   // Possible labels: "up", "down", "left", "right", null
//   // null means stop & wait for the next gesture
//   // For now, we will return a random label
//   const labels = ["up", "down", "left", "right"];
//   const randomIndex = Math.floor(Math.random() * labels.length);
//   const randomLabel = labels[randomIndex];
//   console.log("Predicted label:", randomLabel);
//   return randomLabel;
// }
function flattenLandmarks(landmarks) {
  const flattened = {};
  for (let i = 0; i < landmarks.length; i++) {
    flattened[`x${i + 1}`] = landmarks[i].x;
    flattened[`y${i + 1}`] = landmarks[i].y;
    flattened[`z${i + 1}`] = landmarks[i].z;
  }
  console.log(JSON.stringify(flattened))
  return flattened;
}

async function getPredictedLabel(processed_t) {
  try {
    // ✅ Flatten the landmarks before sending
    const formattedInput = flattenLandmarks(processed_t);

    const response = await fetch("https://thingproxy.freeboard.io/fetch/http://mohamedatia.work.gd/predict", {
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
    console.log("Response from API:", data);
    console.log("Predicted label:", data.gesture_name);
    return data.prediction;
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}