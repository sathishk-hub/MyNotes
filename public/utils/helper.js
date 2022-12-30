export default function getStandardResponse({ status, message, data }) {
  return {
    status,
    message,
    data,
  };
}
