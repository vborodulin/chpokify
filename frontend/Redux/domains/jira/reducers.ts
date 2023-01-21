import { TJiraApplicationLink, TJiraField, TJiraProject } from '@chpokify/models-types/core/integrations';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { jiraActionTypes } from '@Redux/domains/jira/actionTypes';
import { TAppAction } from '@Redux/types';

type TState = {
  oauthUrl: string;
  applicationLink: TJiraApplicationLink | null;
  projects: Record<string, TJiraProject[]>
  fields: Record<string, TJiraField[]>
};

const initialState: TState = {
  applicationLink: null,
  oauthUrl: '',
  projects: {},
  fields: {},
};

export const jiraReducer = (state: TState = initialState, action: TAppAction): TState => {
  switch (action.type) {
    case HYDRATE: {
      const { jira } = action.payload;

      if (isEqual(jira, state)) {
        return state;
      }

      return update(state, { $set: jira });
    }

    case jiraActionTypes.APPLICATION_LINK_GET_FULFILLED:
      return update(state, {
        applicationLink: {
          $set: action.payload,
        },
      });

    case jiraActionTypes.OAUTH_MAKE_FULFILLED:
      return update(state, {
        oauthUrl: {
          $set: action.payload.oauthUrl,
        },
      });

    case jiraActionTypes.PROJECTS_IMPORT_FULFILLED: {
      const [baseUrl] = action.meta.args;
      return update(state, {
        projects: {
          [baseUrl]: {
            $set: action.payload,
          },
        },
      });
    }

    case jiraActionTypes.PROJECTS_IMPORT_REMOVE: {
      return update(state, {
        projects: {
          $unset: [action.payload.baseUrl],
        },
      });
    }

    case jiraActionTypes.FIELDS_IMPORT_FULFILLED: {
      const [baseUrl] = action.meta.args;
      return update(state, {
        fields: {
          [baseUrl]: {
            $set: action.payload,
          },
        },
      });
    }

    default:
      return state;
  }
};
