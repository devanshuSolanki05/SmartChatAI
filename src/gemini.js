


const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// Accept prevUser as argument
async function generateContent(prevUser) {
  const RequestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": 'AIzaSyCYFLrGOSNYC5l9ByKa3Tc3tpxcuRulijk',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prevUser.prompt },
            ...(prevUser.data
              ? [
                  {
                    inline_data: {
                      mime_type: prevUser.mime_type,
                      data: prevUser.data,
                    },
                  },
                ]
              : []),
          ],
        },
      ],
    }),
  };

  try {
    const response = await fetch(Api_Url, RequestOption);
    const data = await response.json();

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      console.error("Unexpected API Response:", data);
      return "No valid response from API.";
    }

    const apiResponse = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();
    return apiResponse;
  } catch (error) {
    console.error("API Error:", error);
    return "Something went wrong.";
  }
}

export default generateContent;
