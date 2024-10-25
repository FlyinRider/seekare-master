import API from "./api";

const ADMIN_PREFIX_URL = `/v1/admin`;

const fetchAdminCommonData = async (data) => {
  return await API.get(`${ADMIN_PREFIX_URL}/dashboard`, data).then(
    (res) => res.data
  );
};

const fetchUserAdminAnalysis = async (data) => {
  return await API.post(
    `${ADMIN_PREFIX_URL}/dashboard/usersanalysis`,
    data
  ).then((res) => res.data);
};

const fetchAdminInviteEmailData = async (data) => {
  return await API.post(
    `${ADMIN_PREFIX_URL}/dashboard/iniviteanalysis`,
    data
  ).then((res) => res.data);
};

const fetchAdminPopularKeywords = async () => {
  return await API.post(`${ADMIN_PREFIX_URL}/keyword`).then((res) => res.data);
};

const fetchAdminUsageByKeywords = async (k = "", uid = "") => {
  return await API.get(`${ADMIN_PREFIX_URL}/keyword?k=${k}&uid=${uid}`).then(
    (res) => res.data
  );
};

export {
  // dashboard
  fetchUserAdminAnalysis,
  fetchAdminCommonData,
  fetchAdminInviteEmailData,
  // popular keywords
  fetchAdminPopularKeywords,
  fetchAdminUsageByKeywords,
};
