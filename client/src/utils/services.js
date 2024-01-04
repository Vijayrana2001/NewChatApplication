//export const Base_URL = "http://localhost:5000/api";
export const Base_URL = "https://relieved-handkerchief-hen.cyclic.app/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url) => {

  //const url_1 = new URL(url,Base_URL)

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "An error occured...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };

  }
  
  return data;
};
