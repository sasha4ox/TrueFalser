import {
  STATISTICS_GET_SUCCESS,
  STATISTICS_GET_START,
  STATISTICS_GET_FAILURE,
} from "../constants";

import _map from "lodash/map";

import fetchAsync from "../utils/fetch";
import { apiUrl } from "../client-config";

export function getStatisticsStart() {
  return {
    type: STATISTICS_GET_START,
  };
}
export function getStatisticsFailure(payload) {
  return {
    type: STATISTICS_GET_FAILURE,
    payload,
  };
}

export function getStatisticsSuccess(payload) {
  return {
    type: STATISTICS_GET_SUCCESS,
    payload,
  };
}

export function getStatistics() {
  return async (dispatch) => {
    dispatch(getStatisticsStart);
    try {
      const payload = await fetchAsync(`${apiUrl}/statistic/tags/all`);
      if (payload.status === "error") {
        return dispatch(getStatisticsFailure(payload.message));
      }
      const averageTimeOfCorrectAnswers = _map(payload.data, (item) => {
        return {
          name: item.name,
          averageTimeOfCorrectAnswers: item.averageTimeOfCorrectAnswers,
        };
      });
      const averageTimeOfIncorrectAnswers = _map(payload.data, (item) => {
        return {
          name: item.name,
          averageTimeOfIncorrectAnswers: item.averageTimeOfIncorrectAnswers,
        };
      });
      const correctAnswers = _map(payload.data, (item) => {
        return {
          name: item.name,
          correctAnswers: item.correctAnswers,
        };
      });
      const percentile95OfCorrect = _map(payload.data, (item) => {
        return {
          name: item.name,
          percentile95OfCorrect: item.percentile95OfCorrect,
        };
      });
      const percentile95OfIncorrect = _map(payload.data, (item) => {
        return {
          name: item.name,
          percentile95OfIncorrect: item.percentile95OfIncorrect,
        };
      });
      const totalAnswers = _map(payload.data, (item, index) => {
        return {
          name: item.name,
          totalAnswers: item.totalAnswers,
        };
      });
      const array = {
        averageTimeOfCorrectAnswers: [...averageTimeOfCorrectAnswers],
        averageTimeOfIncorrectAnswers: [...averageTimeOfIncorrectAnswers],
        correctAnswers: [...correctAnswers],
        correctAnswers: [...correctAnswers],
        percentile95OfCorrect: [...percentile95OfCorrect],
        percentile95OfIncorrect: [...percentile95OfIncorrect],
        totalAnswers: [...totalAnswers],
      };
      return dispatch(getStatisticsSuccess(array));
    } catch (error) {
      return dispatch(getStatisticsFailure(error.message));
    }
  };
}
