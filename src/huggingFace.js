export async function query(prevUser) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: prevUser.prompt }),
        }
    );

    if (!response.ok) {
        throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.blob();
    return result;
}
