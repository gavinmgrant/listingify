import { apiRequestExternal } from "./util.js";

const endpoint = `https://app.convertkit.com/forms/${process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID}/subscriptions`;

function subscribe(data) {
  const { email } = data;

  return apiRequestExternal(endpoint, "POST", {
    email_address: email,
  }).then((response) => {
    if (response.status === "success") {
      return response;
    } else {
      // Throw error so it can be caught and displayed by the UI.
      // Convertkit returns an array of error messages,
      // but we just throw the first one.
      throw new Error(response.errors.messages[0]);
    }
  });
}

const newsletter = { subscribe };

export default newsletter;
