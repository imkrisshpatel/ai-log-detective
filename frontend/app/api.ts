export const fetchThreats = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/threats');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch:", error);
    return { count: 0, reports: [] };
  }
};