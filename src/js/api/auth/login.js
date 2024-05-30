/* USE THIS FILE TO CREATE LOGIN API CALLS IF THE PROJECT CALLS FOR IT IN FUTURE DEVELOPMENT */

// EXAMPLE CODE
// import { save } from '../../storage/save.js';
// import { API_AUTH, API_BASE, API_LOGIN, API_PROFILE } from '../constants.js';
// import { authFetch } from '../fetch.js';

// export async function login(email, password) {
//   const response = await authFetch(API_BASE + API_AUTH + API_LOGIN, {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),
//   });

//   if (response.ok) {
//     const { accessToken, ...profile } = (await response.json()).data;
//     save('token', accessToken);

//     // Fetch the complete profile data
//     const profileResponse = await authFetch(
//       `${API_BASE}${API_PROFILE}/${profile.name}`,
//     );
//     if (profileResponse.ok) {
//       const completeProfile = await profileResponse.json();
//       save('profile', completeProfile); // Save the complete profile data
//       return completeProfile;
//     } else {
//       throw new Error('Could not fetch complete profile data');
//     }
//   }

//   throw new Error('Could not log in the account');
// }
