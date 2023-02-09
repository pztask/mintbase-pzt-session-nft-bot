const API_BASE_URL = process.env.API_BASE_URL;

export async function ValidatePermit(permit) {
  const url = `${API_BASE_URL}/api/user/${permit.user_id}/wallet/${permit.account_id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
