import AlertBox from "@/components/alert";
import { REQUEST_GET_MOVIE_LIST } from "@/redux/movies/actions";
import { MOVIE_SELECTOR_COLLECTION } from "@/redux/movies/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { useCallback } from "react";

const useMovies = () => {
  const dispatch = useAppDispatch();
  const { list, pending, error, success, total } = useAppSelector(
    MOVIE_SELECTOR_COLLECTION
  );

  const getListMovies = useCallback(() => {
    dispatch(REQUEST_GET_MOVIE_LIST()).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        <AlertBox
          variant="alert-error"
          message={result.payload.response?.data.message}
        />;
      }
    });
  }, [dispatch]);

  return {
    list,
    pending,
    error,
    success,
    total,
    getListMovies,
  };
};

export default useMovies;
