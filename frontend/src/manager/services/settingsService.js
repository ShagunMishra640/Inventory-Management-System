import API from "../../api/axios";

const SETTINGS_BASE = "/settings";

export const getSettings = async () => {
  const response = await API.get(SETTINGS_BASE);
  return response.data?.settings || {};
};

export const updateSettings = async (settingsData) => {
  const response = await API.put(SETTINGS_BASE, settingsData);
  return response.data?.settings || {};
};
