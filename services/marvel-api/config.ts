const apiConfig = {
    url: "https://gateway.marvel.com",
    key: process.env.NEXT_PUBLIC_API_KEY || "",
    // without NEXT_PUBLIC, this value is only available server side
    _key: process.env.PRIVATE_API_KEY || ""

}

export default apiConfig;