import { FETCH_TABLE_DATA } from "constants /url";
import apiClient from "services/apiClient";

const fetchTableData = async ({ onSuccess, onFailure, onFinally }) => {
  apiClient({ url: FETCH_TABLE_DATA })
    .get()
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
    }).finally(()=>{
        onFinally();
    });
};
export default fetchTableData;
