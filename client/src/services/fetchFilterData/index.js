import { FILTER_SORT } from "constants /url";
import apiClient from "services/apiClient";

const fetchFilterData = async ({
  body,
  onSuccess,
  onFailure,
  onFinally,
  headers = {},
}) => {
  apiClient({ url: FILTER_SORT })
    .post("", body, {
      "Content-Type": "application/json",
      ...headers,
    })
    .then(({ data }) => {
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((error) => {
      if (onFailure) {
        onFailure(error);
      }
      console.log("Whoops! Something went wrong:", error.message);
    })
    .finally(() => {
      onFinally();
    });
};
export default fetchFilterData;
